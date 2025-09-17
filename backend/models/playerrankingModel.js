import mongoose from "mongoose";

const PlayerRanking = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String, //Test,T20,ODI
      required: true,
    },
    player_type: {
      type: String, //batsman,bowler,all_rounder
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    country: {
      type: Object,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },


  },
  { timestamps: true }
);
export default mongoose.model("playerranking", PlayerRanking);
