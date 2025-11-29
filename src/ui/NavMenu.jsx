import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
        // <Navbar expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
        // <Container>
        //     <div className="navbar-container">
        //     <Navbar.Brand as={Link} to="/">SeatYourself</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="main-navbar" />
        //     <Navbar.Collapse id="main-navbar">
        //     <Nav className="ms-auto d-flex flex-row align-items-center">
        //         <Nav.Link as={Link} to="/">Home</Nav.Link>
        //         <span className="divider mx-2" />
        //         <Nav.Link as={Link} to="/occasions">Occasions</Nav.Link>
        //     </Nav>
        //     </Navbar.Collapse>
        //     </div>
        // </Container>
        // </Navbar>

        <nav className="nav-menu">
          <Link to="/" className=""><img className="nav-item" src="public\SeatYourselfText_32.png" alt="logo"/></Link>
            <ul>
                <li className="nav-item"><Link to="/">Cart</Link></li>
                <li className="nav-item"><Link to="/occasions">Purchases</Link></li>
            </ul>
        </nav>
  );
}

export default NavMenu;