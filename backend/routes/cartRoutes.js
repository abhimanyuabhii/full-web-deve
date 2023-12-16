const express = require('express');
const router = express.Router();
const { userCart, getUserCart, removeProductFromCart,updateProductQuantityFromCart } = require('../controllers/usercontroller');
const { isAuthenticatedUser } = require("../middleware/auth");



// Apply the isAuthenticatedUser middleware to the route that requires authentication
router.post("/user/cart", isAuthenticatedUser);
router.get("/user/cart", isAuthenticatedUser);
router.post("/user/cart", userCart);
router.get("/user/cart", getUserCart);
router.use("/user/delete-product-cart/:cartItemId", isAuthenticatedUser);
router.delete("/user/delete-product-cart/:cartItemId", removeProductFromCart);
router.use("/user/update-product-cart/:cartItemId", isAuthenticatedUser);
router.put("/user/update-product-cart/:cartItemId", updateProductQuantityFromCart);
module.exports = router;
