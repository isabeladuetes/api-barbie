import express from "express";
import { getAllBarbies, getBarbieById, createBarbie, deleteBarbie } from "./../controllers/barbieController.js"

const router = express.Router();

// Rotas para bruxos 
router.get("/", getAllBarbies);
router.get("/:id", getBarbieById);
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie); 

export default router;