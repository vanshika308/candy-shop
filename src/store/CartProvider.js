import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); 
  const [totalProducts, setTotalProducts] = useState(0); 

  const addToCart = (product, quantity) => {
    fetch('https://crudcrud.com/api/9c41744241ce4fbfb749ed33b98ed43f/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product, quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        return response.json();
      })
      .then((data) => {
        if (!data.updatedCart) {
          throw new Error('Invalid response format when adding item to cart');
        }
        console.log('Cart updated successfully:', data);
        // Update the cart state with the data received from the server
        setCart(data.updatedCart);
        const calculatedTotalAmount = data.updatedCart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const calculatedTotalProducts = data.updatedCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setTotalAmount(calculatedTotalAmount);
        setTotalProducts(calculatedTotalProducts);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };
  useEffect(() => {
    fetch('https://crudcrud.com/api/9c41744241ce4fbfb749ed33b98ed43f/cart') 
      .then((response) => response.json())
      .then((data) => {
        setCart(data); 
        const calculatedTotalAmount = data.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const calculatedTotalProducts = data.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setTotalAmount(calculatedTotalAmount);
        setTotalProducts(calculatedTotalProducts);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, [setCart]); 
  

 
  
  


  return (
    <CartContext.Provider value={{ cart, addToCart, totalAmount, totalProducts }}>
      {children}
    </CartContext.Provider>
  );
};
