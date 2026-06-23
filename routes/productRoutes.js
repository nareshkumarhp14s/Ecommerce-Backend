import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.post('/:id/review', authMiddleware, addReview);

export default router;
