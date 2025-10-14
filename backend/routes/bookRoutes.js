import express from 'express'
import { uploadBook } from "../controllers/bookController.js";

const router = express.Router();

router.post("/", uploadBook)

export default router;