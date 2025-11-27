import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="#home"></Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Nav className="mx-auto d-flex flex-row">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <span className="divider"></span>
            <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavMenu;