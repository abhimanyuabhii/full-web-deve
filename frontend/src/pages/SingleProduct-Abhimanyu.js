import React, { useEffect, useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import ProductCard from "../components/ProductCard"
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import { Link, useLocation} from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProducts, getAllProducts } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddProdTOCart, getUserCart } from '../features/user/userSlice';
const SingleProduct = () => {
  const [quantity,setquantity]=useState(0)
  const [alreadyAdded,setAlreadyAdded]=useState(false)
  const location = useLocation();
  
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.products);
  const productsState = useSelector(state => state?.product?.products?.product);
  const cartState=useSelector(state => state?.auth?.user?.cartProduct)
  console.log(productState);

  useEffect(() => {
    dispatch(getAProducts(getProductId));
    dispatch(getUserCart());

  }, [dispatch, getProductId]);
  
  useEffect(() => {
    if (cartState && Array.isArray(cartState)) {
      const productAlreadyAdded = cartState.some(item => getProductId === item?.productId?._id);
      setAlreadyAdded(productAlreadyAdded);
    } else {
      // Handle the case when cartState is not an array (e.g., setAlreadyAdded to false)
      setAlreadyAdded(false);
    }
  }, [cartState]);
  

const navigate=useNavigate();
const uploadCart = async () => {
  if (!quantity) {
    toast.error("Please Choose Quantity");
    return;
  } else if (!productState || !productState?.product || !productState.product._id || !productState.product.price) {
    toast.error("Product ID or Price is undefined");
    return;
  }

  const cartData = {
    productId: productState?.product._id,
    Quantity: quantity,
    price: productState.product.price,
  };

 

  await dispatch(AddProdTOCart(cartData))
   navigate('/Cart')



 

  // After adding to the cart, dispatch the getUserCart action to get the updated cart information
  dispatch(getUserCart());
};


  
  
console.log('productState:', productState);

  const props = {

    width: 400,
    height: 530,
    zoomWidth: 600,
    img: productState?.product?.image?.[0]?.url || "https://m.media-amazon.com/images/I/61INmJuMNaL._AC_UY1100_.jpg"
  };
  console.log('productState.image:', productState?.image);






const [orderedProduct, SetorderedProduct]= useState(true);
const copyToClipboard = (text) => {
  console.log('text', text)
  var textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

const [popularProduct,setPopularProduct]=useState([])

useEffect(()=>{
  let data=[]
for (let index = 0; index < productsState?.length; index++) {
  const element =productsState[index];
  if(element.tags==='Popular'){
    data.push(element)
  }
  setPopularProduct(data)

}
},[productsState])
console.log(productsState) 

const [rating,setrating]=useState(null)
const [comment,setComment]=useState(null)
const addRatingToProduct=()=>{

  if(rating===null){
    toast.error("Please Add Star Rating")
    return false
  } else if(comment===null){
    toast.error("Please Write A Review")
    return false
  } else{
    dispatch(addRating({rating:rating,comment:comment,productId:getProductId}))
  
 

  }
  return false
}


if (!productState) {
  return <p>Loading...</p>;
}



  return (
<>
<Meta title={"Product Name"}/>
  <BreadCrum title={productsState?.name}/>

<div className="main-product-wrapper py-5 home-wrapper-2">
    <div className="container xxl">
        <div className="row">
           <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
          
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
                <div><img src={productState?.product?.image?.[0]?.url} className="img-fluid" alt="" /></div>
                <div><img src={productState?.product?.image?.[0]?.url} className="img-fluid" alt="" /></div>
                <div><img src={productState?.product?.image?.[0]?.url} className="img-fluid" alt="" /></div>
                <div><img src={productState?.product?.image?.[0]?.url} className="img-fluid" alt="" /></div>
              
                
                
              </div>
           </div>
           <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
              <h3 className="title">{productState.product ? productState.product.name : 'Loading...'}</h3>

              </div>
              <div className="border-bottom py-3">
                <p className="price">₹{productState.product ? productState.product.price : 'Loading...'}</p>
               <div className="d-flex align-items-center gap-10">
               <ReactStars
            count={5}
            size={24}
            value={productState.product ? productState.product.ratings : 0}
            edit={false}
            activeColor="#ffd700"
          />
           <p className="mb-0 t-review">( 2 Reviews)</p>

               </div>
               <a className="review-btn" href="#review">Write A Review</a>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type: </h3> <p  className="product-data">Jewellery</p> 
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand: </h3> <p  className="product-data">{productState.product ? productState.product.brand : 'Loading...'}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category:</h3> <p  className="product-data">{productState.product ? productState.product.category : 'Loading...'}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3> <p  className="product-data">{productState.product ? productState.product.tags : 'Loading...'}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability: </h3> <p  className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Carat: </h3> <p>{productState.product ? productState.product.carat : 'Loading...'}</p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row my-2">
               {
                alreadyAdded===false && <>
                   <h3 className="product-heading">Quantity: </h3>
                  <div className="">
                       <input type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                         style={{width:"70px"}}
                          id=""
                          onChange={(e)=>{
                            setquantity(e.target.value)
                          }}
                          
                          value={quantity}
                          />

                  </div>
                
                
                
                </>
               }
                  <div className={ alreadyAdded?"ms-0":"ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                  <button
  className="button border-0"
  onClick={() => {
    alreadyAdded ? navigate('/cart') : uploadCart();
  }}
>
  {alreadyAdded ? "Go To Cart" : "Add To Cart"}
</button>


                             <Link to="/signup" className="button signup">Buy Now
                             </Link>

                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                   <div>
                    <a href=""> 
                    
                    <AiOutlineHeart className="fs-5 me-2" />Add To Wishlist
                    </a>
                   </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                   <p  className="product-data">Our aim is to provide you with the best service</p> 
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Copy Link:</h3>
              
              <a href="javascript:void(0);"
               onClick={()=>{
                copyToClipboard(
                  window.location.href
                );
              }}
              >
             Copy Product Link
              
              </a>
             


                </div>
              </div>
            </div>
           </div>
        </div>
    </div>
</div>
<div className="description-wrapper py-5 home-wrapper-2">
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
            <h4>Description</h4>
          <div className="bg-white p-3">
         
               <p>
               jjj
                </p>          
          </div>
            </div>
        </div>
    </div>
</div>
<section id="review" className="reviews-wrapper home-wrapper-2">
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
                <h3>Reviews</h3>
             <div className="review-inner-wrapper">
             <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                        <h4 className="mb-2">Customer Reviews</h4>
          <div className="d-flex align-items-center gap-10">
          <ReactStars
            count={5}
            size={24}
            value={4}
            edit={false}
            activeColor="#ffd700"
          />
           <p className="mb-0">Based On 2 Reviews</p>
          </div>
                    </div>
                   {
                 
               orderedProduct&&(
                <div>
                <a className="text-dark text-decoration-underline" href="">Write A Review</a>
            </div>
               )


                   }
                </div>
                <div  className="review-form py-4">
            <h4>Write a Review</h4>
                    <div>
                    <ReactStars
            count={5}
            size={24}
            value={4}
            edit={true}
            activeColor="#ffd700"
            onChange={(e)=>{
             setrating(e)
            }}
          />
                    </div>
          <div>
           <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" 
           placeholder="Comments"
           onChange={(e)=>{
            setComment(e.target.value)
           }}


           ></textarea>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button onClick={addRatingToProduct} className="button border-0" type="button">Submit Review</button>
          </div>
   
                </div>
                <div className="reviews mt-4">
                    {
                      productsState && productState?.rating?.map((items,index)=>{
                             return(
                              <div key={index} className="review">
       <div className="d-flex gap-10 align-items-center">
          <h6 className="mb-0">{items?.name}</h6>
          <ReactStars
            count={5}
            size={24}
            value={items?.rating}
            edit={false}
            activeColor="#ffd700"
           
          />  
       </div>
          <p className="mt-3">{items?.comment}</p>
                    </div>
                             )
                      })             
                       }
                </div>
             </div>
            </div>

            
        </div>
    </div>
</section>
<section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard data={popularProduct}/>
          
          </div>
        </div>
      </section>



</>
  )
                      }

export default SingleProduct
