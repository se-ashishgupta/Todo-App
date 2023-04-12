import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookies(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hasedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    sendCookies(user, res, `Register Successfully`, 201);
  } catch (error) {
    next(error);
  }
};

export const getmyProfile = (req, res) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developemnt" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developemnt" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
      message: "Logout SuccessFully",
    });
};
