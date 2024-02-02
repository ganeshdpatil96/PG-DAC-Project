import axios from "axios";
import { useState } from "react";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function AdminProfile() {
  const email = sessionStorage.getItem("email");
  const uname = sessionStorage.getItem("uname");
  const [user, setUser] = useState({
    uname: uname,
    email: email,
    pwd: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_API+"/api/admin", user)
      .then((resp) => {
        console.log(resp);
        //alert("Profile updated successfully");
        swal("Profile updated successfully!", {
          icon: "success",
        });
        sessionStorage.setItem("uname", user.uname);
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
  };

  return (
    <div className="container-fluid">
      <h4 className="p-2 text-white text-center">Welcome {user.uname}</h4>
      <div className="row">
        <div className="col-sm-5 mx-auto">
          <div className="card shadow  text-dark" style={{background:"#E3F2FD"}}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email ID
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="email"
                      readOnly
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    User Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="uname"
                      value={user.uname}
                      onChange={handleInput}
                      className="form-control"
                    />
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
                    />
                  </div>
                </div>
                <button className="btn btn-primary float-right">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
