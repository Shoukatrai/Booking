import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const id = req.params.id;
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getHotels = async (req, res) => {
  const { min, max, ...other } = req.query;
  try {
    const hotels = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const countByCity = async (req, res) => {
  try {
    const cities = req.query.cities;
    if (!cities) {
      return res.status(400).json({
        message: "Cities parameter is required",
        status: false,
      });
    }
    const cityArray = cities.split(",");

    const list = await Promise.all(
      cityArray.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    console.log(list);
    res.status(200).json({
      message: "Hotel Count",
      status: true,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const countByType = async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json({
      message: "Hotel Count",
      status: true,
      data: [
        { type: "hotel", count: hotelCount },
        { type: "apartment", count: appartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
