import express from "express";
import { createChat, fetchChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:chatRoomId", fetchChats);

export default router;
