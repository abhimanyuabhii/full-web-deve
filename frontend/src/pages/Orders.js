import React, { useEffect } from 'react';
import { Container } from '../components/Container';
import BreadCrum from '../components/BreadCrum';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.getorderedProduct?.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <BreadCrum title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-4">
                <h5>Order Id</h5>
              </div>
              <div className="col-12 col-md-4">
                <h5>Total Amount</h5>
              </div>
              <div className="col-12 col-md-4">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((items, index) => (
                <div
                  style={{ backgroundColor: '#febd69' }}
                  className="row bg-warning pt-3 my-3"
                  key={index}
                >
                  <div className="col-12 col-md-4">
                    <p>{items?._id}</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <p>{items?.totalPrice + 40}</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <p>{items?.orderStatus}</p>
                  </div>
                  <div className="col-12">
                    <div className="row p-3" style={{ backgroundColor: '#232f3e' }}>
                      <div className="col-12 col-md-4">
                        <h6 className="text-white">Product ID: </h6>
                      </div>
                      <div className="col-12 col-md-4">
                        <h6 className="text-white">Price</h6>
                      </div>
                      {items?.orderItems?.map((i, index) => (
                        <div className="col-12" key={index}>
                          <div className="row p-2">
                            <div className="col-12 col-md-4">
                              <p className="text-white">{i.product}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <p className="text-white">{i?.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
