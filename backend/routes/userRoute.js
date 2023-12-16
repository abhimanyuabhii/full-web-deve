const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, GetAllUser, getAllUser, GetSingleUser, updateUserRole, deleteUser,} = require("../controllers/usercontroller");
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router
.route("/me")
.get(isAuthenticatedUser)
.get(getUserDetails)

router
.route("/password/update")
.put(isAuthenticatedUser)
.put(updatePassword);

router
.route("/me/update")
.put(isAuthenticatedUser)
.put(updateProfile);


router
.route("/admin/users")
.get(isAuthenticatedUser)
.get(authorizeRoles("admin"))
.get(getAllUser);


router
.route("/admin/user/:id")
.get(isAuthenticatedUser)
.get(authorizeRoles("admin"))
.get(GetSingleUser)
.put(isAuthenticatedUser)
.put(authorizeRoles ("admin"))
.put(updateUserRole)
.delete(isAuthenticatedUser)
.delete(authorizeRoles("admin"))
.delete(deleteUser);




module.exports = router;