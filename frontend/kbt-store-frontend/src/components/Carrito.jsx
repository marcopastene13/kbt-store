import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function Carrito() {
  const { carrito, eliminarProducto } = useContext(CarritoContext);

  if (carrito.length === 0) {
    return (
      <div className="mt-5">
        <p>Tu carrito está vacío.</p>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <h3 style={{color:'#FFD700'}}>Carrito de compras</h3>
      <ListGroup>
        {carrito.map((p, idx) => (
          <ListGroup.Item key={idx}>
            {p.nombre} - ${p.precio}
            <Button variant="danger" size="sm" className="float-end" onClick={() => eliminarProducto(p.id)}>
              Quitar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p className="mt-3" style={{fontWeight:'bold'}}>Total: ${carrito.reduce((sum, p) => sum + p.precio, 0)}</p>
    </div>
  )
}
