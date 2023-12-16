import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import About from "./pages/About";
import Login from "./pages/Login"
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./Routing/PrivateRoute";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";




function App() {
  return (

    <>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route  path="contact" element={<Contact/>}/>
      <Route  path="product" element={<OurStore/>}/>
      <Route  path="product/:id" element={<SingleProduct/>}/>
      <Route  path="About" element={<About/>}/>
      <Route  path="cart" element={<Cart/>}/>
      <Route  path="Orders" element={<Orders/>}/>
      <Route  path="My-Profile" element={<Profile/>}/>
      <Route  path="checkout" element={<Checkout/>}/>
      <Route  path="login" element={<Login/>}/>
      <Route  path="forgot-password" element={<Forgotpassword/>}/>
      <Route  path="Signup" element={<Signup/>}/>
      <Route  path="password/reset/:token" element={<Resetpassword/>}/>
      <Route  path="Privacy-policy" element={<PrivacyPolicy/>}/>
      <Route  path="Shipping-policy" element={<ShippingPolicy/>}/>
      <Route  path="Refund-policy" element={<RefundPolicy/>}/>
      <Route  path="Terms And Condition" element={<TermsAndCondition/>}/>
    </Route>
  
    </Routes>
    </BrowserRouter>
    
    </>


  );
}


export default App;
