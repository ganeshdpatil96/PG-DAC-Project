import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uservalidation from "../uservalidation";
import ReCAPTCHA from "react-google-recaptcha";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function RegReceiver() {
  const [user, setUser] = useState({
    name: "",
    city: "",
    email: "",
    pwd: "",
    cpwd: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [cap, setCap] = useState(false);

  const handleonChange=(value)=> {
    setCap((current) => !current);
  }

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(uservalidation(user));
    if (!user.gender) {
      errors.gender = "Gender is required";
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (!user.gender) {
      errors.gender = "Gender is required";
    }
    console.log(errors);
    console.log(Object.keys(errors).length)

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post(BASE_API+"/api/receivers", user)
        .then((resp) => {
          console.log(resp);
          //alert("Receiver registered successfully");
          swal({
            title: "Registered successfully!",
            text: "Welcome To Helping Hands",
            icon: "success",
            button: "OK",
          });
          history.push("/clogin");
        })
        .catch((error) =>{
          console.log("Error", error);
          swal({
            title: "Network Error!",
            text: "Please try after some time",
            icon: "error",
            button: "OK",
          });
        });
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow mt-5 ml-5  text-dark col-sm-9" style={{background:"#E3F2FD"}}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Sign Up</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                  Receiver Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={user.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.name && (
                      <small className="text-danger float-right">
                        {errors.name}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">City</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      placeholder="city"
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.city && (
                      <small className="text-danger float-right">
                        {errors.city}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Gender</label>
                  <div className="col-sm-8">
                    <select
                      name="gender"
                      value={user.gender}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {errors.gender && (
                      <small className="text-danger float-right">
                        {errors.gender}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="email"
                      placeholder="name@gmail.com"
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.email && (
                      <small className="text-danger float-right">
                        {errors.email}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Phone</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      maxLength="10"
                      name="phone"
                      placeholder="1234567890"
                      value={user.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.phone && (
                      <small className="text-danger float-right">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="pwd"
                      placeholder="********"
                      value={user.pwd}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.pwd && (
                      <small className="text-danger float-right">
                        {errors.pwd}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Confirm Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="cpwd"
                      placeholder="********"
                      value={user.cpwd}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.cpwd && (
                      <small className="text-danger float-right">
                        {errors.cpwd}
                      </small>
                    )}
                  </div>
                </div>
                <div><ReCAPTCHA
                    sitekey="6Ldyt_0hAAAAAMr44cQ5YMMpzsLlKFDEoGIpplGV"
                    onChange={handleonChange}
                  /></div>
                  <br /> 
                <button className="btn btn-primary float-right" disabled={!cap}>
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegReceiver;
