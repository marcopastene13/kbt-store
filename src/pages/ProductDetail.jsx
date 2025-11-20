import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productDetail.css';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return <div className="container py-5"><h2>Producto no encontrado</h2></div>;

  const handleAddToCart = () => {
    const productToCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImageIndex] || product.images[0],
      category: product.category,
      stock: product.stock
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToCart);
    }
    alert('Productos añadidos al carrito');
  };

  const mainImage = product.images ? product.images[selectedImageIndex] : product.image;

  // Convertir saltos de línea en array para renderizar correctamente
  const descriptionLines = product.description.split('\n');

  return (
    <div className="product-detail py-5">
      <div className="container">
        <div className="row">
          {/* Galería de imágenes */}
          <div className="col-md-6">
            <div className="image-gallery">
              {/* Imagen principal */}
              <div className="main-image-container">
                <img src={mainImage} alt={product.name} className="main-image" />
              </div>

              {/* Miniaturas */}
              {product.images && product.images.length > 1 && (
                <div className="thumbnail-container">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={img} alt={`${product.name} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="price">$ {product.price.toLocaleString('es-CL')}</p>
            <p className="stock">Stock disponible: {product.stock}</p>
            
            {/* Descripción con saltos de línea */}
            <div className="description">
              {descriptionLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="quantity-selector mb-3">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;