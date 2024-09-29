import { Router } from "express";
import authRoute from "./Auth/auth.route";
import userRoute from "./User/user.route";

const router = Router();

// authentication routes
router.use("/auth", authRoute);

// user routes
router.use("/user", userRoute);

export default router;
