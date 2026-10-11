-- Maatir Maanush — Migration
-- Run this in your Supabase SQL editor if you already ran the original schema.sql
-- Safe to run multiple times (uses IF NOT EXISTS / IF EXISTS guards)

-- 1. Remove old category CHECK constraint (too restrictive)
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;

-- 2. Make price_display nullable (some products are "Price on enquiry")
ALTER TABLE products ALTER COLUMN price_display DROP NOT NULL;

-- 3. Add inventory columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_status text NOT NULL DEFAULT 'made_to_order';
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity integer;

-- 4. Add h1/h2 to seo_settings (if not already present)
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS h1 text;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS h2 text;

-- 5. Fix blog_posts default category (was 'Craft', should be 'Craft & Culture')
ALTER TABLE blog_posts ALTER COLUMN category SET DEFAULT 'Craft & Culture';

-- 6. Add SEO meta fields to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description text;

-- 7. Add custom URL slug support to seo_settings (lets admins rename a static page's public URL)
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS previous_slug text;
CREATE UNIQUE INDEX IF NOT EXISTS seo_settings_slug_key ON seo_settings (slug) WHERE slug IS NOT NULL;

-- 8. Collapse stock_status to two values: 'available' | 'sold_out'
-- (pieces are made once and not remade, so "made to order" / "low stock" no longer apply)
UPDATE products SET stock_status = 'sold_out' WHERE stock_status = 'out_of_stock';
UPDATE products SET stock_status = 'available' WHERE stock_status IN ('made_to_order', 'low_stock');
ALTER TABLE products ALTER COLUMN stock_status SET DEFAULT 'available';
