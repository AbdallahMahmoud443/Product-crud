import './App.css'
import ProductCard from './components/ProductCard'
import { productList } from './data/ProductData';


function App() {
  //** Renders */
  const renderProductList = productList.map((product) => {
    return (
      <ProductCard key={product.id} product={product}/>
    );
  });
  return (
    <>
      <main className='container mx-auto'>
        <section className='my-5 mx-2 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {renderProductList}
        </section>
      </main>

    </>
  )
}

export default App
