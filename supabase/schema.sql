-- Maatir Maanush — Supabase Schema
-- Run this in your Supabase project SQL editor

-- ─────────────────────────────────────────────
-- PRODUCTS
-- ─────────────────────────────────────────────
create table if not exists products (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  slug              text not null unique,
  category          text not null,
  price_display     text,
  price_numeric     numeric(10,2),
  short_description text not null default '',
  description       text not null default '',
  images            text[] not null default '{}',
  dimensions        text,
  weight            text,
  fabric            text,
  care_instructions text[] not null default '{}',
  featured          boolean not null default false,
  tags              text[] not null default '{}',
  published         boolean not null default true,
  stock_status      text not null default 'available', -- 'available' | 'sold_out'
  stock_quantity    integer,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- BLOG POSTS
-- ─────────────────────────────────────────────
create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  excerpt     text not null default '',
  category    text not null default 'Craft & Culture',
  color       text not null default '#8B3A2A',
  image       text,
  body        jsonb not null default '[]',
  read_time   text,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- SEO SETTINGS
-- ─────────────────────────────────────────────
create table if not exists seo_settings (
  id            uuid primary key default gen_random_uuid(),
  page_path     text not null unique,
  title         text,
  description   text,
  og_image      text,
  keywords      text,
  h1            text,
  h2            text,
  slug          text unique,
  previous_slug text,
  updated_at    timestamptz not null default now()
);

-- Seed default SEO rows for all main pages
insert into seo_settings (page_path, title, description) values
  ('/', 'Maatir Maanush — Handcrafted Kantha Embroidery from Bengal', 'A living archive of soil and soul — handcrafted Kantha embroidery from Bengal. Coats, kaftans, jackets, kurtas and more.'),
  ('/new-drops', 'New Drops — Maatir Maanush', 'Explore new Kantha embroidery drops — sarees, jackets, coats, kaftans, kurtas, tops, and skirts handcrafted in Bengal.'),
  ('/the-art-of-kantha', 'The Art of Kantha — Maatir Maanush', 'Discover the ancient art of Kantha embroidery — its Bengal roots, cultural significance, and the centuries-old craftsmanship.'),
  ('/about-us', 'Our Story — Maatir Maanush', 'The story of Maatir Maanush — people of the soil, keepers of the stitch.'),
  ('/blog', 'Journal — Maatir Maanush', 'Stories of craft, community, and culture from the Maatir Maanush journal.'),
  ('/contact-us', 'Contact Us — Maatir Maanush', 'Get in touch with Maatir Maanush.'),
  ('/kantha-stitch-sarees', 'Kantha Stitch Sarees — Maatir Maanush', 'Handwoven Kantha stitch sarees in Gacchi Tussar and Katan silk.'),
  ('/kantha-jackets', 'Kantha Jackets — Maatir Maanush', 'Statement Kantha jackets handcrafted in Bengal.'),
  ('/kantha-coats', 'Kantha Coats — Maatir Maanush', 'Long layered Kantha coats — wearable art from Bengal.'),
  ('/kaftans', 'Kaftans — Maatir Maanush', 'Draped Kantha kaftans in handwoven cotton and silk.'),
  ('/kurtas', 'Kurtas — Maatir Maanush', 'Everyday Kantha kurtas — refined, handcrafted, effortlessly wearable.'),
  ('/faq', 'FAQ — Maatir Maanush', 'Frequently asked questions about Maatir Maanush and Kantha embroidery.'),
  ('/shipping-delivery', 'Shipping & Delivery — Maatir Maanush', 'Shipping and delivery information for Maatir Maanush orders.'),
  ('/returns', 'Returns & Exchanges — Maatir Maanush', 'Return and exchange policy for Maatir Maanush.'),
  ('/terms', 'Terms & Conditions — Maatir Maanush', 'Terms and conditions for Maatir Maanush.'),
  ('/privacy-policy', 'Privacy Policy — Maatir Maanush', 'Privacy policy for Maatir Maanush.')
on conflict (page_path) do nothing;

-- ─────────────────────────────────────────────
-- ENQUIRIES
-- ─────────────────────────────────────────────
create table if not exists enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  product_ref text,
  message     text not null default '',
  source      text not null default 'contact_form',
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table products     enable row level security;
alter table blog_posts   enable row level security;
alter table seo_settings enable row level security;
alter table enquiries    enable row level security;

-- Public can read published products and blog posts
create policy "public read products"
  on products for select using (published = true);

create policy "public read blog posts"
  on blog_posts for select using (published = true);

create policy "public read seo"
  on seo_settings for select using (true);

create policy "public insert enquiries"
  on enquiries for insert with check (true);

-- Service role bypasses RLS — used by server actions with SUPABASE_SERVICE_ROLE_KEY

-- ─────────────────────────────────────────────
-- STORAGE
-- ─────────────────────────────────────────────
-- Run separately in Storage tab or via API:
-- Create a bucket named "product-images" with public: true
-- Create a bucket named "blog-images" with public: true

-- ─────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on products
  for each row execute function handle_updated_at();

create trigger set_blog_posts_updated_at
  before update on blog_posts
  for each row execute function handle_updated_at();

create trigger set_seo_updated_at
  before update on seo_settings
  for each row execute function handle_updated_at();
