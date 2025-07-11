import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin ,createHotel);
//DELETE
router.delete("/:id", verifyAdmin,deleteHotel);
//UPDATE
router.put("/:id", verifyAdmin,updateHotel );
//GET
router.get("/:id", getHotel );
//GET ALL
router.get("/", getHotels);


export default router;