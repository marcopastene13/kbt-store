import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function OffcanvasCarrito({ show, handleClose }) {
  const { carrito, eliminarProducto, quitarUnidadProducto, sumarUnidadProducto, setCarrito } = useContext(CarritoContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Estados controlados del formulario
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // Abrir/cerrar modal
  const handleOpenCheckout = () => setShowCheckout(true);
  const handleCloseCheckout = () => setShowCheckout(false);

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompraExitosa(true);
    setTimeout(() => {
      setCompraExitosa(false);
      setShowCheckout(false);
      handleClose();
      setDatos({ nombre: '', email: '', direccion: '', telefono: '' });
      setCarrito([]); // Limpia el carrito luego de la compra exitosa
    }, 3000);
  };

  // Calcular total
  const total = carrito.reduce((sum, p) => sum + (p.precio * (p.cantidad || 1)), 0);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <ListGroup>
                {carrito.map((p, idx) => (
                  <ListGroup.Item key={idx}>
                    <img src={p.imagen} alt={p.nombre} width={40} style={{ marginRight: 8 }} />
                    {p.nombre} - ${p.precio} <b>x {p.cantidad}</b>
                    <Button variant="secondary" size="sm" onClick={() => quitarUnidadProducto(p.id)} style={{ marginLeft: 8, marginRight: 4 }} disabled={p.cantidad === 1}>−</Button>
                    <Button variant="secondary" size="sm" onClick={() => sumarUnidadProducto(p.id)} style={{ marginRight: 4 }}>+</Button>
                    <Button variant="danger" size="sm" className="float-end" onClick={() => eliminarProducto(p.id)}>Quitar</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <p className="mt-3" style={{ fontWeight: 'bold' }}>
                Total: ${total}
              </p>
              <Button variant="primary" className="w-100 mt-3" onClick={handleOpenCheckout}>
                Finalizar compra
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal de checkout */}
      <Modal show={showCheckout} onHide={handleCloseCheckout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {compraExitosa ? (
            <div className="text-center">
              <i className="bi bi-bag-check" style={{ fontSize: '3rem', color: '#FFD700' }}></i>
              <h4 className="mt-3">¡Gracias por tu compra!</h4>
              <p>Pronto te contactaremos con los detalles de tu pedido.</p>
            </div>
          ) : (
            <>
              <h5>Resumen del pedido</h5>
              <ListGroup as="ul" className="mb-3">
                {carrito.map((p, idx) => (
                  <ListGroup.Item as="li" key={idx}>
                    {p.nombre} x{p.cantidad} — ${p.precio * p.cantidad}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item as="li" style={{ fontWeight: 'bold' }}>
                  Total: ${total}
                </ListGroup.Item>
              </ListGroup>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    required
                    placeholder="Ejemplo: Juan Pérez"
                    value={datos.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="tucorreo@email.com"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDireccion">
                  <Form.Label>Dirección de envío</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    required
                    placeholder="Ej: Calle Falsa 123, Maipú, RM"
                    value={datos.direccion}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    required
                    placeholder="+56912345678"
                    value={datos.telefono}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Confirmar & Pagar
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
