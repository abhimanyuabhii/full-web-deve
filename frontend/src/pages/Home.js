import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard"
import SpecialProducts from '../components/SpecialProducts';
// import container from "../components/container"
import { Services } from '../utilis/Data';
// import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { getAllProducts } from '../features/product/productSlice';



const Home = () => {
  const productState = useSelector((state) => state?.product?.products); // Update property name
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);



  const getProducts = () => {
    dispatch(getAllProducts());
  };


  return (
<>

<section className="home-wrapper-2 py-3">
  <div className="container-xxl">
  <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative p-3">
                <img src="/realbanner.jpg" className="img-fluid rounded-3" alt="" />
                <div className="main-banner-content position-absolute">
                  <h4>Discover Elegance Unveiled</h4>
                  <h5>Exquisite Jewellery</h5>
                  <p>ShreeDev Jewels - Elevate Your Style</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-15 justify-content-between align-items-center">
                <div className="small-banner position-relative" style={{ marginTop: '13px' }}>
                  <video src="/VID-20231008-WA0004.mp4" autoPlay loop muted className="img-fluid rounded-3" alt="Video" />
                </div>
                <div className="small-banner position-relative" style={{ marginTop: '13px' }}>
                  <video src="/VID-20231008-WA0008.mp4" autoPlay loop muted className="img-fluid rounded-3" alt="Video" />
                </div>
                <div className="small-banner position-relative">
                  <video src="/VID-20231017-WA0005.mp4" autoPlay loop muted className="img-fluid rounded-3" alt="Video" />
                </div>
                <div className="small-banner position-relative" >
                  <video src="/VID-20231017-WA0006.mp4" autoPlay loop muted className="img-fluid rounded-3" alt="Video" />
                </div>
              </div>
            </div>
          </div>
  </div>
</section>

<container class1="home-wrapper-2 py-5">
<div className="row">
            <div className="col-12">
             <div className="services d-flex align-items-center justify-content-between">
             { Services?.map((i, j) => {
          return (
            <div className="d-flex align-items-center gap-15 " key={j}>
              <img src={i.image} alt=""/>
              <div>
                <h6>{i.title}</h6>
                <p className="mb-0">{i.tagline}</p>
              </div>
              <div />
       </div>

  );
})}
</div>
</div>
</div>
</container>

   
        

     

      <section className="home-wrapper-3 py-2">
  <div className="categories d-flex justify-content-between align-items-center">
    <div className="">
    <img src="https://i.postimg.cc/yYWfj37h/banner-84.png" alt="Banner Image"  onload="this.parentNode.style.maxWidth = this.clientWidth + 'px';" />
    </div>
  </div>
</section>
<section className="feature-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading"> Featured Collection</h3>
            
              { productState && productState?.map((items,index)=>{
               if(items.tags==="Featured"){
                return(
                <div
        key={index}
        className={"col-3"}>
      
          <div to=":id" className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <Link to="/wishlist">
                <img src="/icons8-heart-16.png" alt="wishlist" />
              </Link>
            </div>
            <div className="product-image">
              <img src="/product necklace.jpg" className="img-fluid" alt="" />
              <img src="/product necklace 2.jpg" className="img-fluid" alt="" />
            </div>
            <div className="product-details">
            
              <h5 className="product-title">
              {items.name}
              </h5>
              <ReactStars
                count={5}
                size={24}
                value={items.ratings} 
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
              {items.description}
              </p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-10">
                <button className='border-0 bg-transparent'>
                  <img src="/icons8-add-to-cart-16.png" alt="add cart" />
                </button>
                <button
                          className="border-0 bg-transparent"
                          onClick={() => navigate('/product/' + items?._id)}
                        >
                          <img src="/icons8-view-16.png" alt="view product" />
                        </button>
              </div>
            </div>
          </div>
        </div>
                )
               }
              })}
            </div>
          </div>
        </div>
      </section>

<section className="famous-wrapper py-5 home-wrapper-2">
  <div className="container-xxl">
    <div className="row">
      <div className="col-3">
        <div className="famous-card position-relative">
          <img src="product111.png" className="img-fluid" alt="famous" />
          <div className="famous-content position-absolute">
            <h5 className="text-dark">Luxurious Sparkle</h5>
            <h6 className="text-dark">The perfect finishing touch</h6>
            <p className="text-dark">This ring is the perfect accessory for any occasion</p>
          </div>
        </div>
        </div> 
        <div className="col-3">
        <div className="famous-card position-relative">
          <img src="product111.png" className="img-fluid" alt="famous" />
          <div className="famous-content position-absolute">
          <h5 className="text-dark">Earrings that are as unique as you are</h5>
          <h6 className="text-dark">Earrings for every occasion.</h6>
          <p className="text-dark">Dazzle with these stunning earrings</p>
          </div>
        </div>
        </div>     
        <div className="col-3">
        <div className="famous-card position-relative">
          <img src="product111.png" className="img-fluid" alt="famous" />
          <div className="famous-content position-absolute">
          <h5 className="text-dark">Bracelet Charm</h5>
          <h6 className="text-dark">Crafted Elegance</h6>
          <p className="text-dark">Crafted with sophistication from the finest materials, adding an elegant touch beyond style</p>
          </div>
        </div>
        </div>  
        <div className="col-3">
        <div className="famous-card position-relative">
          <img src="product1.35.png" className="img-fluid" alt="famous" />
          <div className="famous-content position-absolute">
          <h5 className="text-dark">Trending Necklace Styles</h5>
          <h6 className="text-dark">Bohemian Chic</h6>
          <p className="text-dark">Discover timeless necklaces that never go out of style</p>
          </div>
        </div>
        </div>  

      
        </div>
  </div>
</section>



   

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            {
              productState && productState?.map((items,index)=>{
               if(items.tags==="Special"){
                return <SpecialProducts
                 key={index}
                 id={items?._id}
                 brand={items?.brand}
                 name={items.name} 
                 ratings={items?.ratings}
                 price={items?.price}
                 stock={items?.stock}
                 quantity={items?.quantity}
                 imageUrl={items?.image?.[0]?.url || "https://m.media-amazon.com/images/I/61INmJuMNaL._AC_UY1100_.jpg"}

                 />;
               }
              })
            }
 
            
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
          
             { productState && productState?.map((items,index)=>{
               if(items.tags==="Popular"){
                return(
                <div
        key={index}
        className={"col-3"}>
      
          <div  className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <Link to="/wishlist">
                <img src="/icons8-heart-16.png" alt="wishlist" />
              </Link>
            </div>
            <div className="product-image">
            <img src={items.image?.[0]?.url || "https://m.media-amazon.com/images/I/61INmJuMNaL._AC_UY1100_.jpg"} />
            <img src={items.image?.[0]?.url || "https://m.media-amazon.com/images/I/61INmJuMNaL._AC_UY1100_.jpg"} />
            </div>
            <div className="product-details">
            
              <h5 className="product-title">
              {items.name}
              </h5>
              <ReactStars
                count={5}
                size={24}
                value={items.ratings} 
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
              {items.description}
              </p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-10">
                <button className='border-0 bg-transparent' to="/add-to-cart">
                  <img src="/icons8-add-to-cart-16.png" alt="add cart" />
                </button>
                <button
                          className="border-0 bg-transparent"
                          onClick={() => navigate('/product/' + items?._id)}
                        >
                          <img src="/icons8-view-16.png" alt="view product" />
                        </button>
              </div>
            </div>
          </div>
        </div>
                )
               }
              })}
            
 
           
          
          </div>
        </div>
      </section>
 

    
 </>
  );
};


export default Home;

