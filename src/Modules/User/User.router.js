import {Router} from 'express'; 
import * as UserController from './controller/User.controller.js';
import { auth } from '../../Middleware/auth.middleware.js';
import {asyncHandler} from '../../Services/errorHandling.js';
import fileUpload from '../../Services/multer.js';
import { HME } from '../../Services/multer.js';
const router = Router();

router.get('/profile',auth ,asyncHandler(UserController.getProfile));
router.patch('/profilePic',auth, fileUpload().single('image'), HME, asyncHandler(UserController.profilePic));

export default router; 


