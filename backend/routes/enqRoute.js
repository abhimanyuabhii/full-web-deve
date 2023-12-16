const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} = require("../controllers/enqCtrl");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Temporarily remove isAuthenticatedUser middleware
// Example:
router.post("/enquiry", isAuthenticatedUser, createEnquiry);

router.put("/:id", isAuthenticatedUser,updateEnquiry);
router.delete("/:id", isAuthenticatedUser,authorizeRoles("Admin"),deleteEnquiry);
router.get("/:id", isAuthenticatedUser,authorizeRoles("Admin") ,getEnquiry);
router.get("/", isAuthenticatedUser,authorizeRoles("Admin") ,getallEnquiry);

module.exports = router;
