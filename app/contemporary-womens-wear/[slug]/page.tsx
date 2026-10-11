import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Dresses')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
