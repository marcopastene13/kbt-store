import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const image = product.images ? product.images[0] : product.image;

  const handleAddToCart = () => {
    // Crear objeto sin el array de imágenes para el carrito
    const productToCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: image, // Usar solo la primera imagen
      category: product.category,
      stock: product.stock
    };
    addToCart(productToCart);
  };

  return (
    <div className="card h-100 product-card">
      <img src={image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">Cantidad: {product.stock}</p>
        <p className="card-price">$ {product.price.toLocaleString('es-CL')}</p>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-outline-secondary flex-grow-1">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
