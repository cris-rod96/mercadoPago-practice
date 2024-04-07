import preferenceRoutes from "./preference.route.js";
import { Router } from "express";

const router = Router();

router.use("/preferences", preferenceRoutes);

export default router;
