import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500).json(error)
    }
});
//UPDATE
router.post("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id , {$set : req.body} , {new : true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
});
//DELETE
//GET
//GET ALL

export default router;
