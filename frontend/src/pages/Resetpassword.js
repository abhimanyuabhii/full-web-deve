import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';


const passwordSchema = yup.object({
  Password: yup.
  string().
  required('Password is required'),
});






const Resetpassword = () => {
  const location=useLocation()
  const getToken = location.pathname.split("/")[2];
  console.log(getToken)


  const navigate=useNavigate()
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      Password: '',
      ConfirmPassword: '',

    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
     dispatch(resetPassword({token:getToken,Password:values.Password,ConfirmPassword:values.ConfirmPassword}));
     
        navigate('/login')
    
    },
  });




  return (
    <>
      <Meta title={"Reset Password"}/>
  <BreadCrum title="Reset Password"/>
    

  <div className="login-wrapper py-5 home-wrapper-2">
   
<div className="container-xxl">
<div className="row">
        <div className="col-12">
            <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">

                    <div>
                        <input type="Password" name="Password" placeholder="Password"

onChange={formik.handleChange("Password")}
onBlur={formik.handleBlur("Password")}
value={formik.values.Password}


                         className="form-control" />
                         
                         <div className="errors">
                               {formik.touched.Password && formik.errors.Password}
                             </div>
                        </div>
                        <div className="mt-1">
<input type="Password" name="ConfirmPassword" placeholder="Confirm Password" 
onChange={formik.handleChange("ConfirmPassword")}
onBlur={formik.handleBlur("ConfirmPassword")}
value={formik.values.ConfirmPassword}


                         className="form-control" />
                         <div className="errors">
                               {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword}
                             </div>
                        </div>
                        <div>
                     
                      
                       <div className=" mt-3 d-flex justify-content-center  gap-15 align-items-center">
                             <button className="button border-0">Submit</button>
                            
                        
                       </div>
                       </div>
                </form>
            </div>
        </div>
     </div>
</div>

  </div>
    
    
    </>
  )
}

export default Resetpassword
