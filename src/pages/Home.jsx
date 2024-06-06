import Products from '../components/Products';

const Home = () => {
  return (
    <div>
      <h2 className="heading">Welcome to the Store</h2>
      <section>
        <h3>Product</h3>
        <Products />
              </section>
    </div>
  )
}

export default Home