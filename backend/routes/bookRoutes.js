import express from "express";
import { getAllBooks, lastFourBooks, uploadBook } from "../controllers/bookController.js";

const router = express.Router();

router.post("/uploadBooks", uploadBook);
router.get("/getBooks", getAllBooks);
router.get("/lastFourBooks", lastFourBooks);

export default router;
