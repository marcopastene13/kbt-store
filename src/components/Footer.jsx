import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 footer-section">
            <h5 className="footer-title">KBT Store</h5>
            <p>Tu tienda de productos premium y de calidad.</p>
          </div>
          <div className="col-md-3 footer-section">
            <h5 className="footer-title">Enlaces</h5>
            <a href="/" className="footer-link">Inicio</a>
            <a href="/catalog" className="footer-link">Catálogo</a>
            <a href="/contact" className="footer-link">Contacto</a>
          </div>
          <div className="col-md-3 footer-section">
            <h5 className="footer-title">Contacto</h5>
            <p className="footer-link">Email: info@kbtstore.com</p>
            <p className="footer-link">Tel: +56 9 1234 5678</p>
          </div>
          <div className="col-md-3 footer-section">
            <h5 className="footer-title">Redes Sociales</h5>
            <a href="#" className="footer-link">Facebook</a>
            <a href="#" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center py-3">
        <p>&copy; {currentYear} KBT Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
