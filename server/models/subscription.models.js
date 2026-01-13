import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Subscription name is required"],
         trim: true,
         minLength: 2,
         maxLength: 100,
      },
      price: {
         type: Number,
         required: [true, "Subscription proce s required"],
         min: [0, "price must be greater than 0"],
      },
      currenct: {
         type: String,
         enum: ["NGN", "USD", "EUR", "GBP"],
         default: "NGN",
      },
      frequency: {
         type: String,
         enum: ["daily", "weekly", "monthly", "yearly"],
      },
      category: {
         type: String,
         enum: [
            "entertainment",
            "sports",
            "news",
            "gaming",
            "lufestyle",
            "finance",
            "politics",
            "other",
         ],
         required: [true, "Categoty is required"],
      },
      paymentMethod: {
         type: String,
         required: true,
         trim: true,
      },
      status: {
         type: String,
         required: true,
         enum: ["active", "expired", "cancelled"],
      },
      startDate: {
         type: Date,
         required: true,
         validate: {
            validator(value) {
               return value > this.startDate;
            },
            message: "Start date must not be in the past",
         },
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },
   },
   { timestamps: true }
);
