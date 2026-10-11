/**
 * Seed all 32 products from Downloads/All Products into Supabase.
 * Run: node scripts/seed-products.mjs
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import AdmZip from 'adm-zip'
import sharp from 'sharp'

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
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp']

// ── Category mapping ──────────────────────────────────────────────────────────
const FOLDER_TO_DB_CAT = {
  'DRESSES': 'Dresses',
  'JACKETS': 'Kantha Jackets',
  'KAFTANS': 'Kaftans',
  'KURTAS': 'Kurtas',
  'LIMITED EDITIONS': 'Limited Editions',
  'SAREES': 'Kantha Stitch Sarees',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function readDocxText(filePath) {
  try {
    const zip = new AdmZip(filePath)
    const entry = zip.getEntry('word/document.xml')
    if (!entry) return ''
    const xml = entry.getData().toString('utf8')
    return xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  } catch { return '' }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80)
}

function extractBetween(text, startLabel, endLabels) {
  const endPattern = endLabels.join('|')
  const re = new RegExp(
    `${startLabel}\\s*[:\\u2013]?\\s*(.+?)(?=\\s+(?:${endPattern})\\s*[:\\u2013]|$)`,
    'is'
  )
  const m = text.match(re)
  return m ? m[1].replace(/\s+/g, ' ').trim() : ''
}

function parseProduct(text) {
  const name = extractBetween(text, 'Product name', ['MRP', 'Short Description', 'Material'])
    .replace(/^-\s*/, '').trim()

  const mrpRaw = extractBetween(text, 'MRP', ['Short Description', 'Material', 'Dimensions'])
  // Clean price: "INR ₹11,990" → "₹11,990", "INR 13,440" → "₹13,440"
  const priceDisplay = mrpRaw
    .replace(/^INR\s*/i, '')
    .replace(/^(\d)/, '₹$1') // add ₹ if not present
    .trim()
  const priceNumeric = parseInt(priceDisplay.replace(/[^\d]/g, ''), 10) || null

  const shortDesc = extractBetween(text, 'Short Description', ['Material', 'Dimensions', 'Care'])
  const material = extractBetween(text, 'Material', ['Dimensions', 'Care', 'Long Description'])
  const dimensions = extractBetween(text, 'Dimensions', ['Care', 'Long Description'])

  const careRaw = extractBetween(text, 'Care Instructions', ['Long Description'])
  const careInstructions = careRaw
    ? careRaw.split(/\.\s+/).map(s => s.trim()).filter(Boolean).map(s => s.endsWith('.') ? s : s + '.')
    : ['Dry Clean Only.']

  // Long description: everything after "Long Description :"
  const longDescMatch = text.match(/Long Description\s*[:–]?\s*(.+)$/is)
  const longDesc = longDescMatch
    ? longDescMatch[1].replace(/\s+/g, ' ').trim()
    : shortDesc

  return {
    name: name.replace(/\s*\(\s*/g, ' (').replace(/\s*\)\s*/g, ') ').trim(),
    priceDisplay,
    priceNumeric,
    shortDesc,
    material,
    dimensions,
    careInstructions,
    longDesc,
    fabric: material || null,
  }
}

function getImages(productDir) {
  const isImg = f => IMAGE_EXTS.includes(path.extname(f).toLowerCase())

  let entries
  try {
    entries = fs.readdirSync(productDir, { withFileTypes: true })
  } catch { return [] }

  // Priority 1: FINAL SET subfolder
  const finalSetDir = entries.find(e => e.isDirectory() && e.name.toUpperCase() === 'FINAL SET')
  if (finalSetDir) {
    const finalPath = path.join(productDir, finalSetDir.name)
    return fs.readdirSync(finalPath)
      .filter(f => isImg(f))
      .sort()
      .map(f => path.join(finalPath, f))
  }

  // Priority 2: imresizer- files in root
  const imresizerFiles = entries
    .filter(e => e.isFile() && e.name.toLowerCase().startsWith('imresizer') && isImg(e.name))
    .sort((a, b) => a.name.localeCompare(b.name))
  if (imresizerFiles.length > 0) {
    return imresizerFiles.map(e => path.join(productDir, e.name))
  }

  // Fallback: all image files in root
  return entries
    .filter(e => e.isFile() && isImg(e.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(e => path.join(productDir, e.name))
}

async function compressAndUpload(imagePath, storageName) {
  let buffer

  try {
    buffer = await sharp(imagePath)
      .rotate() // auto-rotate from EXIF
      .resize({ width: 1080, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer()
  } catch (e) {
    console.warn(`\n    ⚠ sharp failed (${path.basename(imagePath)}): ${e.message}`)
    buffer = fs.readFileSync(imagePath)
  }

  const fileName = `${storageName}.jpg`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true })

  if (error) throw new Error(`Upload failed for ${fileName}: ${error.message}`)

  return supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🗑  Deleting all existing products…')
  const { error: delErr } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // delete all
  if (delErr) { console.error('Delete failed:', delErr.message); process.exit(1) }
  console.log('   ✓ Cleared\n')

  const catFolders = fs.readdirSync(BASE)
    .filter(f => fs.statSync(path.join(BASE, f)).isDirectory())
    .sort()

  let total = 0

  for (const catFolder of catFolders) {
    const dbCategory = FOLDER_TO_DB_CAT[catFolder]
    if (!dbCategory) { console.warn(`⚠ Unknown folder: ${catFolder}`); continue }

    const catPath = path.join(BASE, catFolder)
    const productFolders = fs.readdirSync(catPath)
      .filter(f => fs.statSync(path.join(catPath, f)).isDirectory())
      .sort()

    console.log(`\n📁 ${catFolder} → "${dbCategory}" (${productFolders.length} products)`)

    for (const prodFolder of productFolders) {
      const prodPath = path.join(catPath, prodFolder)
      console.log(`  ┌ ${prodFolder}`)

      // Find main docx (not FAQ)
      const allFiles = fs.readdirSync(prodPath)
      const docxFile = allFiles.find(f =>
        f.endsWith('.docx') && !f.toLowerCase().includes('faq')
      )
      if (!docxFile) {
        console.warn('  └ ⚠ No product docx found, skipping')
        continue
      }

      const text = readDocxText(path.join(prodPath, docxFile))
      const { name, priceDisplay, priceNumeric, shortDesc, material, dimensions, careInstructions, longDesc, fabric } = parseProduct(text)

      if (!name) {
        console.warn('  └ ⚠ Could not parse name, skipping')
        continue
      }

      const slug = slugify(name)
      const imagePaths = getImages(prodPath)

      console.log(`  │ Name    : ${name}`)
      console.log(`  │ Price   : ${priceDisplay}`)
      console.log(`  │ Slug    : ${slug}`)
      console.log(`  │ Images  : ${imagePaths.length}`)
      process.stdout.write('  │ Upload  : ')

      // Upload images
      const imageUrls = []
      for (let i = 0; i < imagePaths.length; i++) {
        const storageName = `${slug}-${String(i + 1).padStart(2, '0')}`
        try {
          const url = await compressAndUpload(imagePaths[i], storageName)
          imageUrls.push(url)
          process.stdout.write('✓')
        } catch (e) {
          process.stdout.write('✗')
          console.warn(`\n  │         Error: ${e.message}`)
        }
      }
      console.log()

      // Insert product record
      const { error: insErr } = await supabase.from('products').insert({
        name,
        slug,
        category: dbCategory,
        price_display: priceDisplay || null,
        price_numeric: priceNumeric || null,
        short_description: shortDesc || '',
        description: longDesc || shortDesc || '',
        fabric: fabric || null,
        dimensions: dimensions || null,
        care_instructions: careInstructions,
        images: imageUrls,
        published: true,
        featured: false,
        stock_status: 'made_to_order',
        tags: [],
      })

      if (insErr) {
        console.error(`  └ ✗ DB insert failed: ${insErr.message}`)
      } else {
        total++
        console.log(`  └ ✓ Saved (${imageUrls.length} images)`)
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅  Done! ${total}/32 products seeded successfully.`)
  if (total < 32) console.log(`⚠   ${32 - total} products failed — check errors above.`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
