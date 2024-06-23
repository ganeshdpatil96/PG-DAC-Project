
import { Link } from "react-router-dom";

function LoginRegisterMenu() {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-light"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          LOGIN
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/alogin">
            ADMIN
          </Link>
          <Link className="dropdown-item" to="/slogin">
            DONOR
          </Link>
          <Link className="dropdown-item" to="/clogin">
          RECEIVER
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
      
        <a
          className="nav-link dropdown-toggle text-light"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          SIGN UP
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/regdonor">
            DONOR
          </Link>
          <Link className="dropdown-item" to="/register">
            RECEIVER
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default LoginRegisterMenu;
