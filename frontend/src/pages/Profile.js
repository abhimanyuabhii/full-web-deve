import React from 'react'
import Breadcrum from '../components/BreadCrum'
import { Container } from '../components/Container';
import {useFormik} from 'formik';
import * as yup from   "yup";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { useState } from 'react';
import { FaUserEdit } from "react-icons/fa";


const ProfileSchema = yup.object({
  name:yup
  .string()
  .required("Name is required"),
  email: yup
  .string()
  .email('Email Should Be Valid')
  .required("Email Address is Required"),
  Address:yup
  .string()
  .required("Address is required"),
});


const Profile = () => {
const dispatch=useDispatch()
const user=useSelector(state=>state.auth.user.user)
const [edit,setEdit]=useState(true)


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      email: user?.email,
      name: user?.name,
      Address: user?.Address,

    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
   dispatch(updateProfile(values))
   setEdit(true)
     
   
    
    },
  });



  return (
   <>
<Breadcrum title="My Profile "/>

 <Container class1="cart-wrapper home-wrapper-2 py-5">
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
        <h3 className='my-3'>Update Profile</h3>
        <FaUserEdit className="fs-3" 
        onClick={()=>setEdit(false)} />
        </div>

      </div>
        <div className="col-12">
        <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="example1" className="form-label">Name</label>
    <input type="text" name="Full Name"  disabled={edit} className="form-control" id="example1" 
    value={formik.values.name}
     onChange={formik.handleChange('name')}
     onBlur={formik.handleBlur('name')}

     
     />
  <div className="errors">
    {formik.touched.name && formik.errors.name}
  </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
    <input type="email" name="Email" disabled={edit} className="form-control" id="exampleInputEmail2"
    
    value={formik.values.email}
    onChange={formik.handleChange('email')}
    onBlur={formik.handleBlur('email')}
    
    
    aria-describedby="emailHelp"/>
     <div className="errors">
    {formik.touched.email && formik.errors.email}
  </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail3" className="form-label">Address</label>
    <input type="text" name="Address" disabled={edit} className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
        
        value={formik.values.Address}
        onChange={formik.handleChange('Address')}
        onBlur={formik.handleBlur('Address')}
        
    />
        <div className="errors">
    {formik.touched.Address && formik.errors.Address}
  </div>
  </div>
{
  edit===false &&   <button type="submit" disabled={edit} className="btn btn-primary">Save</button>

}

</form>
        </div>
    </div>
 </Container>
   
   </>
  )
}

export default Profile
