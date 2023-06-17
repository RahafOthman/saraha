import {Router} from 'express';
import * as MessageController from './controller/Message.controller.js';
import {asyncHandler} from '../../Services/errorHandling.js';
import { auth } from '../../Middleware/auth.middleware.js';
const router = Router();

router.get("/",auth ,asyncHandler(MessageController.getMessages));
router.post("/:receivedId", asyncHandler(MessageController.sendMessage));
router.delete("/:messageId", auth, asyncHandler(MessageController.deleteMessage));
export default router; 
