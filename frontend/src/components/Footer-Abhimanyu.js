import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 mb-4 mb-md-0">
              <div className="footer-top-data d-flex flex-column align-items-center align-md-start">
                <img src="/newsletter.png" alt="NewsLetter" />
                <h2 className="mb-0 text-white"> Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h4 className="text-white mb-4">Contact Us </h4>
              <div>
                <address className="text-white fs-6">
                  Hno:B/112, Vaishali Industrial Estate, <br /> Balkrishna Tavde
                  Road, West, Mumbai, <br />
                  PinCode:400068
                </address>
                <a href="tel:+91 9773270975" className="mt-3 d-block mb-1 text-white">
                  +91 9773270975
                </a>
                <a href="mailto:shreedevformail@gmail.com" className="mt-2 d-block mb-0 text-white">
                  shreedevformail@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-2">
                  <a className="text-white" href="">
                    <BsFacebook />
                  </a>
                  <a className="text-white" href="">
                    <BsInstagram />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/Refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/Shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/Privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/Terms And Condition" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h4 className="text-white mb-4">Accounts</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/about" className="text-white py-2 mb-1">About Us</Link>
                <Link to="/contact" className="text-white py-2 mb-1">Contact </Link>
                <Link to="/product" className="text-white py-2 mb-1">Visit Our Store</Link>
              </div>
            </div>

            <div className="col-12 col-md-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/product"  className="text-white py-2 mb-1">Diamond</Link>
                <Link to="/product" className="text-white py-2 mb-1">Necklace</Link>
                <Link to="/product" className="text-white py-2 mb-1">Pendants</Link>
                <Link to="/product" className="text-white py-2 mb-1">Rings</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy;{new Date().getFullYear()} Powered By Abhimanyu Developer
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Add the following styles for mobile responsiveness */}
      <style>
        {`
          /* Mobile styles */
          @media (max-width: 767px) {
            .footer-top-data {
              flex-direction: column;
              align-items: flex-start;
            }

            .col-5 {
              margin-bottom: 20px;
            }

            .col-7 {
              width: 100%;
            }

            .input-group {
              width: 100%;
            }

            .footer-links {
              margin-top: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
