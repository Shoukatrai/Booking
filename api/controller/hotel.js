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

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
