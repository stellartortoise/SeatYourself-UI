import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavMenu() {

  return (

        <nav className="nav-menu">

          <Link to="/" className=""><img className="nav-item" src="/SeatYourselfText_32.png" alt="logo"/></Link>

          <ul>
              {/* <li className="nav-item"><Link to="/">Cart</Link></li> */}
              {/* <li className="nav-item"><Link to="/orders">Orders</Link></li> */}
          </ul>

        </nav>
  );
}

export default NavMenu;