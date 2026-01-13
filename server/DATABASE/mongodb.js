import mongoose from "mongoose";
import { PORT, DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
   throw new Error(
      "you need to specify the envirinment variable for the database"
   );
}

const connectDB = async () => {
   try {
      await mongoose.connect(DB_URI);
      console.log(`connected to database in ${NODE_ENV} mode`);
   } catch (error) {
      console.log("Error connecting to database: " + error);
      process.exit(1);
   }
};

export default connectDB;
