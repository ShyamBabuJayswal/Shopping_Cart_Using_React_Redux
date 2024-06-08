import { useEffect } from 'react';
import { add } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products = [], status = 'idle' } = useSelector((state) => state.product);

  useEffect(() => {
    // Dispatching fetchProducts action to load products
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <div className='productsWrapper'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading products</p>}
      {status === 'succeeded' &&
        products.map((product) => (
          <div className='card' key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button onClick={() => handleAdd(product)} className='btn'>Add to Cart</button>
          </div>
        ))}
    </div>
  );
};

export default Products;
