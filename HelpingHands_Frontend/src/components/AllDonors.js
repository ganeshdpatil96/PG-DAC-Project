import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function AllDonors() {
  const [donors, setDonors] = useState([]);
  useEffect(() => {
    axios.get(BASE_API+"/api/donors").then((resp) => {
      //console.log(resp.data.data)
      setDonors(resp.data.data);
      console.log(donors);
    });
  }, []);

  const deleteDonor = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Receiver!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Receiver has been deleted!", {
            icon: "success",
          });
          axios.delete(BASE_API+"/api/donors/" + id).then((resp) => {
            axios.get(BASE_API+"/api/donors").then((resp) => {
              setDonors(resp.data.data);
            });
          });

        } else {
          swal("Receiver is safe!",{
            icon:"info"
          });
        }
      });
  };

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">All Donors</h4>
      <table className="table table-bordered table-striped table-light table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>City</th> 
            <th>Phone</th>
            <th>Email Id</th>
            {/* <th>Password</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.phone}</td>
              <td>{x.email}</td>
              {/* <td>{x.pwd}</td> */}
              <td>
                <button
                  onClick={(e) => deleteDonor(x.id)}
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
  );
}

export default AllDonors;
