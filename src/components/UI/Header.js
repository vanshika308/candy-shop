import React, { useState } from 'react';
import { useCart } from '../../store/CartProvider';
import Cart from '../Cart/Cart'; // Import the Cart component you created

const Header = () => {
  const { cart } = useCart();
  const [isCartVisible, setCartVisibility] = useState(false);

  // Function to toggle the visibility of the cart
  const toggleCart = () => {
    setCartVisibility(!isCartVisible);
  };

  // Calculate the total quantity of items in the cart
  const totalItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div>
      <nav>
        {/* Navigation items */}
      </nav>
      <div>
        {/* Toggle cart visibility when the button is clicked */}
        <button onClick={toggleCart}>Cart ({totalItems})</button>
      </div>
      {/* Render the Cart component if isCartVisible is true */}
      {isCartVisible && <Cart cartItems={cart || []} />} {/* Provide an empty array as a default value if cart is undefined */}
    </div>
  );
};

export default Header;
