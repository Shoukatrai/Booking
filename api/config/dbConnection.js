import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONOG_URL)
    .then(() => console.log("MongoDB Connected."))
    .catch((error) => console.log("MongoDB Error", error));
};
