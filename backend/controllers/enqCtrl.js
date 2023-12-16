
const Enquiry = require("../models/enqModel");
const catchasyncerror = require("../middleware/catchAsyncError");
const validateMongoDbId = require("../utilis/validateMongodbId");

const createEnquiry = catchasyncerror(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    console.error("Error in createEnquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





const updateEnquiry = catchasyncerror(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = catchasyncerror(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiry = catchasyncerror(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiry = catchasyncerror(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    res.json(getallEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};