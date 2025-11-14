import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import OffcanvasCarrito from './OffcanvasCarrito';

export default function NavBarCustom() {
  const { carrito } = useContext(CarritoContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{background:'#212529'}}>
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="KBT Store" height="32"/>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <Nav.Link style={{position:'relative'}} onClick={handleShow}>
              <i className="bi bi-cart3" style={{fontSize:'1.7rem', color:'#FFD700'}}></i>
              {carrito.length > 0 && (
                <Badge bg="danger" pill style={{position:'absolute', top:0, right:2}}>
                  {carrito.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <OffcanvasCarrito show={show} handleClose={handleClose} />
    </>
  );
}
