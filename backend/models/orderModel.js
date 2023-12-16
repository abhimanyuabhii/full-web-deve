const mongoose = require("mongoose");
const { StrictMode } = require("react");


const orderSchema = new mongoose.Schema({
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
  
      state: {
        type: String,
        required: true,
      },
  
      country: {
        type: String,
        required: true,
      },
      PinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: false,
      },
      other: {
        type: String,
        required: true,
      },
    },

    orderItems: [
        {
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
         
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      paymentInfo: {
        razorpayOrderId: {
          type: String,
          required: true,
        },
        razorpayPaymentId: {
          type: String,
          required: true,
        },
      },
     
   
      orderStatus: {
        type: String,
        required: false,
        default: "Processing",
      },
      deliveredAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },


      totalPrice: {
        type: Number,
        required: false,
        default: 0,
      },
    });


    module.exports = mongoose.model("Order", orderSchema)