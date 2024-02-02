import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginRegisterMenu from "./LoginRegisterMenu";

const RoleNavbar = ({ isLoggedIn }) => {
  const logout = (e) => {
    dispatch({ type: "LogOut" });
    sessionStorage.clear();
    history.push("/"); 
  };
  const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(sessionStorage.getItem("role"), isLoggedIn);
  if (!isLoggedIn) {
    return <LoginRegisterMenu />;
  } else if (sessionStorage.getItem("role") === "receiver") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/cart">
            View Cart{" "}
            {state.cart.length === 0 ? (
              ""
            ) : (
              <span className="badge badge-primary p-2">
                {state.cart
                  .map((x) => x.qty)
                  .reduce((a, b) => parseInt(a) + parseInt(b))}
              </span>
            )}
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/cprofile">
            Profile
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/myorders">
            My Orders
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" onClick={logout} to="#">
            Logout
          </Link>
        </li>
      </ul>
    );
  } else if (sessionStorage.getItem("role") === "donor") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link  text-light" to="/sprofile">
            Profile
          </Link>
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
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="nav-link" to="/myproducts">
           View
          </Link>
        
        <Link className="nav-link " to="/add-product">
            Add
          </Link>
        
        <Link className="nav-link" to="/request">
            Request
          </Link>
        </div>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" onClick={logout} to="#">
            Logout
          </Link>
        </li>
      </ul>
    );
  }else if (sessionStorage.getItem("role") === "admin"){
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/aprofile">
            Profile
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/donors">
            Donor
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/receivers">
            Receiver
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/product">
            Products
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/orders">
            Bookings
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" onClick={logout} to="#">
            Logout
          </Link>
        </li>
      </ul>
    );
  }
  
};

export default RoleNavbar;