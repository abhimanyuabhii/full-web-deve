const ErrorHandler = require("../utilis/errorhandler");
const catchasyncerror = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utilis/jwtToken");
const sendEmail = require("../utilis/sendEmail");
const crypto = require("crypto");
const { response } = require("express");
const { assign } = require("nodemailer/lib/shared");
const catchAsyncError = require("../middleware/catchAsyncError");
const Cart = require("../models/cartModel"); // Import the Cart model
const validateMongoDbId = require("../utilis/validateMongodbId")
const products = require("../models/productmodel");
const { AsyncLocalStorage } = require("async_hooks");

// Register a User
exports.registerUser = catchasyncerror(async (req, res, next) => {
    const {name, email,password}= req.body;

    const user = await User.create({
        name,
    email,
    password,
    avatar: {
        public_id:"this is sample" ,
        url:"temporary"
      }
    });


    sendToken(user,201,res);
});

// Login User
exports.loginUser = catchasyncerror(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
   

sendToken(user,200, res);


});


// Logout User
exports.logout = catchasyncerror(async (req, res, next) => {
  res.clearCookie('token')

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});


// Forgot Password
exports.forgotPassword = catchasyncerror(async(req,res,next)=>{

  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("User Not Found", 404))
  }

// Get ResetPassword Token
const resetToken = user.getResetPasswordToken();

const cleanResetToken = resetToken.replace(/^\/|\/$/g, '');


await user.save({ validateBeforeSave: false });

const resetPasswordUrl = `http://localhost:3000/password/reset/${cleanResetToken}`;

const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

try {
  await sendEmail({
    email: user.email,
    subject: `Shree Dev Jewels Password Recovery`,
    message,
  });

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return next(new ErrorHandler(error.message, 500));
}
});

// Reset Password
exports.resetPassword = catchasyncerror(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


// Get User Detail
exports.getUserDetails = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// update User password
exports.updatePassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
 
// update User Profile
exports.updateProfile = catchasyncerror(async (req, res, next) => {

  const newUserData ={
    name:req.body.name,
    email:req.body.email,
    address:req.body.address
  }

  // Cloudinary Later

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    usefindandModify:false

  })

res.status(200).json({
  success:true,

})
});

//Get All User (admin)

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  })
})



// Get Single User(Admin)

exports.GetSingleUser = catchAsyncError(async(req, res, next)=>{
  
  const user = await User.findById(req.params.id)

  if(!user){
    return next (
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`)
    );
  }
   
  res.status(200).json({
    success:true,
    user,
  });

});

// update User ROle  ---  Admin
exports.updateUserRole = catchasyncerror(async (req, res, next) => {

  const newUserData ={
    name:req.body.name,
    email:req.body.email,
    address:req.body.address,
    role:req.body.role,
  }


  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    usefindandModify:false

  })

res.status(200).json({
  success:true,

})
});


// Delete User  ---  Admin
exports.deleteUser = catchasyncerror(async (req, res, next) => {

const user = await User.findById(req.params.id);

if(!user){
  return next (new ErrorHandler(`User Does Not Exists With id: ${req.params.id}`, 400)
  )
}

await User.deleteOne({ _id: req.params.id });



  // Cloudinary remove


  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
})
});



 const userCart = catchAsyncError(async (req, res) => {
  const { productId,quantity,price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
 
    let newCart = await new Cart({
      userId:_id,
      productId,
      price,
      quantity
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});







const getUserCart = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate({
        path: "productId",
        model: products, // Use the correct model name
        select: "name description price category quantity Carat ",
      })
      .exec();

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});





const removeProductFromCart=catchasyncerror(async(req,res)=> {
  const { _id } = req.user;
  const {cartItemId}= req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromcart = await Cart.deleteOne({userId:_id,_id:cartItemId})

    res.json(deleteProductFromcart);
  } catch (error) {
    throw new Error(error);
  }
})






const updateProductQuantityFromCart = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params; // Remove newQuantity from the params
  const { quantity } = req.body; // Use req.body to get the new quantity
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOneAndUpdate(
      { userId: _id, _id: cartItemId },
      { quantity: quantity },
      { new: true }
    );
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});




const emptyCart = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deleteCart = await Cart.deleteMany({userId:_id });
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

exports.userCart = userCart;
exports.getUserCart = getUserCart;
exports.removeProductFromCart = removeProductFromCart
exports.updateProductQuantityFromCart = updateProductQuantityFromCart;
exports.emptyCart = emptyCart;

