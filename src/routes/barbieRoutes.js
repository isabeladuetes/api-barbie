import express from "express";
import {
  getAllBarbies,
  getBarbieById,
  createBarbie,
  deleteBarbie,
  updateBarbie,
} from "./../controllers/barbieController.js";

const router = express.Router();

// Rotas para barbies
router.get("/", getAllBarbies);
router.get("/:id", getBarbieById);
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie);
router.put("/:id", updateBarbie);

export default router;
