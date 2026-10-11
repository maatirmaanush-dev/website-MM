import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Limited Editions')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
