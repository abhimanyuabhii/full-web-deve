import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProducts } from '../features/product/productSlice';
import { getUserCart, logoutUser } from '../features/user/userSlice';




const Header = () => {


  const [productUpdateDetail,setproductUpdateDetail]=useState(null)
  const cartState = useSelector(state => state.auth.user.cartProduct);
  const authState=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const [updatedItemTotal, setUpdatedItemTotal] = useState(null);
  const productState = useSelector((state) => state?.product?.products);  const [productOpt,setProductOpt] = useState([])
  const [paginate, setPaginate] = useState(true);
  const navigate=useNavigate()
  const [ setAuthState] = useState({ user: null });


  const [isMenuOpen, setMenuOpen] = useState(false);



  const handleHamburgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };


const getTokenFromLocalStorage =localStorage.getItem("")
? JSON.parse(localStorage.getItem(""))
:null;;

const config2 ={
  headers :{
    Authorization:`Bearer ${
      getTokenFromLocalStorage === null ? getTokenFromLocalStorage?.token : ""
    }`,
    Accept:"application/json",

  },
};
useEffect(()=>{
  dispatch(getUserCart(config2))
},[])


  useEffect(() => {
    let sum = 0;
    if (cartState && cartState?.length > 0) {
      for (let index = 0; index < cartState.length; index++) {
        const quantity = Number(cartState[index]?.quantity);
        const price = Number(cartState[index]?.price);
  
        if (!isNaN(quantity) && !isNaN(price)) {
          sum = sum + quantity * price;
        } else {
          console.error('Invalid quantity or price:', cartState[index]);
        }
  
        console.log(`Item ${index + 1}: quantity=${quantity}, price=${price}, subtotal=${quantity * price}`);
      }
    }
  
    console.log('Total Sum:', sum);
    setUpdatedItemTotal(sum);
  }, [cartState]);

  useEffect(()=>{
let data=[]
for (let index = 0; index < productState?.length; index++) {
  const element = productState[index];
  data.push({id:index,prod:element?._id,name:element?.name})
  
}


setProductOpt(data)
  },[productState])
  

  const handleLogout = () => {
    dispatch(logoutUser());
    // Additional logout logic if needed
  };
 
  

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Free Shipping Over 10k</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Helpline: <a className="text-white" href="tel:+919773270975">+91 9773270975</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h4>
                <Link className='text-white'>Shree Dev Jewels</Link>
              </h4>
            </div>
            <div className="col-5">
              <div className="input-group">
              <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
       onChange={(selected)=>{
        navigate(`/product/${selected[0]?.prod}`)
        dispatch(getAProducts(selected[0]?.prod))
       }}
        options={productOpt}
        paginate={paginate}
        labelKey={"name"}
        minLength={2}
        placeholder="Search For Products Here"
      />
                <span className="input-group-text p-3" id="basic-addon2"><BsSearch className="fs-7" />
                </span>
              </div>
            </div>
            <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
  <div>
  
  </div>
  <div>
    {authState.user && authState.user.success ? (
      <Link to="/My-Profile" className="text-white">
        Welcome {authState.user.user.name}
      </Link>
    ) : (
      <Link to="/Login" className="d-flex align-items-center gap-10 text-white">
        <img src="/user.svg" alt="user" />
        <p className="mb-0">Log in My Account</p>
      </Link>
    )}
  </div>

  <div>
    <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
      <img src="/cart.svg" alt="cart" />
      <div className="d-flex flex-column gap-5">
        <span className="badge bg-white text-dark">{cartState?.length ? cartState?.length:0}</span>
        {/* <p className="mb-0">₹ {updatedItemTotal ? updatedItemTotal : 0}</p> */}
      </div>
    </Link>
  </div>
</div>

 



        </div>
        </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <div className={`menu-bottom ${isMenuOpen ? 'open' : ''}`}>
            <div className={`menu-bottom ${isMenuOpen ? 'open' : ''}`}>
  <div className="hamburger-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
    <span></span>
    <span></span>
    <span></span>
  </div>

  {/* Hamburger Icon for Mobile */}
  <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
    <NavLink className="text-white"  to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
    <NavLink className="text-white"  to="/product" onClick={() => setMenuOpen(false)}>Our Store</NavLink>
                <NavLink className="text-white"  to="/Orders">
                My Orders
                </NavLink>
              <NavLink className="text-white"  to="/About">
                About Us
                </NavLink>
              <NavLink className="text-white" to="/contact">
                Contact
                </NavLink>
    <button onClick={handleLogout}>Logout</button>
  </div>

</div>
</div>

              <div className="menu-bottom d-flex align-items-center gap-30">
               <div>

               <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15  d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
  >
    <img src="/menu.svg" alt="" />
    <span className="me-5 d-inline-block">
    Explore</span>
  </button>
  <ul 
  className="dropdown-menu" 
  aria-labelledby="dropdownMenuButton1"
  >
    <li>
      <Link className="dropdown-item text-white  " to="/">Home</Link>
      </li>
    <li>
      <Link className="dropdown-item text-white " to="/product">Store</Link>
      </li>
    <li>
      <Link className="dropdown-item  text-white " to="/About">About Us</Link>
      </li>
  </ul>
</div>
              
               </div>
               <div className="menu-links">
             <div className="d-flex align-items-center gap-10">
              <NavLink className="text-white" to="/">
                Home
                </NavLink>
              <NavLink className="text-white" to="/product">
                Our Store
                </NavLink>
                <NavLink className="text-white"  to="/Orders">
                My Orders
                </NavLink>
              <NavLink className="text-white"  to="/About">
                About Us
                </NavLink>
              <NavLink className="text-white" to="/contact">
                Contact
                </NavLink>
                <button onClick={handleLogout} className="border border-0 bg-transparent text-white text-uppercase" type="button">Logout</button>
                </div>
               </div>
              </div>


            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;