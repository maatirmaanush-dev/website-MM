import { getBlogPostById } from '@/lib/actions/blog'
import BlogForm from '@/components/admin/BlogForm'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id)
  if (!post) notFound()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-earth-900 mb-6">Edit Post</h1>
      <BlogForm post={post} />
    </div>
  )
}
