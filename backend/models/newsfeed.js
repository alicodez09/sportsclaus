import mongoose from "mongoose";

const Newsfeed = new mongoose.Schema(
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
    // date: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("newsfeed", Newsfeed);
