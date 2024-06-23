import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import productvalidation from './productvalidation';
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function AddProduct() {
  const donorid = sessionStorage.getItem('id');
  const [product, setProduct] = useState({
    pname: '',
    pcat: '',
    qty: '',
    donorId: donorid,
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      const formData = new FormData();
      formData.append('pic', selectedPhoto);
      formData.append('pname', product.pname);
      formData.append('pcat', product.pcat);
      
      formData.append('qty', product.qty);
      formData.append('donorId', donorid);
      console.log(product);
      axios
        .post(BASE_API+'/api/products', formData)
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          //alert('Product saved successfully');
          swal("Product saved successfully!", {
            icon: "success",
          });
          history.push('/myproducts');
        })
        .catch((error) => {
          console.log('Error', error);
          //alert('Error saving product');
          swal("Error saving Product!", {
            icon: "error",
          });
        });
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow text-dark" style={{background:"#E3F2FD"}}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Add Product</h4>
              
              <form onSubmit={handleSubmit}>
              <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Category
                  </label>
                  <div className="col-sm-8">
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
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Product Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="pname"
                      placeholder='Product Name'
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
                
      
                
                <div className="form-group form-row ">
                  <label className="col-sm-4 form-control-label ">Quantity</label>
                  <div className="col-sm-8 ">
                    <input
                      type="number"
                      name="qty"
                      placeholder='1'
                      value={product.qty}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.qty && (
                      <small className="text-danger float-right">
                        {errors.qty}
                      </small>
                    )}
                  </div>
                </div>
               
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Photo</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      //required
                      name="photo"
                      value={product.photo}
                      onChange={handleFileInput}
                      className="form-control-file"
                    />
                  </div>
                </div>

                <button value="sumbitted" className="btn btn-primary float-right">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;