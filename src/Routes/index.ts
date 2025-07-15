import { Router } from "express";
import authRoute from "./Auth/auth.route";
import userRoute from "./User/user.route";
import conceptRoute from "./Concept/concept.route";

const router = Router();

// authentication routes
router.use("/auth", authRoute);

// user routes
router.use("/user", userRoute);

// concept routes
router.use("/concept", conceptRoute);

export default router;
