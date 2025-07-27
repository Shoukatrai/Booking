import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
//create room
export const createRoom = async (req, res) => {
  try {
    const body = req.body;
    const hotelId = req.params.hotelId;
    const newRoom = new Room(body);
    const savedRoom = await newRoom.save();
    console.log("savedRoom" , savedRoom)
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
    res.status(200).json({
      message: "Room Created!",
      status: true,
      data: savedRoom,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

//UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//DELETE ROOM
export const deleteRoom = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const id = req.params.id;
    await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id},
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
    res.status(200).json({
      message : "Room has been deleted",
      status : true
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//GET SINGLE ROOM
export const getRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findById(id);
    res.status(200).json({
      message : "Room Found!",
      data : room,
      status : true
    });
  } catch (error) {
    res.status(500).json({
      message : error.message,
      data : null,
      status : false
    });
  }
};

//get rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
