import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_API} from "./ApiConstant";

function AllReceiver() {
  const [receivers, setReceivers] = useState([]);
  useEffect(() => {
    axios.get(BASE_API+"/api/receivers").then((resp) => {
      setReceivers(resp.data.data);
      console.log(receivers);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="text-white p-2 text-center">All Receivers</h4>
      <table className="table table-bordered table-striped table-light table-hover" >
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email Id</th>
            {/* <th>Password</th> */}
          </tr>
        </thead>
        <tbody>
          {receivers.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.gender}</td>
              <td>{x.phone}</td>
              <td>{x.email}</td>
              {/* <td>{x.pwd}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllReceiver;
