const Cart = ({ cartItems }) => {
    // Check if cartItems is undefined or empty
    if (!cartItems || cartItems.length === 0) {
      return <p>Your cart is empty.</p>;
    }
  
    return (
      <div className="cart">
        <h2>Cart Items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.product} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Cart;