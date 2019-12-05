import Index from './index'
import { useRouter } from 'next/router'
import productsActions from "../src/redux/actions/products"

const {
  fetchProducts,
  selectProduct
} = productsActions

const CategoryIndex = (props) => {
  const {
    products
  } = props

  const router = useRouter()
  const { category } = router.query

  return (
    <Index products={products} category={category} />
  )
}

CategoryIndex.getInitialProps = async ({store, query}) => {
  const { category } = query

  const products = await store.dispatch(fetchProducts(category)); 

  console.log("Products", products);
  
  return { products };
}

export default CategoryIndex