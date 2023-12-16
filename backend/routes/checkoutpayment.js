const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { checkout, paymentVerification } = require('../controllers/paymentCtrl');

// Apply the isAuthenticatedUser middleware to the route that requires authentication

router.post("/order/checkout",isAuthenticatedUser);
router.post("/order/checkout",checkout);
router.post("/order/paymentVerification", isAuthenticatedUser);
router.post("/order/paymentVerification", paymentVerification);

module.exports = router;
