

const Product = require("../models/productmodel");
const ErrorHandler = require("../utilis/errorhandler");
const catchasyncerror = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utilis/apifeatures");




// Create products -- Admin

exports.createProduct = catchasyncerror(async (req, res, next) => {

 const product = await Product.create(req.body);

 res.status(201).json({
   success: true,
   product
 });
});


//closed

// Get all products
exports.getAllProducts = catchasyncerror(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures =  new ApiFeatures(Product.find(),req.query).search()
  .filter()
  .pagination(resultPerPage)
 

 
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
    
  });
});


// Get Product Details
exports.getAllProductsDetails = catchasyncerror(async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Server Error", 500));
  }
});





//closed

// Update products -- Admin
exports.updateProduct = catchasyncerror(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    
    

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  }
   catch (error) {
    // Handle any potential errors here
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



//delete product


exports.deleteProduct = catchasyncerror(async (req, res, next) => {
  try {
    const productId = req.params.id; // Extract the product ID from the request parameters

    // Use findById to find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    

    // Use deleteOne to delete the document
    await Product.deleteOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// Create New Review or Update the review
exports.createProductReview = catchasyncerror(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});