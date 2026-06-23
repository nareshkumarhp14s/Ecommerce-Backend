import express from "express";
import {
registerUser,
loginUser,
getProfile,
updateProfile,
changePassword,
getAllUsers,
toggleAdmin,
} from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile",authMiddleware,getProfile)

router.put("/profile",authMiddleware,updateProfile)
router.put("/change-password",authMiddleware,changePassword);
router.get('/users',authMiddleware,adminMiddleware,getAllUsers);

router.put('/users/:id/role',authMiddleware,adminMiddleware,toggleAdmin);
export default router;