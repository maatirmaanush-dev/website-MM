// upload-images.mjs
// Uploads all product images from public/images/products/ to Supabase Storage
// and updates product records with the public URLs.
// Run: node --env-file=.env.local scripts/upload-images.mjs

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)
const BUCKET = 'product-images'
const imagesRoot = join(projectRoot, 'public', 'images', 'products')

function getMimeType(ext) {
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/png'
}

async function uploadProductImages(slug) {
  const dir = join(imagesRoot, slug)
  let files
  try {
    files = readdirSync(dir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f)).sort()
  } catch {
    console.log(`  No local images for ${slug}`)
    return []
  }

  const urls = []
  for (const file of files) {
    const filePath = join(dir, file)
    const ext = extname(file).toLowerCase()
    const storagePath = `${slug}/${file}`
    const fileData = readFileSync(filePath)
    const contentType = getMimeType(ext)

    console.log(`  Uploading ${storagePath} (${(fileData.length / 1024).toFixed(0)}KB)...`)

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileData, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.error(`  ERROR: ${error.message}`)
      continue
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    urls.push(publicUrl)
    console.log(`  OK: ${publicUrl}`)
  }

  return urls
}

async function run() {
  // Get all product slugs from DB
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name')

  if (error) {
    console.error('Failed to fetch products:', error.message)
    process.exit(1)
  }

  console.log(`Found ${products.length} products in DB\n`)

  for (const product of products) {
    console.log(`\n[${product.slug}]`)
    const urls = await uploadProductImages(product.slug)

    if (urls.length === 0) {
      console.log(`  Skipping DB update — no images uploaded`)
      continue
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ images: urls })
      .eq('id', product.id)

    if (updateError) {
      console.error(`  DB update error: ${updateError.message}`)
    } else {
      console.log(`  DB updated with ${urls.length} image(s)`)
    }
  }

  console.log('\n✓ Done.')
}

run().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
