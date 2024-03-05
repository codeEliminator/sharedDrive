const mongoose = require("mongoose");

const ImageDetailsScheme = new mongoose.Schema(
  {
    image: String,
    email: String
  },
  {
    collection: "ImageDetails"
  }
)

mongoose.model("ImageDetails", ImageDetailsScheme)