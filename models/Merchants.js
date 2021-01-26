const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  Image: {
    type: String,
    default: "fas fa-store",
  },
});

//Merchant id and category and category images
