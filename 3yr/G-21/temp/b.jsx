import React, { useState } from 'react';

const AddToCartButton = () => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div>
      <button onClick={addToCart}>Add to Cart</button>
      <p>Items in Cart: {cartItems}</p>
    </div>
  );
};

export default AddToCartButton;
