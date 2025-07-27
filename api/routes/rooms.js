import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
const roomRouter = express.Router()

//CREATE
roomRouter.post("/:hotelId", verifyAdmin, createRoom);
//UPDATE
roomRouter.put("/:id", verifyAdmin, updateRoom);
//DELETE
roomRouter.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
//GET
roomRouter.get("/:id", getRoom);
//GET ALL
roomRouter.get("/", getRooms);


export default roomRouter