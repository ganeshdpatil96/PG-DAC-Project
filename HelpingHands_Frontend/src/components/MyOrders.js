import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Moment from "react-moment";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';


function MyOrders() {
  
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        BASE_API+"/api/orders?receiverid=" +
          sessionStorage.getItem("id")
      )
      .then((resp) => {
        console.log(resp.data);
        setOrders(resp.data.data);
      });
  }, []);

  const showDetails = (orderid) => {
    axios.get(BASE_API+"/api/orders/" + orderid).then((resp) => {
      console.log(resp.data);
      setDetails(resp.data.data.details);
    });
    setShow(true);
  };

  const deleteDetails = (orderid) => {
   // let resp = window.confirm("Are you sure to delete this product ?");

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Order deleted successfully!", {
          icon: "success",
        });
        axios.delete(BASE_API+"/api/orders/" + orderid).then((resp) => {
         // alert("Product deleted successfully");
          axios
          .get(
            BASE_API+"/api/orders?receiverid=" +
              sessionStorage.getItem("id")
          )
          .then((resp) => {
            console.log(resp.data);
            setOrders(resp.data.data);
          });
         
      });
        
      } else {
        swal("Your Order is safe!",{
          icon:"info"
        });
      }
    });



  };

  return (
    <div className="container-fluid text-white">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="p-2 ">My Purchased Orders</h4>
          <table className="table table-bordered table-sm table-striped" style={{background:"#CFD8DC"}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Order Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((x) => (
                <tr key={x.orderid}>
                  <td>{x.orderid}</td>
                  <td>
                    <Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment>
                  </td>
                  
                  <td>
                    <button
                      onClick={(e) => showDetails(x.orderid)}
                      className="btn btn-primary btn-md"
                    >
                      <span className="bi bi-eye-fill"></span>
                    </button>
                    &emsp;
                    <button
                      onClick={(e) => deleteDetails(x.orderid)}
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
        <div className="col-sm-5">
          {show ? (
            <>
              <h4 className="p-2">Order Details</h4>
              <table className="table table-bordered table-sm table-striped" style={{background:"#CFD8DC"}}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((x) => (
                    <tr>
                      <td>{x.product.prodid}</td>
                      <td>
                        <img
                          className="mr-2 float-left"
                          src={BASE_API+"/" + x.product.photo}
                          width="100"
                        />
                        {x.product.pname}
                        <br />
                        Category: {x.product.pcat}
                        <br />
                        
                      </td>
                     
                      <td>{x.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
export default MyOrders;
