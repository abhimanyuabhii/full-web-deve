import React from 'react';
import BreadCrum from '../components/BreadCrum';
import Meta from '../components/Meta';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/Custominput';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const signUpSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup.string().email('Email Should Be Valid').required("Email Address is Required")
,  password: yup.string().required('Password is required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title={'Sign Up'} />
      <BreadCrum title="Sign Up" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Account</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>

                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
