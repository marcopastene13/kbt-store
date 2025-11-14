import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ProductCard() {
  return (
    <Card style={{width: '20rem'}}>
      <Card.Img variant="top" src="/demo-product.jpg" />
      <Card.Body>
        <Card.Title style={{color:'#FFD700'}}>Auriculares Inalámbricos</Card.Title>
        <Card.Text>
          La mejor calidad para tu día a día. ¡Envío rápido!
        </Card.Text>
        <Button variant="primary">Comprar ahora</Button>
      </Card.Body>
    </Card>
  )
}
