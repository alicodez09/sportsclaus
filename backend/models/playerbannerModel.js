import mongoose from "mongoose";

const PlayerBanner = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },


    image: {
      type: Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("playerbanner", PlayerBanner);
