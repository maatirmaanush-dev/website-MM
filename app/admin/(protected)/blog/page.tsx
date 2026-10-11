import { getBlogPosts } from '@/lib/actions/blog'
import Link from 'next/link'
import DeleteProductButton from '@/components/admin/DeleteProductButton'
import TogglePublishedButton from '@/components/admin/TogglePublishedButton'
import { Plus, Pencil } from 'lucide-react'

export default async function AdminBlogPage() {
  const posts = await getBlogPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-earth-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-earth-900 text-white px-4 py-2 rounded text-sm hover:bg-earth-700 transition"
        >
          <Plus size={14} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
          <p className="text-earth-500">No posts yet.</p>
          <Link href="/admin/blog/new" className="text-earth-700 text-sm underline mt-2 inline-block">Write your first post →</Link>
        </div>
      ) : (
        <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-beige-200 bg-beige-50">
              <tr>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Title</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Read Time</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-earth-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-beige-50">
                  <td className="px-4 py-3 font-medium text-earth-900">{post.title}</td>
                  <td className="px-4 py-3 text-earth-600">{post.category}</td>
                  <td className="px-4 py-3 text-earth-600">{post.read_time || '—'}</td>
                  <td className="px-4 py-3">
                    <TogglePublishedButton id={post.id} published={post.published} table="blog_posts" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/blog/${post.id}`} className="flex items-center gap-1 text-earth-600 hover:text-earth-900 transition">
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteProductButton id={post.id} table="blog_posts" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
