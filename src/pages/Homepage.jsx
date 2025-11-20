import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const featuredProducts = products.slice(0, 3);
  const categories = [
    { id: 1, name: "Electrónica", color: "category-electronics" },
    { id: 2, name: "Moda", color: "category-fashion" },
    { id: 3, name: "Hogar", color: "category-home" },
    { id: 4, name: "Deportes", color: "category-sports" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setEmail("");
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a KBT Store</h1>
          <p>Descubre nuestros productos premium y de calidad garantizada</p>
          <Link to="/catalog" className="btn btn-primary btn-lg">
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Categorías Grid */}
      <section className="categories-section container">
        <h2 className="section-title">CATEGORÍAS</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${category.color}`}
            >
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <Link to="/catalog" className="category-link">
                  Explorar →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products container">
        <h2 className="section-title">NUESTROS PRODUCTOS DESTACADOS</h2>
        <p className="section-subtitle">
          Los mejores productos seleccionados para ti
        </p>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="view-all-btn">
          <Link to="/catalog" className="btn btn-outline-primary btn-lg">
            Ver Todo el Catálogo
          </Link>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">¿POR QUÉ ELEGIR KBT STORE?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Envío Rápido</h3>
              <p>Entrega en 24-48 horas a todo el país</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💯</div>
              <h3>Calidad Garantizada</h3>
              <p>Productos originales con garantía verificada</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💳</div>
              <h3>Pagos Seguros</h3>
              <p>Múltiples formas de pago con encriptación</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Devoluciones Fáciles</h3>
              <p>Devuelve en 30 días si no estás satisfecho</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Suscríbete a Nuestro Newsletter</h2>
            <p>
              Recibe ofertas exclusivas y promociones directamente en tu correo
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Suscribirse
              </button>
            </form>
            {emailSubmitted && (
              <p className="success-message">Gracias por suscribirse</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
