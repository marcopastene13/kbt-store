import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ProductCard({ producto }) {
  const { agregarProducto } = useContext(CarritoContext);

  return (
    <Card style={{width: '18rem', margin: '10px'}}>
      <Card.Img variant="top" src={producto.imagen} />
      <Card.Body>
        <Card.Title style={{color:'#FFD700'}}>{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>
        <Card.Text style={{color:'#2A7FFF', fontWeight:'bold'}}>${producto.precio}</Card.Text>
        <Button variant="primary" onClick={() => agregarProducto(producto)}>
          Comprar
        </Button>
      </Card.Body>
    </Card>
  )
}
