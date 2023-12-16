const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"https://incomparable-syrniki-a8faa9.netlify.app/"}))


// route imports
// const { isAuthenticatedUser } = require("./middleware/auth");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
const enqRouter = require("./routes/enqRoute");
const cartRoutes = require("./routes/cartRoutes");
const checkoutpayment=require("./routes/checkoutpayment");

app.use("/api/v1",  product);
app.use("/api/v1", user);
app.use("/api/v1/",order);
app.use("/api/v1/",enqRouter);
app.use("/api/v1", cartRoutes);
app.use("/api/v1/", checkoutpayment);


//middleWare for errors
app.use(errorMiddleware);


  



module.exports = app;
 