import React from 'react';
import BreadCrum from '../components/BreadCrum';
import Meta from '../components/Meta';
import {
  AiOutlineHome,
  AiOutlineMail
} from 'react-icons/ai';
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/ContactSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      comment: '',
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is Required"),
      email: yup.string().nullable().email("Email Should Be valid").required("Email is Required"),
      mobile: yup.string().default('').nullable().required("Mobile Number is Required"),
      comment: yup.string().default('').nullable().required("Comment is Required"),
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      const { name, email, mobile, comment } = values;
      dispatch(createQuery({ name, email, mobile, comment }));
    },
  });

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrum title="Contact Us" />

      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-6">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15066.990234776371!2d72.83864858715818!3d19.249830600000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b11525142257%3A0xa54d4ef19f378b10!2sShreedev%20Jewels!5e0!3m2!1sen!2sin!4v1698498260589!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <h3 className="contact-title mb-4">Contact Us</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <div className="text-danger">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                <div>
                  <input
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <div className="text-danger">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="mobile"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                  <div className="text-danger">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div>
                  <textarea
                    className="form-control"
                    placeholder="Comment"
                    name="comment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                  ></textarea>
                  <div className="text-danger">
                    {formik.touched.comment && formik.errors.comment}
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6">
              <h3 className="contact-title mb-4">Get In Touch With Us</h3>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <AiOutlineHome className="fs-5 me-2" />
                  <span>Hno:B/112, Vaishali Industrial Estate</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <BiPhoneCall className="fs-5 me-2" />
                  <a href="tel:+919773270975">+91 9773270975</a>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <AiOutlineMail className="fs-5 me-2" />
                  <a href="mailto:shreedevformail@gmail.com">shreedevformail@gmail.com</a>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <BiInfoCircle className="fs-5 me-2" />
                  <p className="mb-0">Monday - Friday 10AM - 8PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
