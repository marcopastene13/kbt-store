import ProductCard from './ProductCard'
import productos from '../data/productos.json'

export default function Catalogo() {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

