import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import {BASE_API} from "./ApiConstant";

//var product;
function DonorOrderDetails(){
  
  const [prod, setProd] = useState([]);

  const donorid=sessionStorage.getItem("id");
  //const [value, setVaule]=useState([]);
  

  useEffect(() => {
    
    axios
      .get(BASE_API+"/api/orders/donor?sid=" + donorid)
      .then((resp) => {
        
        setProd(resp.data.data);
        console.log("Shubham",resp.data.data); 
      });

  }, []);
   
  const table=prod.map((element, index)=>{
    // console.log("Tejas = " ,values);
    // let element = values[0];
    console.log("Ajinkya = " ,element);
    return(
      <tr key={index}>
         <td className="text-dark">{element.product.prodid}</td>
         
        <td className="text-light">
        <img
          width="100"
          src={BASE_API+"/" + element.product.photo}
          className="img-thumnail" />
          
        </td>
        <td className="text-dark">{element.product.pname}</td>
        <td className="text-dark">{element.product.pcat}</td>
        
        <td className="text-dark">{element.qty}</td>
        <td className="text-dark"><Moment format="ddd, DD-MMM-YYYY">{element.orderDate}</Moment></td>
        <td className="text-dark">{element.order.receiver.name}</td>
        <td className="text-dark">{element.order.receiver.email}</td>
        <td className="text-dark">{element.order.receiver.phone}</td>
        <td className="text-dark">{element.order.address.city} &nbsp;
         {element.order.address.state} &nbsp;{element.order.address.country} &nbsp;
         {element.order.address.zip}</td>
      </tr>
    )
    })
  
 

  return(
    <div className=" d-flex justify-content-center mt-5 mb-5 ml-3 mr-3">
      
        <div className="card shadow bg-light text-dark">
        <div className="card-body">
          <h4>Orders</h4>
          <table className="table table-bordered ">
            <thead className="table-dark">
              <tr>
                <th>Serial No</th>
                <th>Image</th>
                <th>Name</th>

                <th>Category</th>
                
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                
              </tr>
            </thead>
            <tbody>
               {table}
             
            </tbody>
          </table>
        </div>
      </div>
       
  
    </div>
  );

}

export default DonorOrderDetails;

