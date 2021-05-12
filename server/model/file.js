const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
