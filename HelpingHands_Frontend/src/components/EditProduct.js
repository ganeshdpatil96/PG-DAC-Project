import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function EditProduct() {
  console.log("Edit product page");
  const donorid = sessionStorage.getItem("id");
  const { prodid } = useParams();
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: "",
    pcat: "",
    qty: "",
    donorId: donorid,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);

    axios.get(BASE_API+"/api/products/" + prodid).then((resp) => {
      console.log(resp.data.data);
      setProduct(resp.data.data);
    });

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product);
      axios
        .put(BASE_API+"/api/products/" + prodid, product)
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          //alert("Product saved successfully");
          swal("Product saved successfully!", {
            icon: "success",
          });
          history.push("/myproducts");
        })
        .catch((error) => {
          console.log("Error", error);
          //alert("Error saving product");
          swal({
            text: "Error saving product",
            icon: "error",
          });
        });
    }
  }, [errors]);
  return (
    <div className="container-fluid">
      <div className="row bg-light text-dark">
        <div class="col-sm-3">
          <img width="300" src={BASE_API+"/" + product.photo} />
        </div>
        <div className="col-sm-9">
          <h4 className="text-center p-2">Edit Product (Product ID : {product.prodid})</h4>
          <div className="col-sm-8" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group form-row ">
              <label className="col-sm-6 form-control-label">
                Product Name
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="pname"
                  value={product.pname}
                  onChange={handleInput}
                  className="form-control"
                />
                {errors.pname && (
                  <small className="text-danger float-right">
                    {errors.pname}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-6 form-control-label">Category</label>
              <div className="col-sm-6">
                <select
                  name="pcat"
                  value={product.pcat}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  <option>Clothes</option>
                      <option>Furniture</option>
                      <option>Footwear</option>
                      <option>Electronics</option>
                      <option>Utensils</option>
                      <option>Others</option>
                </select>
                {errors.pcat && (
                  <small className="text-danger float-right">
                    {errors.pcat}
                  </small>
                )}
              </div>
            </div >
            <div className="form-group form-row ">
              <label className="col-sm-6 form-control-label">
                Quantity
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  name="qty"
                  value={product.qty}
                  onChange={handleInput}
                  className="form-control"
                />
                {errors.qty && (
                  <small className="text-danger float-right">
                    {errors.qty}
                  </small>
                )}
              </div></div>
            <button className="btn btn-primary float-right">
              Update
            </button>
           
            
            
            
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
