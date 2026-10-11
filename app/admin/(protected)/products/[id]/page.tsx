import { getProductById } from '@/lib/actions/products'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  if (!product) notFound()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-earth-900 mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}
