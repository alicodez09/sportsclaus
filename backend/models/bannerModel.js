import mongoose from "mongoose";

const Banner = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
      type: Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("banner", Banner);
