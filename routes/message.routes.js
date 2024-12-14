import express  from "express";
import { allMessages,sendMessage} from "../controllers/message.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",authentication, sendMessage);
router.get("/:chatRoomId",authentication, allMessages);
export default router;