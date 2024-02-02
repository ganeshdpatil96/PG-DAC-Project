import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {BASE_API} from "./ApiConstant";
//import { AxiosResponse, AxiosError } from 'axios'
import swal from 'sweetalert';

function ViewCart() {
 
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const [address, setAddress] = useState({
    city: "",
    state: "Maharashtra",
    zip: "415124",
    country: "India",
  });

  

  // const [payment, setPayment] = useState({
  //   cardno: "1212444433336666",
  //   nameoncard: "Test Name",
  //   cvv: "123",
  //   amount: state.cart.reduce((a, b) => a + b.price, 0),
  // });

  const deleteItem = (item) => {
    //let resp = window.confirm("Are you sure to delete this item ?");

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Product has been deleted!", {
          icon: "success",
        });
        dispatch({ type: "RemoveItem", payload: item });
        history.push('/')
      } else {
        swal("Your Product is safe!",{
          icon:"info"
        });
      }
    });
  };
  const handleAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  

  // useEffect(() => {
   
  //   let amount = state.cart.reduce((a, b) => a + b.price * parseInt(b.qty), 0);
  //   setPayment({ ...payment, amount: amount });
    
  //   console.log("Amount => ", amount);
    
  // }, [state.cart]);
  // let id;
  // state.cart.map((item)=>(id=item.prodid));

  const handleSubmit = (e) => {
  
    e.preventDefault();
    //setSubmitted(true)
  //   let amount = state.cart.reduce((a, b) => a + b.price * parseInt(b.qty), 0);
  //  console.log("Amount ", payment.amount);
  //  setPayment({ ...payment, amount: amount });
    

    let data = {
      cart: state.cart,
      address: address,
      receiverid: sessionStorage.getItem("id"),
    };


  axios
  .post(BASE_API+"/api/orders", data)
  .then((resp) => {
    if(resp.status==200){
      console.log("jksdgasdfh",resp.status);
      dispatch({ type: "Clear" });
      history.push("/myorders");
    }else{
      //alert("Invalide Quantiy")
      swal({
        title: "Invalide Quantiy!!",
        text: "Please check the Quantity and Try Again!!",
        icon: "warning",
      })
      dispatch({ type: "RemoveItem", payload: state.cart[0] });
      history.push("/")
    }
   
  });

    
    
    
  };
  return (
    <div className="container-fluid ">
      {state.cart.length > 0 ? (
        <div className="row">
          <div className="col-sm-7">
            <h4 className="p-2">Cart View</h4>
            <table className="table table-bordered table-light table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Prodid</th>
                  
                  <th>Product Name</th>
                  <th>Qty</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((item) => (
                  <tr key={item.prodid}>
                    <td>{item.prodid}</td>
                    
                    <td>
                      <img
                        className="mr-2 float-left"
                        src={BASE_API+"/" + item.photo}
                        width="100"
                      />
                      {item.pname}
                    </td>
                    
                    <td>{item.qty}</td>
                    
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className="btn btn-danger btn-md"
                      >
                         <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>
          <div className="col-sm-4">
            <form onSubmit={handleSubmit}>
              <h5 className="p-2">Address Information</h5>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">City</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="city"
                    required
                    value={address.city}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">State</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="state"
                    required
                    value={address.state}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Zip</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="zip"
                    required
                    value={address.zip}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Country</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="country"
                    required
                    value={address.country}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>

              
              <button className="btn btn-success float-right">
                Place Order
              </button>
            </form>
          </div>
        </div>
        
      ) : (
        <h5 className="text-dark text-center mt-4">Cart is Empty</h5>
        
      )}
    </div>
  );
}

export default ViewCart;
