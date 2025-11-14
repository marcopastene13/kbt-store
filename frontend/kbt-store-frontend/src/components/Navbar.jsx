import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBarCustom() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{background:'#212529'}}>
      <Container>
        <Navbar.Brand href="/">
          <img src="/logo.png" alt="KBT Store" height="32"/>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#catalogo">Catálogo</Nav.Link>
          <Nav.Link href="#ofertas">Ofertas</Nav.Link>
          <Nav.Link href="#contacto">Contacto</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
