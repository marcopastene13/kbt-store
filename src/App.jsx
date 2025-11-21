import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </main>
          <Cart />
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
