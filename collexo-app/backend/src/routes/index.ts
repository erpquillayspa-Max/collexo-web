import { Router } from "express";
import authRoutes from "./auth.routes";
import stickerRoutes from "./sticker.routes";
import exchangeRoutes from "./exchange.routes";
import userRoutes from "./user.routes";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/stickers", stickerRoutes);
router.use("/exchanges", exchangeRoutes);
router.use("/users", userRoutes);
router.use("/payments", paymentRoutes);

export default router;
