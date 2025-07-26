import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/dbConnection.js";
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//middlewares
app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomsRoute)

// app.get("/" , (req , res)=>res.send("server up"))
dbConnection()
app.listen(process.env.PORT , ()=>console.log("Server started!"))