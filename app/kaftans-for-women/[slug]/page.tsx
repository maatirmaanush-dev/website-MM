import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Kaftans')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
