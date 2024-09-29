import mongoose, { Schema, ObjectId } from "mongoose";

export interface IReview {
  id?: string;
  locationReviewed?: {
    locationName: String;
    meridian: String;
  };
  rating?: number;
  reviewMessage?: string;
  reviewer?: string;
}

const reviewSchema = new mongoose.Schema({
  locationReviewed: {
    locationName: String,
    meridian: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Rating must be provided"],
  },
  reviewMessage: {
    type: String,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Review = mongoose.model("Review", reviewSchema);
