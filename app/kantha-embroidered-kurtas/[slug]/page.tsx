import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Kurtas')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
