import User from "../models/Hotel.js";

export const updateUser = async (request, response, next) => {
  const id = request.params.id;
  console.log("id" , id)
  try {
    const updatedUser= await User.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json({
        data: updatedUser,
        status : true,
        message : "User Updated Successfully!"
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteUser = async (request, response, next) => {
  const id = request.params.id;
  try {
    await User.findByIdAndDelete(id);
    response.status(200).json({
        message : "Userhas been deleted!",
        data: null,
        status : true
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUser= async (request, response, next) => {
  const id = request.params.id;
  try {
    const user = awaitUser.findById(id);
    response.status(200).json({
        data: user,
        status: true
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUsers = async (request, response, next) => {
  try {
    const users = await User.find();
    response.status(200).json({
        status :true,
        data : users
    });
  } catch (error) {
    next(error.message);
  }
};
