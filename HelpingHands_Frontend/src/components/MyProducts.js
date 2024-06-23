import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function MyProducts() {
  const donorid = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [name,setName]=useState("");

  const showDetails = (prodid) => {
    setName(prodid);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get(BASE_API+"/api/products?donorid=" + donorid)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
        console.log(products);
      });
  }, []);

  const deleteProduct = (prodid) => {
    //let resp = window.confirm("Are you sure to delete this product ?");

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
        .delete(BASE_API+"/api/products/" + prodid)
        .then((resp) => {
          swal("Product deleted successfully!", {
            icon: "success",
          });
          axios
            .get(BASE_API+"/api/products?donorid=" + donorid)
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
    <div className="container-fluid text-white">
      <div className="row">
      <div className="col-sm-8">
        
          <h4>My Products</h4>
          <table className="table table-bordered table-sm table-striped mr-5" style={{background:"#CFD8DC"}}>
            <thead className="bg-dark text-light">
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x.prodid}>
                  <td className="text-dark">{x.prodid}</td>
                  <td className="text-dark">
                    {x.pname}
                  </td>
                  <td className="text-dark">{x.pcat}</td>
                  <td className="text-dark ">{x.qty}</td>
                  <td>
                    <Link
                      to={"/edit/" + x.prodid}
                      className="btn btn-primary btn-md mr-4"
                    >
                      <span className="bi bi-pencil-square"></span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(x.prodid)}
                      className="btn btn-danger btn-md">
                        
                       <span className="bi bi-trash"></span>
                    </button>
                    &emsp;
                    <button
                      onClick={(e) => showDetails(x.photo)}
                      className="btn btn-primary btn-md"
                    >
                      <span className="bi bi-eye-fill"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
        <div className="col-sm-2">
          {show ? (
            <>
                <div>
                <img
                      width="200"
                      src={BASE_API+"/" + name}
                      className="img-thumnail ml-5"
                    />
                </div>
            </>
          ) : (
            ""
          )}
        </div>
      
      </div>
    </div>
  );
}

export default MyProducts;
