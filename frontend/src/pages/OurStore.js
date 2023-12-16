import React, { useEffect, useState } from 'react';
import BreadCrum from '../components/BreadCrum';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/product/productSlice';

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();

  const productState = useSelector((state) => state?.product.products);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStone, setSelectedStone] = useState('');
  const [selectedCarat, setSelectedCarat] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categoryData = [
    {
      id: 'Gender',
      name: 'Gender',
      options: ['Female', 'Male'],
    },
    {
      id: 'category',
      name: 'Category',
      options: ['Rings', 'Bracelet', 'Necklace'],
    },
    {
      id: 'stone',
      name: 'Stone',
      options: ['Diamond', 'Sapphire', 'Emerald'],
    },
    {
      id: 'carat',
      name: 'Carat',
      options: ['10g', '20g', '30g'],
    },
  ];

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(getAllProducts());
  }, []);

  const handleCategoryChange = (categoryId, option) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleStoneChange = (stone) => {
    setSelectedStone(stone);
  };

  const handleCaratChange = (carat) => {
    setSelectedCarat(carat);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    // You'll need to implement sorting logic here
  };

  const filteredProducts = productState.filter((product) => {
    return (
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (selectedGender === '' || selectedGender === product.Gender) &&
      (selectedStone === '' || selectedStone === product.Stone) &&
      (selectedCarat === '' || selectedCarat === product.Carat)
    );
  });

  return (
    <>
      <Meta title={'Our Store'} />
      <BreadCrum title="Our Store" />
      <div className="store-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
              {categoryData.map((category) => (
                <div className="filter-card mb-3" key={category.id}>
                  <h3 className="filter-title">{category.name}</h3>
                  {category.id === 'Gender' ? (
                    category.options.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id={`gender-${option}`}
                          checked={selectedGender === option}
                          onChange={() => handleGenderChange(option)}
                        />
                        <label className="form-check-label" htmlFor={`gender-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))
                  ) : category.id === 'stone' ? (
                    category.options.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${category.id}-${option}`}
                          checked={selectedStone === option}
                          onChange={() => handleStoneChange(option)}
                        />
                        <label className="form-check-label" htmlFor={`${category.id}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))
                  ) : category.id === 'carat' ? (
                    category.options.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${category.id}-${option}`}
                          checked={selectedCarat === option}
                          onChange={() => handleCaratChange(option)}
                        />
                        <label className="form-check-label" htmlFor={`${category.id}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))
                  ) : (
                    category.options.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${category.id}-${option}`}
                          checked={selectedCategories.includes(option)}
                          onChange={() => handleCategoryChange(category.id, option)}
                        />
                        <label className="form-check-label" htmlFor={`${category.id}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 flex-wrap">
                    <p className="mb-0 d-block" style={{ width: '100px' }}>
                      Sort By:
                    </p>
                    <select
                      name="sort"
                      className="form-control form-select"
                      id="sort"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="featured">Featured</option>
                      <option value="best-selling">Best Selling</option>
                      <option value="title-ascending">Alphabetical, A-Z</option>
                      <option value="title-descending">Alphabetical, Z-A</option>
                      <option value="price-ascending">Price, Low to High</option>
                      <option value="price-descending">Price, High to Low</option>
                      <option value="created-ascending">Date, Old to New</option>
                      <option value="created-descending">Date, New to Old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">{filteredProducts.length} Products</p>
                    {/* ... */}
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                    <ProductCard data={filteredProducts} grid={grid} />
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
