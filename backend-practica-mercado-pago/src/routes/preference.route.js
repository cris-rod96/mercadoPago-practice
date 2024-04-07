import { Router } from "express";
import { createPreference } from "../controller/post.controller.js";

const router = Router();

router.post("/create", createPreference);

export default router;
