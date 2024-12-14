import express from "express";
import userRoutes from "./user.routes.js";
import messageRoutes from "./message.routes.js";
import chatRoutes from "./chat.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "This is chat service" });
});

router.use("/users", userRoutes);
router.use("/chats", chatRoutes);
router.use("/message", messageRoutes);

export default router;
