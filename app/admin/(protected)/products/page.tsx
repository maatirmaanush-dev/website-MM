import { getProducts } from '@/lib/actions/products'
import Link from 'next/link'
import Image from 'next/image'
import DeleteProductButton from '@/components/admin/DeleteProductButton'
import TogglePublishedButton from '@/components/admin/TogglePublishedButton'
import { Plus, Pencil } from 'lucide-react'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-earth-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-earth-900 text-white px-4 py-2 rounded text-sm hover:bg-earth-700 transition"
        >
          <Plus size={14} /> New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
          <p className="text-earth-500">No products yet.</p>
          <Link href="/admin/products/new" className="text-earth-700 text-sm underline mt-2 inline-block">Add your first product →</Link>
        </div>
      ) : (
        <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-beige-200 bg-beige-50">
              <tr>
                <th className="text-left px-4 py-3 text-earth-700 font-medium w-12"></th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Price</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Stock</th>
                <th className="text-left px-4 py-3 text-earth-700 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-earth-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-beige-50">
                  <td className="px-4 py-2">
                    {product.images?.[0] ? (
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-beige-100 shrink-0">
                        <Image src={product.images[0]} alt="" fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded bg-beige-200" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-earth-900">{product.name}</td>
                  <td className="px-4 py-3 text-earth-600">{product.category}</td>
                  <td className="px-4 py-3 text-earth-600">{product.price_display || '—'}</td>
                  <td className="px-4 py-3">
                    {product.stock_status === 'sold_out' ? (
                      <span className="text-xs px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">Sold Out</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Available</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <TogglePublishedButton
                      id={product.id}
                      published={product.published}
                      table="products"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="flex items-center gap-1 text-earth-600 hover:text-earth-900 transition"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteProductButton id={product.id} table="products" />
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
