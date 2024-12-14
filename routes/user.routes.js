import express from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import userController from '../controllers/user.controller.js'

const {
  loginUser,
  registerUser,
  getAllUsers,
  getSpecificUser
} = userController;

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", authentication, getAllUsers);
router.get("/", authentication, getSpecificUser);

export default router;
