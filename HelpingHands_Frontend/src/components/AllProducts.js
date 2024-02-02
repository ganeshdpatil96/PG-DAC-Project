import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Product from './Product';
import {BASE_API} from "./ApiConstant";
import swal from 'sweetalert';

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { pcat, subcat } = useParams();
  const state = useSelector((state) => state);
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState('modal fade');
  const [display, setDisplay] = useState('none');

  const validate = (e) => {
    
    setQty(e.target.value)
    
    let val = item.qty-e.target.value;
    if(val < 0){

      setMessage('');
      swal({
        title: "Invalide Quantiy!!",
        text: "Please check the Quantity and Try Again!!",
        icon: "warning",
      })
      
      inputRef.current.value = '';
    }
    };


  const showModal = (prod) => {
    console.log('Child call parent');
    setShowDialog('modal fade show');
    setDisplay('block');
    setItem(prod);
  };

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.prodid === prodid) < 0;
  };

  const closeDialog = () => {
    setShowDialog('modal fade');
    setDisplay('none');
  };

  const loadDataFromServer = (page = 0, pagesize = 8) => {
    axios
      .get(
        BASE_API+'/api/products/paginated?page=' +
          page +
          '&pagesize=' +
          pagesize
      )
      .then((resp) => {
        console.log(resp.data.data.total);
        setProducts(resp.data.data.plist);
        setTotalPage(Math.ceil(resp.data.data.total / pagesize));
        console.log(products);
      });
  };

  useEffect(() => {
    console.log(pcat);
    if (pcat !== undefined) {
      axios
        .get(
          BASE_API+'/api/products/cats?cat=' + pcat //+
          // "&subcat=" +
          // subcat
        )
        .then((resp) => {
          console.log(resp.data);
          setProducts(resp.data.data);
          console.log(products);
        });
    } else {
      loadDataFromServer();
    }
  }, [pcat]);
  
  const addToCart = (item) => {
    if (sessionStorage.getItem('email') == null) {
      //alert('Please login first to buy product');
      swal("Please login first to buy product!", {
        icon: "warning",
      });
      history.push('/clogin');
    } else if (sessionStorage.getItem('role') !== 'receiver') {
      //alert('Only receiver can buy product');
      swal("Only receiver can buy product!", {
        icon: "warning",
      });
    } else {
      if (checkItem(item.prodid)) {
        showModal();
        setDisplay('none');
        setShowDialog('modal fade');
        item.qty = qty;
        dispatch({ type: 'AddItem', payload: item });
        //alert('Item added to cart successfully');
        swal("Item added to cart successfully!", {
          icon: "success",
        });
      } else {
        //alert('Item already in cart');
        swal("Item already in cart!", {
          icon: "warning",
        });
      }
    }
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    loadDataFromServer(selectedPage);
  };

  return (
    <>
      <div className="container-fluid" style={{ width: '92%' }}>
        <div className="card shadow bg-transparent">
          <div className="card-body">
            <div className="row">
              {products.map((x) => (
                <Product key={x.prodid} x={x} showModal={showModal} />
              ))}
            </div>
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              containerClassName={'pagination'}
              pageCount={totalPage}
              onPageChange={handlePageClick}
              previousLinkClassName={'pagination__link'}
              nextLinkClassName={'pagination__link'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            /> 
          </div>
        </div>
        {display == 'block' ? (
          <div
            className={showDialog}
            style={{ zIndex: '1000', display: display }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Add to Cart</h5>
                  <button onClick={closeDialog} className="close">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex">
                    <img
                      src={BASE_API+'/' + item.photo}
                      style={{ width: '200px' }}
                    />
                    <div className="ml-3">
                      <h4 className="p-2 text-warning">{item.pname}</h4>
                      
                      <h5 className="px-2">Category: {item.pcat}</h5>
                      <h5 className="px-2">Donor Name: {item.donorName}</h5>
                      <h5 className="px-2">Quantity Available: {item.qty}</h5>
                      <label className="px-2">Quantity</label>
                      <input
                        id="message"
                        name={message}
                        type="number"
                        ref={inputRef}
                        min="1"
                        max={item.qty}
                        value={qty} 
                        onChange={validate}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={(e) => addToCart(item)}
                    className="btn btn-warning btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
} 

export default AllProduct;