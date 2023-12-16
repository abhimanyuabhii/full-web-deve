const { Error } = require("mongoose");
const ErrorHandler = require("../utilis/errorhandler");


module.exports = (err,req,res,next)=>{
err.statusCode = err.statusCode  || 500;
 err.message= err.message || "Internal Server Error";


// wrong mongodb id error

if(err.name === "CastError"){
   const message = `Resources Not Found. Invalid:${err.path}`;
   err = new ErrorHandler(message,400);
}


// Mongoose Duplocate Key Error

if (err.code === 11000){
   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
   err = new ErrorHandler(message,400)
}

//  Wrong JWT error
if(err.name === "JsonWEBTokenError"){
   const message = `Josn Web Token Is Invalid, Please Try Again`;
   err = new ErrorHandler(message,400);
}

// JWT Expire error


if(err.name === "TokenExpiredError"){
   const message = `Josn Web Token Is Expired, Please Try Again`;
   err = new ErrorHandler(message,400);
}


 

 res.status(err.statusCode).json({
    success:false,
    message:err.message,
 });
};








