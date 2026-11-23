// Shown instantly while a page is being fetched/rendered, so clicking a link
// gives immediate feedback instead of the old page appearing frozen.
export default function Loading() {
  return (
    <main
      className="min-h-screen bg-beige-50 pt-28 sm:pt-36 pb-16 px-6 lg:px-10"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>

      <div className="max-w-[1600px] mx-auto animate-pulse">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="h-3 w-24 rounded-sm bg-beige-200" />
          <div className="h-8 sm:h-10 w-64 sm:w-96 rounded-sm bg-beige-200" />
          <div className="h-3 w-48 sm:w-72 rounded-sm bg-beige-100" />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-[3/4] rounded-sm bg-beige-200" />
              <div className="h-4 w-3/4 rounded-sm bg-beige-200" />
              <div className="h-3 w-1/3 rounded-sm bg-beige-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
