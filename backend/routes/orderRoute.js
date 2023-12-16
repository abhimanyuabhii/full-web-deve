const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router
.route("/order/new")
.post(isAuthenticatedUser)
.post(newOrder)

router
.route("/order/:id")
.get(isAuthenticatedUser)
.get(getSingleOrder)

router
.route("/orders/myOrders")
.get(isAuthenticatedUser)
.get(myOrders);

router
.route("/admin/orders")
.get(isAuthenticatedUser)
.get(authorizeRoles("admin"))
.get(getAllOrders);

router
.route("/admin/order/:id")
.put(isAuthenticatedUser)
.put(authorizeRoles("admin"))
.put(updateOrder)
.delete(isAuthenticatedUser)
.delete(authorizeRoles("admin"))
.delete(deleteOrder);

module.exports = router;
 
