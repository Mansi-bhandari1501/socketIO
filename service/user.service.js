import { hash_password } from "../helpers/auth.helper.js";
import UserModel from "../models/user.model.js";
import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/auth.helper.js";

const registerUser = async (payload) => {
  try {
    const { username, email, password } = payload;

    if (!email || !password) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "please fill all the required fields",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw Object.assign(new Error(), {
        name: "CONFLICT",
        message: "User Already exists",
      });
    }

    const hashed_password = await hash_password(password);
    const user = await new UserModel({
      username,
      email,
      password: hashed_password,
    }).save();

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password } = payload;

    if (!email || !password) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Invalid details",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "Invalid details",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (user) => {
  try {
    const users = UserModel.find({ email: { $ne: user.email } });
    return users;
  } catch (error) {
    throw error;
  }
};

export const getSpecificUser = async (loggedInUser) => {
  try {
    const user = await UserModel.findOne({ _id: loggedInUser._id });

    if (!user) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "User not found",
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const userService = {
  registerUser,
  loginUser,
  getUsers,
  getSpecificUser,
};

export default userService;
