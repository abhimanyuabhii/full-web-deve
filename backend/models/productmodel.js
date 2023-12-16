const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required:[true,"Please Enter Product Name"],
        trim:true

    },


    description:{
        type:'string',

        required:[true,"Please Enter Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price Cannot Exceed 8 chaarcters"]

    },
    ratings:{
        type:Number,
        default:0

    },
    image:[
        {

        public_id:{
            type:'string',
            required:true
        },

        url:{
            type : 'string' ,
            required:true
        },
    }
    ],
    category:{
type:'string',
required:[true," Please Enter Products Category"],

    },
    stock:{
        type:Number,
        required:[true, "Please Enter Products Stock"],
        maxLength:4,
        default:1

    },
    numOfReviews:{
       type:Number, 
       default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                require: true
            },
         
            name:{
                type:'String',
                required:true,

            },
            rating:{
                 type:Number,
                 required:true,

        },
        comment:{
            type:'string',
            required:true
        }

       
       
    }
    ],

    Gender: {
        type: 'string',  // Assuming tags should be an array of strings
        required: true
    },


    tags: {
        type: 'string',  // Assuming tags should be an array of strings
        required: true
    },

    brand: {
        type: 'string',  // Assuming tags should be an array of strings
        required: false
    },
    Stone: {
        type: 'string',  // Assuming tags should be an array of strings
        required: true
    },
 
    Carat: {
        type: 'string',  // Assuming tags should be an array of strings
        required: true
    },

    quantity:{
        type:Number,
        required:[true, "Please Enter Products Stock"],
        maxLength:4,
        default:1

    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("products", productSchema);