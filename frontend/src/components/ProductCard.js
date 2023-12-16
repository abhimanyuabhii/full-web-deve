import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';

const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === '/store' ? `gr-${grid}` : 'col-3'
            } mb-4`}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <Link to="/wishlist">
                  <img src="/icons8-heart-16.png" alt="wishlist" />
                </Link>
              </div>

              <div className="product-image">
                {item.image?.[0]?.url && (
                  <img
                    src={item.image[0].url}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
              </div>
           
<div className="product-details">
  <h5 className="product-title">
    {item.name}
  </h5>
  <div className="hide-stars">
    <ReactStars
      count={5}
      size={24}
      value={item.ratings}
      edit={false}
      activeColor="#ffd700"
    />
  </div>
  <p className="price">
    {item.description}
  </p>
</div>

              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-10">
                  <Link to={'/product/' + item?._id}>
                    <img src="/icons8-view-16.png" alt="view product" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
