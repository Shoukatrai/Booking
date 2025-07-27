import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  try {
    const body = req.body;
    const hashPass = await bcrypt.hash(body.password, 10);
    console.log("hashPass", hashPass);
    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hashPass,
    });

    await newUser.save();
    res.status(200).json({
      message: "user has been created!",
      status: true,
      data : newUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data : null
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    if (!user) {
      return res.status(404).json("user not found");
    }

    const hashPass = await bcrypt.compare(body.password, user.password);
    if (!hashPass) {
      return res.status(400).json("Invalid password or username!");
    }
    console.log("hashPass", hashPass);
    //token create
    const token = await jwt.sign({id : user._id , isAdmin : user.isAdmin} , process.env.PRIVATE_KEY)
    console.log("token" , token)
    const {password , isAdmin , ...otherDetails} = user._doc
    res.cookie("access_token" , token , {
        httpOnly : true
    }).status(200).json({
      message: "Login successful!!",
      status: true,
      data: otherDetails
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: true,
      data: null,
    });
  }
};
