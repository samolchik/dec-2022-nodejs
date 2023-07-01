import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum value for age is 1"],
      max: [100, "Maximum value for age is 100"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      default: EUserStatus.Inactive,
      enum: EUserStatus,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
