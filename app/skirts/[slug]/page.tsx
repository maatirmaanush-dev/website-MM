import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Skirts')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
