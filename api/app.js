import express from "express";
import { dbConnection } from "./config/dbConnection.js";
import dotenv from "dotenv";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js"
import roomRouter from "./routes/rooms.js";
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())
//middlewares
app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomRouter)

// app.get("/" , (req , res)=>res.send("server up"))
dbConnection()
app.listen(process.env.PORT , ()=>console.log("Server started!"))