import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, "Firstname is required"],
         trim: true,
         minLength: 1,
         maxLength: 50,
      },
       lastName: {
           type: String,
           required: [true, "Lastname is required"],
           trim: true,
           minLength: 1,
           maxLength: 50,
       },
       username: {
           type: String,
           required: [true, "Username is required"],
           trim: true,
           minLength: 1,
           maxLength: 50,
       },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         trim: true,
         lowercase: true,
         minLength: 1,
         maxLength: 255,
         match: [
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
            "Valid email address required",
         ],
      },
      password: {
         type: String,
         required: [true, "Password is required"],
         minLength: 6,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User;
