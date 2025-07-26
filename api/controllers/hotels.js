import Hotel from "../models/Hotel.js"

export const createHotel = async(req , res)=>{
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updateHotel = async(req , res)=>{
    try {
        const id = req.params.id
        const body = req.body
        const updatedHotel = await Hotel.findByIdAndUpdate(id , {$set : body} , {new : true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const deleteHotel = async(req , res)=>{
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error.message)
    }
}