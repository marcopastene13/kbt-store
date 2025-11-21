import { Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

const Cart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Mi Carrito</h2>
          <button className="btn-close" onClick={() => setIsCartOpen(false)}></button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h6>{item.name}</h6>
                  <p>${item.price.toLocaleString('es-CL')}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>X</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total:</strong>
              <strong>$ {getTotalPrice().toLocaleString('es-CL')}</strong>
            </div>
            <button className="btn btn-primary btn-block w-100 mb-2">Comprar</button>
            <button className="btn btn-outline-danger btn-block w-100" onClick={clearCart}>Vaciar carrito</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
