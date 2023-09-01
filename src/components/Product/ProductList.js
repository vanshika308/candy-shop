import React, { useState, useEffect, useContext } from 'react';
import { useCart } from '../../store/CartProvider';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
    useEffect(() => {
    // Fetch the products from your API endpoint
    fetch('https://crudcrud.com/api/9c41744241ce4fbfb749ed33b98ed43f/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product._id, 1)}>Buy 1</button>
            <button onClick={() => addToCart(product._id, 2)}>Buy 2</button>
            <button onClick={() => addToCart(product._id, 3)}>Buy 3</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
