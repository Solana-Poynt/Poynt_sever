import mongoose, { Schema, ObjectId } from "mongoose";

export interface IUser extends ILocation {
  id?: string;
  password: string;
  email: string;
  name?: string;
  referralId?: string;
  referrals?: number;
  role?: string;
  savedLocations?: ILocation[];
  recentSearchs?: string[];
  poynts?: number;
  tier?: number;
  googleId?: string;
  OTP?: number | string;
  otpExpiresAt?: number;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface ILocation {
  locationName?: string;
  meridian?: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "An email must be provided"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
  },
  poynts: {
    type: Number,
    default: 0.0,
  },
  tier: {
    type: Number,
    default: 0,
  },
  referrals: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "user",
  },
  referralId: {
    type: String,
  },
  savedLocations: [
    {
      locationName: String,
      meridian: String,
    },
  ],
  recentSearchs: [String],
  OTP: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", userSchema);
