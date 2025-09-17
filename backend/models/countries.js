import mongoose from "mongoose";

const Country = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },

    flag: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("country", Country);
