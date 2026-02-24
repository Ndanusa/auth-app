import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 2,
      maxLength: 100,
    },
    profileImage: {
      type: String,
      required: false,
      trim: true,
      default: "http:192.168.100.197:4400/public/image/default.jpg",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
