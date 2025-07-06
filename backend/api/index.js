import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const app = express();
const PORT = 2200;
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDb")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDb disconnected")
})

// make middlewares
app.use(express.json())

app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomsRoute)


//first api
app.get("/users" , (req , res)=>{
    res.send("hello first req")
})
















app.listen(PORT, () => {
    console.log("Server connected.");
    connect();
});
