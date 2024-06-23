import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function AdminProduct() {
  const donorid = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_API+"/api/products")
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
        console.log(products);
      });
  }, []);

  const deleteProduct = (prodid) => {
   // let resp = window.confirm("Are you sure to delete this product ?");

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Product deleted successfully!", {
          icon: "success",  
        });
        axios
        .delete(BASE_API+"/api/products/" + prodid)
        .then((resp) => {
          
          axios
            .get(BASE_API+"/api/products")
            .then((resp) => {
              console.log(resp.data);
              setProducts(resp.data.data);
              console.log(products);
            }); 
        });

      } else {
        swal("Your Product is safe!",{
          icon:"info"
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="card shadow bg-light text-dark">
        <div className="card-body">
          <h4>My Products</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Category</th>
                {/* <th>Sub Category</th> */}
                {/* <th>Brand</th> */}
                <th>Donor</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x.prodid}>
                  <td className="text-dark">
                    <img
                      width="100"
                      src={BASE_API+"/" + x.photo}
                      className="img-thumnail"
                    />&emsp;&emsp;
                    {x.pname}
                  </td>
                  <td className="text-dark">{x.pcat}</td>
                  <td className="text-dark">{x.donorName}</td>
                  {/* <td className="text-light">{x.subcat}</td> */}
                  {/* <td className="text-light">{x.brand}</td> */}
                  
                  <td className="text-dark ">{x.qty}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(x.prodid)}
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
      </div>
    </div>
  );
}

export default AdminProduct;
