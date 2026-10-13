import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="cart-container">
      <h1>Paradise Nursery Shopping Cart</h1>

      <h2>Total Cart Items: {totalItems}</h2>

      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>

      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              width="120"
              height="120"
              style={{ objectFit: "cover" }}
            />

            <h3>{item.name}</h3>

            <p>Unit Price: ${item.price.toFixed(2)}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button onClick={() => handleDecrease(item)}>
              -
            </button>

            <button onClick={() => handleIncrease(item)}>
              +
            </button>

            <button onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        ))
      )}

      <div className="cart-buttons">
        <button onClick={handleCheckout}>
          Checkout
        </button>

        <button onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartItem;
