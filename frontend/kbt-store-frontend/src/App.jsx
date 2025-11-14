import NavBarCustom from './components/Navbar'
import CarouselJumbo from './components/CarouselJumbo'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <div>
      <NavBarCustom />
      <div className="container mt-4">
        <CarouselJumbo />
        <div className="mt-5 d-flex justify-content-center">
          <ProductCard />
        </div>
      </div>
      <footer className="text-center p-3" style={{background:'#212529', color:'#CED4DA'}}>
        &copy; 2025 KBT Store | Instagram & Facebook
      </footer>
    </div>
  )
}

export default App
