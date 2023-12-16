import React, { useEffect, useState } from 'react';
import BreadCrum from '../components/BreadCrum';
import Meta from '../components/Meta';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, } from '../features/user/userSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState({});

  const userCart = useSelector(state => state.auth.user.cartProduct);
  const [updatedItemTotal, setUpdatedItemTotal] = useState(0);
  console.log('Updated Item Total:', updatedItemTotal);

  const updateProductQuantity = (productId, quantity) => {
    setProductUpdateDetail((prevDetail) => ({
      ...prevDetail,
      [productId]: quantity,
    }));
  };
  
  


  console.log('Product Update Detail:', productUpdateDetail);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    // Calculate total directly in the Cart component
    const total = userCart?.reduce((acc, item) => {
      const itemTotal = item.price * (productUpdateDetail[item._id] || item.quantity);
      return acc + itemTotal;
    }, 0);
  
    setUpdatedItemTotal(total || 0); // Set to 0 if total is falsy
    console.log('Product Update Detail:', productUpdateDetail);
    if (Object.keys(productUpdateDetail).length > 0) {
      localStorage.setItem('productUpdateDetail', JSON.stringify(productUpdateDetail));
          console.log('Local Storage Product Update Detail:', localStorage.getItem('productUpdateDetail'));

    }
  }, [userCart, productUpdateDetail]);
  
  const deleteACartProduct = id => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  return (
    <>
      <Meta title={'Cart'} />
      <BreadCrum title="Cart" />

      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>

              {userCart &&
                userCart.map((item) => (
                  <div key={item._id} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img src="/product necklace.jpg" className="img-fluid" alt="" />
                      </div>
                      <div className="w-75">
                        <p>{item.productId.name}</p>
                        <p>Carat:10/gm</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">₹{item.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                   <input
  className="form-control"
  type="number"
  name=""
  min={1}
  max={10}
  id=""
  value={productUpdateDetail[item._id] !== undefined ? productUpdateDetail[item._id] : item.quantity}
            onChange={(e) => {
              const newQuantity = Number(e.target.value);
              if (!isNaN(newQuantity)) {
                updateProductQuantity(item._id, newQuantity);
              }
            }}
          />
                      </div>
                      <div>
                        <MdDelete onClick={() => deleteACartProduct(item._id)} className="text-danger" />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">₹{item.price * (productUpdateDetail[item._id] || item.quantity)}</h5>
                      
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue Shopping
                </Link>
   

                {updatedItemTotal > 0 && (
               

                  <div className="d-flex flex-column align-items-end">
                    <h4>SubTotal: ₹ {updatedItemTotal}</h4>
                    <p>Taxes and Shipping Calculated at checkout</p>
                    {console.log('updatedItemTotal:', updatedItemTotal)}
                    <Link
  to={{
    pathname: "/checkout",
    search: `?total=${updatedItemTotal}`,
    state:{productUpdateDetail},
  }}
>
  Proceed to Checkout
</Link>






                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
