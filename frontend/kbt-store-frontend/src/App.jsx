import NavBarCustom from './components/Navbar'
import CarouselJumbo from './components/CarouselJumbo'
import Catalogo from './components/Catalogo'
import Carrito from './components/Carrito';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBarCustom />
      <main className="flex-grow-1">
        <section>
          <CarouselJumbo />
        </section>
        <section className="container mt-5">
          <h2 style={{ color: '#FFD700', fontWeight: 'bold' }}>Catálogo Destacado</h2>
          <Catalogo />
        </section>
      </main>
      <footer className="footer text-center p-3 mt-auto" style={{ background: '#212529', color: '#CED4DA', borderTop: '2px solid #FFD700' }}>
        <div>
          &copy; 2025 KBT Store
        </div>
        <div className="mt-2">
          <a href="https://instagram.com/kbtstorecl" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#FFD700' }}>
            <i className="bi bi-instagram" style={{ fontSize: '1.6rem' }}></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61583190283760" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#FFD700' }}>
            <i className="bi bi-facebook" style={{ fontSize: '1.6rem' }}></i>
          </a>
          <a href="mailto:soporte.kbtstore@outlook.com" className="mx-2" style={{ color: '#FFD700' }}>
            <i className="bi bi-envelope-fill" style={{ fontSize: '1.6rem' }}></i>
          </a>
          <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#FFD700' }}>
            <i className="bi bi-whatsapp" style={{ fontSize: '1.6rem' }}></i>
          </a>
        </div>
        <div className="mt-2" style={{ fontSize: '0.9rem' }}>
          Síguenos en Instagram y Facebook &mdash; soporte.kbtstore@outlook.com
        </div>
      </footer>

    </div>
  );
}

export default App
