import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("hash", hash);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await user.save();

    res.status(200).json({
      status: true,
      data: user,
      message: "User has been created!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User Not Found!"));
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPassCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.PRIVATE_KEY
    );

    const { password, isAdmin, ...otherDeatils } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: true,
        data: otherDeatils,
        message: "User has been Successflully Login!",
      });
  } catch (error) {
    next(error);
  }
};
