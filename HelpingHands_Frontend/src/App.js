import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import RegDonor from "./components/RegDonor";
import NavBar from "./components/NavBar";
import RegReceiver from "./components/RegReceiver";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminProfile from "./components/AdminProfile";
import AllProduct from "./components/AllProducts";
import DonorLogin from "./components/DonorLogin";
import ReceiverLogin from "./components/ReceiverLogin";
import DonorProfile from "./components/DonorProfile";
import ReceiverProfile from "./components/ReceiverProfile";
import TopSlider from "./components/TopSlider";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct"
import EditProduct from './components/EditProduct';
import MyProducts from './components/MyProducts';
import CategorySort from "./components/CategorySort";
import ViewCart from './components/ViewCart';
import AllReceiver from "./components/AllReceiver";
import AllDonors from "./components/AllDonors";
import MyOrders from "./components/MyOrders";
import Orders from "./components/Orders";
import DonorOrderDetails from "./components/DonorOrderDetails";
import AdminProduct from "./components/AdminProduct";




function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-2">
          <TopSlider />
        </div>
        <Switch>
        <Route component={CategorySort} path="/category"  />
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cat/:pcat/:subcat" />
          <Route component={RegDonor} path="/Regdonor" />
          <Route component={RegReceiver} path="/register" />
          <Route component={AdminLogin} path="/alogin" />
          <Route component={DonorLogin} path="/slogin" />
          <Route component={AddProduct} path="/add-product" />          
          <Route component={EditProduct} path="/edit/:prodid" />          
          <Route component={MyProducts} path="/myproducts" />  
          <Route component={MyOrders} path="/myorders" />
          <Route component={Orders} path="/orders" />
          <Route component={ReceiverLogin} path="/clogin" />
          <Route component={AdminProfile} path="/aprofile" />
          <Route component={AllReceiver} path="/receivers" /> 
          <Route component={AllDonors} path="/donors" />  
          <Route component={DonorProfile} path="/sprofile" />
          <Route component={ReceiverProfile} path="/cprofile" />
          <Route component={ViewCart} path="/cart" /> 
          <Route component={Footer} path="/footer" />
          <Route component={DonorOrderDetails} path="/request" /> 
          <Route component={AdminProduct} path="/product" /> 
          
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
