import {BASE_API} from "./ApiConstant";

function Product(props) {
  const { x, showModal } = props;
  
  return (
    <div className="col-sm-3 " key={x.prodid}>
      <div
        className="card text-center text-dark mb-3 bg-transparent"
        style={{ boxShadow: "0 0 3px 3px white" }}
      >
        <div className="card-header p-1 border-bottom border-white">
          <h5>{x.pname}</h5>
        </div>
        <div className="card-body py-1">
          <img
            style={{ width: "90%", height: "250px", marginBottom: "10px" }}
            src={BASE_API+"/" + x.photo}
            className="img-thumnail"
          />
          
          
          <h6 className="text-center">Quantity: {x.qty} unit</h6>
        </div>
        <div className="card-footer p-1">
          <button
            onClick={(e) => showModal(x)}
            className="btn btn-primary btn-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
