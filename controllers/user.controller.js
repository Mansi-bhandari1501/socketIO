import errorHandler from "../lib/utils.js";
import userService from '../service/user.service.js'

export const registerUser = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);

    return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: response.user,
    });
  } catch (error) {
    console.log(error)
    errorHandler(res, error);
  }
};

export const getAllUsers = async (req, res) => {
  let users = await userService.getUsers(req.user);
    return res.status(200).send({
      success: true,
      user: users,
    });
};

export const getSpecificUser = async (req, res) => {
  try{
    let user = await userService.getSpecificUser(req.user);
    return res.status(200).send(user)

  }catch (error) {
    console.log(error)
    errorHandler(res, error);
  }
};


export const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: response.user,
      token: response.token,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export default {
  loginUser,
  registerUser,
  getAllUsers,
  getSpecificUser
};
