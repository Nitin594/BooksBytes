import express from "express";
import { deleteBook, getAllBooks, lastFourBooks, uploadBook } from "../controllers/bookController.js";

const router = express.Router();

router.post("/uploadBooks", uploadBook);
router.get("/getBooks", getAllBooks);
router.get("/lastFourBooks", lastFourBooks);
router.delete("/deleteBook/:id", deleteBook);

export default router;
