import { createProductDetailPage } from '@/components/products/ProductDetailPage'
const { default: ProductPage, generateStaticParams, generateMetadata, dynamicParams, revalidate } = createProductDetailPage('Kantha Jackets')
export { ProductPage as default, generateStaticParams, generateMetadata, dynamicParams, revalidate }
