import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import loginvalidation from '../loginvalidation';
import ReCAPTCHA from "react-google-recaptcha";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function ReceiverLogin() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    pwd: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const [cap, setCap] = useState(false);

  const handleonChange=(value)=> {
    setCap((current) => !current);
  }

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios

        .post(BASE_API+'/api/receivers/validate', user)
        .then((resp) => {
          let result = resp.data.data;
          console.log(resp.data.data);
          if(resp.status === 200){ 
          sessionStorage.setItem('email', result.email);
          sessionStorage.setItem('uname', result.name);
          sessionStorage.setItem('role', 'receiver');
          sessionStorage.setItem('id', result.id);
          dispatch({ type: 'IsLoggedIn' });
          history.push('/');
          swal({
            title: "Login Succesful!",
            text: "Welcome To Helping Hands",
            icon: "success",
            button: "OK",
          });}

          if(resp.status === 202){
            swal({
              title: "Login Error",
              text: "Invalid password..!!",
              icon: "error",
              button: "OK",
            });
          }
        })
        .catch((error) => {
          console.log('Error', error);
          swal({
            title: "Receiver not Registered",
            text: "Please Register First!!",
            icon: "error",
            button: "OK",
          });
          history.push("/register");
        });
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="card shadow mt-5 ml-5  text-dark col-sm-9" style={{background:"#E3F2FD"}}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                      placeholder='name@gmail.com'
                    />
                    {errors.email && (
                      <small className="text-danger float-right">
                        {errors.email}
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
                      value={user.pwd}
                      onChange={handleInput}
                      className="form-control"
                      placeholder='****'
                    />
                    {errors.pwd && (
                      <small className="text-danger float-right">
                        {errors.pwd}
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiverLogin;