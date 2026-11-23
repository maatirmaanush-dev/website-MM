import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type SeoRow = { page_path: string; slug: string | null; previous_slug: string | null }

const CACHE_TTL_MS = 30_000
let cache: { rows: SeoRow[]; fetchedAt: number } | null = null

async function getRenamedRows(supabase: ReturnType<typeof createServerClient>): Promise<SeoRow[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.rows
  const { data } = await supabase
    .from('seo_settings')
    .select('page_path, slug, previous_slug')
    .not('slug', 'is', null)
  const rows = (data ?? []) as SeoRow[]
  cache = { rows, fetchedAt: Date.now() }
  return rows
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()

    // Protect /admin/* — redirect to login if not authenticated
    if (!pathname.startsWith('/admin/login') && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Redirect authenticated users away from login page
    if (pathname === '/admin/login' && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/dashboard'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  }

  // Static-page slug renaming (set from the admin SEO tab): rewrite requests for a
  // custom slug to the real underlying route, and 301-redirect the old default path
  // (or a previously-used custom slug) to the current one.
  try {
    const rows = await getRenamedRows(supabase)
    for (const row of rows) {
      const activeSlug = row.slug as string
      if (!activeSlug || activeSlug === row.page_path) continue

      if (pathname === activeSlug) {
        const url = request.nextUrl.clone()
        url.pathname = row.page_path
        return NextResponse.rewrite(url)
      }
      if (pathname === row.page_path) {
        const url = request.nextUrl.clone()
        url.pathname = activeSlug
        return NextResponse.redirect(url, 308)
      }
      if (row.previous_slug && row.previous_slug !== activeSlug && pathname === row.previous_slug) {
        const url = request.nextUrl.clone()
        url.pathname = activeSlug
        return NextResponse.redirect(url, 308)
      }
    }
  } catch {
    // If the SEO lookup fails for any reason, fall through and serve the page normally.
  }

  return supabaseResponse
}

export const config = {
  // Pages only. Skip Next internals, API routes, /images and any request for a
  // file with an extension (images, fonts, robots.txt, sitemap.xml, icons...),
  // so asset requests don't pay for a Supabase client + SEO lookup.
  matcher: ['/((?!_next/|api/|images/|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
}
