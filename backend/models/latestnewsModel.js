import mongoose from "mongoose";

const LatestNews = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },


    image: {
      type: Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("latestnews", LatestNews);
