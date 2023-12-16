const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsDetails,
  getProductReviews,
  deleteReview,
} = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createProductReview } = require("../controllers/productControllers");

const router = express.Router();


router.get("/products", getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,);
router.route("/product/new").post(authorizeRoles("admin"))
router.route("/product/new").post(createProduct);

router
.route("/product/:id")
.put(isAuthenticatedUser)
.put(authorizeRoles("admin"))
.put(updateProduct)
.delete(isAuthenticatedUser)
.delete(authorizeRoles("admin"))
.delete(deleteProduct);

router.route("/product/:id").get(getAllProductsDetails);

router.route("/review")
.put(isAuthenticatedUser)
.put(createProductReview);

router
.route("/reviews")
.get(getProductReviews)
.delete(isAuthenticatedUser)
.delete(deleteReview);




module.exports = router;

