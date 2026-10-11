/**
 * Trim an auto-derived meta description to something a SERP will actually show.
 *
 * Product pages fall back to `short_description` when the admin has not written a
 * meta description, and those run 350-470 characters — Google renders roughly the
 * first 155, so the rest is just weight. Cuts at a sentence end where one lands in
 * range, otherwise at a word boundary.
 *
 * Only ever applied to the FALLBACK. An admin-authored meta_description is their
 * explicit choice and passes through untouched.
 */
export function clampDescription(text: string | null | undefined, max = 155): string | undefined {
  if (!text) return undefined
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean

  const window = clean.slice(0, max + 1)

  // Prefer ending on a complete sentence if one finishes late enough to still read
  // as a full thought rather than a fragment.
  const sentence = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '))
  if (sentence >= max * 0.6) return clean.slice(0, sentence + 1)

  const space = window.lastIndexOf(' ')
  return clean.slice(0, space > 0 ? space : max).replace(/[,;:\-\u2013\u2014]$/, '') + '\u2026'
}
