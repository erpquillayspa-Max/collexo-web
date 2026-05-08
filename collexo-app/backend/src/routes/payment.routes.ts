import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import express from "express";

const router = Router();

router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.stripeWebhook
);

router.post("/mp/webhook", PaymentController.mpWebhook);

router.use(requireAuth);

router.post("/mp/preference", PaymentController.createMpPreference);
router.post("/stripe/intent", PaymentController.createStripeIntent);

export default router;
