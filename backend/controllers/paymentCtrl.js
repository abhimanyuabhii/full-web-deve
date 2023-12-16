const Razorpay=require("razorpay")
const instance=new Razorpay({
    key_id:"rzp_test_NEvbon0DZOZsev", key_secret:"xekxvQGz0xkizhAbfdBAbh2k"
})

const checkout = async(req, res)=>{
    const {total}=req.body
    const option ={
        amount: total *100,
         currency:'INR',
        
    }
    const order=await instance.orders.create(option)
    res.json({
        success:true,
        order
    })
}

const paymentVerification = async(req, res)=>{
    const{razorpayOrderId, razorpayPaymentId}=req.body
    res.json({
        razorpayOrderId,
        razorpayPaymentId

    })
}


module.exports ={
    checkout,
    paymentVerification
}