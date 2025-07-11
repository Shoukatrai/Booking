import Hotel from "../models/Hotel.js";

export const createHotel = async (request, response, next) => {
  const newHotel = new Hotel(request.body);
  try {
    const saveHotel = await newHotel.save();
    response.status(200).json({
        status : true,
        data:saveHotel,
        message: "Hotel Create Successfully!"
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateHotel = async (request, response, next) => {
  const id = request.params.id;
  console.log("id" , id)
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json({
        data: updatedHotel,
        status : true,
        message : "Hotel Updated Successfully!"
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteHotel = async (request, response, next) => {
  const id = request.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    response.status(200).json({
        message : "Hotel has been deleted!",
        data: null,
        status : true
    });
  } catch (error) {
    next(error.message);
  }
};

export const getHotel = async (request, response, next) => {
  const id = request.params.id;
  try {
    const hotel = await Hotel.findById(id);
    response.status(200).json({
        data: hotel ,
        status: true
    });
  } catch (error) {
    next(error.message);
  }
};

export const getHotels = async (request, response, next) => {
  try {
    const hotels = await Hotel.find();
    response.status(200).json({
        status :true,
        data : hotels
    });
  } catch (error) {
    next(error.message);
  }
};

export const countByCity = async (request, response, next) => {
  try {
    const hotels = await Hotel.find();
    response.status(200).json({
        status :true,
        data : hotels
    });
  } catch (error) {
    next(error.message);
  }
};
