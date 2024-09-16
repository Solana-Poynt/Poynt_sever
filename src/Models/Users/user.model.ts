import mongoose, { Schema, ObjectId } from "mongoose";

export interface IUser {
  id?: string;
  password: string;
  email: string;
  name?: string;
  googleId?: string;
  OTP?: number | string;
  otpExpiresAt?: number;
  isEmailVerified?: boolean;
  createdAt?: string;
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
