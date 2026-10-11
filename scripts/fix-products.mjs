/**
 * Fix all 32 products:
 * 1. Clean dimensions (strip leaked Care Instructions text)
 * 2. Fix care_instructions (remove leaked long description)
 * 3. Add product-specific FAQs (stored as JSON in the `weight` field)
 *
 * Run: node scripts/fix-products.mjs
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import AdmZip from 'adm-zip'

// ── Env ───────────────────────────────────────────────────────────────────────
const env = fs.readFileSync('.env.local', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BASE = 'C:/Users/rajee/Downloads/All Products'

const FOLDER_TO_DB_CAT = {
  'DRESSES': 'Dresses',
  'JACKETS': 'Kantha Jackets',
  'KAFTANS': 'Kaftans',
  'KURTAS': 'Kurtas',
  'LIMITED EDITIONS': 'Limited Editions',
  'SAREES': 'Kantha Stitch Sarees',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function readDocx(filePath) {
  try {
    const zip = new AdmZip(filePath)
    const entry = zip.getEntry('word/document.xml')
    if (!entry) return ''
    const xml = entry.getData().toString('utf8')
    return xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  } catch { return '' }
}

/**
 * Fixed parser — uses "Care Instructions" as full label boundary,
 * and uses "Long Description" as boundary for care instructions.
 */
function parseProductFixed(text) {
  // ── Dimensions ──────────────────────────────────────────────────────────────
  // Stop at "Care Instructions" (full phrase) or "Long Description"
  const dimsMatch = text.match(
    /Dimensions?\s*[:–]?\s*(.+?)(?=\s+Care\s+Instructions|\s+Long\s+Description|$)/is
  )
  const dimensions = dimsMatch
    ? dimsMatch[1].replace(/\s+/g, ' ').trim()
    : ''

  // ── Care Instructions ────────────────────────────────────────────────────────
  // Capture only up to "Long Description" (with or without colon/newline after)
  const careMatch = text.match(
    /Care\s+Instructions\s*[:–]?\s*(.+?)(?=\s+Long\s+Description\b|$)/is
  )
  const careRaw = careMatch
    ? careMatch[1].replace(/\s+/g, ' ').trim()
    : 'Dry Clean Only.'

  // Split on sentence boundaries
  const careInstructions = careRaw
    .split(/\.\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 3) // drop empty/noise
    .map(s => s.endsWith('.') ? s : s + '.')

  // ── Long Description ─────────────────────────────────────────────────────────
  const longMatch = text.match(/Long\s+Description\s*[:–]?\s*(.+)$/is)
  const longDesc = longMatch
    ? longMatch[1].replace(/\s+/g, ' ').trim()
    : ''

  return { dimensions, careInstructions, longDesc }
}

/**
 * Parse FAQ docx → [{q, a}, ...]
 * Format: "1. Question text? Answer text. 2. Next question..."
 */
function parseFaqs(text) {
  // Strip the leading "FAQ's:" or "FAQs:" prefix
  const cleaned = text.replace(/^FAQ.?s?\s*[:–]?\s*/i, '').trim()

  // Split on numbered markers "1.", "2.", etc.
  const parts = cleaned.split(/\s+(?=\d+\.\s)/).filter(Boolean)

  const faqs = []
  for (const part of parts) {
    // Each part: "1. Question? Answer text."
    // The question ends at the first "?" or we heuristically split
    const withoutNum = part.replace(/^\d+\.\s*/, '').trim()

    const qMark = withoutNum.indexOf('?')
    if (qMark === -1) {
      // No question mark — skip or take full text
      if (withoutNum.length > 10) {
        faqs.push({ q: withoutNum, a: '' })
      }
      continue
    }

    const q = withoutNum.substring(0, qMark + 1).trim()
    const a = withoutNum.substring(qMark + 1).trim()
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  let fixed = 0, skipped = 0

  const catFolders = fs.readdirSync(BASE)
    .filter(f => fs.statSync(path.join(BASE, f)).isDirectory())
    .sort()

  for (const catFolder of catFolders) {
    const dbCategory = FOLDER_TO_DB_CAT[catFolder]
    if (!dbCategory) continue

    const catPath = path.join(BASE, catFolder)
    const productFolders = fs.readdirSync(catPath)
      .filter(f => fs.statSync(path.join(catPath, f)).isDirectory())
      .sort()

    console.log(`\n📁 ${catFolder}`)

    for (const prodFolder of productFolders) {
      const prodPath = path.join(catPath, prodFolder)
      const allFiles = fs.readdirSync(prodPath)

      // Find main docx and faq docx
      const mainDocx = allFiles.find(f => f.endsWith('.docx') && !f.toLowerCase().includes('faq'))
      const faqDocx = allFiles.find(f => f.toLowerCase().includes('faq') && f.endsWith('.docx'))

      if (!mainDocx) { console.log(`  ⚠ ${prodFolder}: no main docx`); skipped++; continue }

      const mainText = readDocx(path.join(prodPath, mainDocx))
      const { dimensions, careInstructions, longDesc } = parseProductFixed(mainText)

      // Parse FAQs
      let faqs = []
      if (faqDocx) {
        const faqText = readDocx(path.join(prodPath, faqDocx))
        faqs = parseFaqs(faqText)
      }

      // Find product in DB by category + folder name heuristic
      // Use slug which we know from the seed script
      const slugify = str => str.toLowerCase()
        .replace(/[–—]/g, '-').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        .replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80)

      // Get product name from docx for slug lookup
      const nameMatch = mainText.match(/Product name\s*[:–]?\s*(.+?)(?=\s+MRP|\s+Short Description|\s+Material|$)/is)
      const name = nameMatch ? nameMatch[1].replace(/\s+/g, ' ').trim() : ''
      if (!name) { console.log(`  ⚠ ${prodFolder}: couldn't parse name`); skipped++; continue }

      const slug = slugify(name)

      // Update product in DB
      const updateData = {
        dimensions: dimensions || null,
        care_instructions: careInstructions,
        description: longDesc || undefined,
        // Store FAQs as JSON string in weight field (repurposed)
        weight: faqs.length > 0 ? JSON.stringify(faqs) : null,
      }

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('slug', slug)

      if (error) {
        console.log(`  ✗ ${name}: ${error.message}`)
        skipped++
      } else {
        console.log(`  ✓ ${name}`)
        console.log(`    Dims: ${dimensions.substring(0, 60)}${dimensions.length > 60 ? '…' : ''}`)
        console.log(`    Care: ${careInstructions.join(' | ')}`)
        console.log(`    FAQs: ${faqs.length} Q&As`)
        fixed++
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅ Fixed: ${fixed}/32 products`)
  if (skipped > 0) console.log(`⚠  Skipped: ${skipped}`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
