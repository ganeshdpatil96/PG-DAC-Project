import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoleNavbar from './RoleNavbar';

const { Fragment } = require('react');

function NavBar() {
  const state = useSelector((state) => state);
  console.log('LoggedIn ', state.loggedin);
  console.log('Cart ', state.cart);
  return (
    <Fragment>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-info  position-sticky"
        style={{ top: 0, zIndex: '1000' }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-light"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-light" to="/">
                HOME
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
          DONATION
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="https://www.educategirls.ngo/Donate.aspx?gclid=CjwKCAjw1ICZBhAzEiwAFfvFhLRi6n86TL05gbnpTdARqc5c_O_C4b_Im7QXjNmkGsNs5TLILr5wVBoC0zwQAvD_BwE">
    Educate Girls
      </a>
    <a class="dropdown-item" href="https://navjyotandhjanmandal.org/donation-for-india/">
      Food Donation
    </a>
    <a class="dropdown-item" href="https://help.unicef.org/in/drtv2022?campaignID=7015q0000004oQeAAI&campaignid=17569150762&adgroupid=144897035944&adid=605949172696&gclid=CjwKCAjw1ICZBhAzEiwAFfvFhC6scQHKuQ0GvFs9PbLvvkLEwv8_MWWNAzI17KoP31oHgLcnnMbJBBoCKSIQAvD_BwE">
      India's Childrens
    </a>
  </div>
      </li>
      <li className="nav-item active">
              <Link className="nav-link text-light" to="/category">
                CATEGORY
              </Link>
            </li>
            
            <li className="nav-item ">
              <Link
                className="nav-link text-light"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                
              </Link>
              
            </li>

            <li className="nav-item ">
              <Link
                className="nav-link  text-light"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                
              </Link>
              
            </li>

            <li className="nav-item  ">
              <Link
                className="nav-link text-light"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                
              </Link>
              
            </li>

            <li className="nav-item  ">
              <Link
                className="nav-link  text-light"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                
              </Link>
              
            </li>
          </ul>
          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;
