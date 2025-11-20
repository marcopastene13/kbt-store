import React, { useState } from 'react';
import '../styles/catalog.css';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const Catalog = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const categories = ['todos', 'electrónica', 'accesorios'];

  return (
    <div className="catalog">
      <div className="container py-5">
        <h1 className="section-title">Nuestro Catálogo</h1>
        
        <div className="category-filters mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-3 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
