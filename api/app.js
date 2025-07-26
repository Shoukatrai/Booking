import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/dbConnection.js";
import dotenv from "dotenv"
const app = express()
dotenv.config()



app.get("/" , (req , res)=>res.send("server up"))
dbConnection()
app.listen(process.env.PORT , ()=>console.log("Server started!"))