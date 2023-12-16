import React, { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { config } from '../utilis/axiosconfig';
import { createAnOrder } from '../features/user/userSlice';


const ShippingSchema = yup.object({
 firstname:yup.string().required("First Name is Required"),
 lastname:yup.string().required(" last name is Required"),
 address:yup.string().required("Address is Required"),
 state:yup.string().required(" State is Required"),
 country:yup.string().required(" Country is Required"),
 city:yup.string().required(" City is Required"),
 PinCode:yup.number().required("Pincode is Required"),
 other:yup.string().required("Other is Required"),
 
});




const Checkout = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const total = parseFloat(searchParams.get('total')) || 0;

  // ...
  
  <div className="d-flex justify-content-between align-items-center border-bottom py-4">
    <h4 className="total">Total:</h4>
    <h5 className="total-price">₹{total + 40}</h5>
  </div>
  
  const cartState = useSelector((state) => state.auth.user.cartProduct);

const [shippingInfo,setShippingInfo]=useState(null)
const [paymentInfo,setPaymentInfo]=useState({ razorpayPaymentId:"",razorpayOrderId:""})
const [cartProductState,setCartProductState]=useState({})
  



 

  

  // Calculate total


  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      state: '',
      country: '',
      city: '',
      other: '',
    },
    validationSchema: ShippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values)

      setTimeout(()=>{
checkOutHandler()
      },300)
   
     
    },
  });

  const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script");
      script.src=src;
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      } 
      document.body.appendChild(script)
    
    })
  }

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      const cartItem = cartState[index];
      const product = cartItem.productId; // Assuming productId is an object with properties like _id, name, etc.
  
      items.push({
        product: product._id, // Assuming _id is the unique identifier of the product
        quantity: product.quantity,
        price: cartItem.price,
      });
    }
  
    setCartProductState(items);
  }, [cartState]);
  
  

  const checkOutHandler = async () => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }
  
      const result = await axios.post("http://localhost:4000/api/v1/order/checkout", { total: total +40 }, config);    
          if (!result) {
        alert("Something went wrong");
        return;
      }
      

      
  
      const { amount, id: order_id, currency } = result.data.order;
 
      
  
      const options = {
        key: "rzp_test_NEvbon0DZOZsev",
        amount: amount,
        currency: currency,
        name: "Abhimanyu Developer.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
           
          };

          console.log('Payment Verification Request Payload:', data);
  
          const result = await axios.post("http://localhost:4000/api/v1/order/paymentVerification", data,config);
  
          setPaymentInfo({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          })
          dispatch(createAnOrder({totalPrice:total,orderItems:cartProductState,paymentInfo,shippingInfo}))


        },
        prefill: {
          name: "Abhimanyu Developer",
          email: "websitedeveloperabhimanyu@example.com",
          contact: "6291888873",
        },
        notes: {
          address: "Abhimanyu Office",
        },
        theme: {
          color: "#61dafb",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  
  


  return (
  
    <>

      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">ShreeDev</h3>
                <nav style={{ "--bs-breadcrumb-divider": '>' }}>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart" href="#">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Information
                    </li>
                    &nbsp; / <li className="breadcrumb-item total-price active">Shipping</li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total"> (Abhimanyu Yadav) websitedeveloperabhimanyu@gmail.com</p>
                <h4 className="mb-3">Shipping Address</h4>


                <form onSubmit={formik.handleSubmit}
                 action="" className="d-flex gap-15 flex-wrap justify-content-between">
                  <div className="w-100">
                  <select
  name="country"
  value={formik.values.country}
  onBlur={formik.handleBlur("country")}
  onChange={formik.handleChange("country")}
  className="form-control form-select"
  id=""
>
  <option value={null}>Select country</option>
  <option value="Bihar">United State</option>
  <option value="United States">Kenya</option>
  <option value="India">India</option>
</select>

                    <div className="errors ms-2 my-1">
                      {
                        formik.touched.country && formik.errors.country
                      }
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text"
                     placeholder="First Name"
                      className="form-control"
                      name="firstname"
                      value={formik.values.firstname}
                       onBlur={formik.handleBlur("firstname")} 
                       onChange={formik.handleChange("firstname")}
                       />
                     <div className="errors ms-2 my-1">
                      {
                        formik.touched.firstname && formik.errors.firstname
                      }
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text"
                     placeholder="Last Name"
                      className="form-control"
                      name="lastname"
                      value={formik.values.lastname}
                       onBlur={formik.handleBlur("lastname")} 
                       onChange={formik.handleChange("lastname")}
                      />
                       <div className="errors ms-2 my-1">
                      {
                        formik.touched.lastname && formik.errors.lastname
                      }
                  </div>
                  <div className="w-100">
                    <input type="text"
                     placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                       onBlur={formik.handleBlur("address")} 
                       onChange={formik.handleChange("address")}
                      
                      />
                        <div className="errors ms-2 my-1">
                      {
                        formik.touched.address && formik.errors.address
                      }

                  </div>
                  <div className="w-100">
                    <input type="text"
                     placeholder="Apartment, Suite, etc"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                       onBlur={formik.handleBlur("other")} 
                       onChange={formik.handleChange("other")}
                      />
                          <div className="errors ms-2 my-1">
                      {
                        formik.touched.other && formik.errors.other
                      }
                  </div>
                  <div className="flex-grow-1">
                    <input type="text"
                     placeholder="city" 
                     className="form-control"
                     name="city"
                     value={formik.values.city}
                      onBlur={formik.handleBlur("city")} 
                      onChange={formik.handleChange("city")}
                     
                     />
                           <div className="errors ms-2 my-1">
                      {
                        formik.touched.city && formik.errors.city
                      }
                  </div>
                  <div className="flex-grow-1">
                  <select
  name="state"
  value={formik.values.state}
  onBlur={formik.handleBlur("state")}
  onChange={formik.handleChange("state")}
  className="form-control form-select"
  id=""
>
  <option value={null}>Select State</option>
  <option value="Bihar">Bihar</option>
</select>

                    <div className="errors ms-2 my-1">
                      {
                        formik.touched.state && formik.errors.state
                      }
                  </div>

                  </div>
                  <div className="flex-grow">
                    <input type="number"
                     placeholder="PinCode"
                      className="form-control"
                      name="Pincode"
                      value={formik.values.PinCode}
                       onBlur={formik.handleBlur("PinCode")} 
                       onChange={formik.handleChange("PinCode")}

                       />
                         <div className="errors ms-2 my-1">
                      {
                        formik.touched.PinCode && formik.errors.PinCode
                      }
                  </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-1" />
                        Return To Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue To Shipping
                      </Link>
                      <button className="button" type='submit' >Place Order</button>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
              {cartState &&
  cartState?.map((item, index) => (
    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
      <div className="w-75 d-flex gap-10">
        <div className="w-25 position-relative">
          <span
            style={{ top: "-10px", right: "2px" }}
            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
          >
            {item?.quantity}
          </span>
          <img className="img-fluid" src="/product necklace.jpg" alt="" />
        </div>
        <div>
          <h5 className="total-price">{item?.productId?.name}</h5>
          <p className="total-price">hello</p>
        </div>
      </div>
      <div className="flex-grow-1">
      </div>
    </div>
  ))}


              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">₹{total}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">₹40</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total:</h4>
                <h5 className="total-price">₹{Number(total) + 40}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Checkout;
