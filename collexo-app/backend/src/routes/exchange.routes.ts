import { Router } from "express";
import { body } from "express-validator";
import { ExchangeController } from "../controllers/exchange.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", ExchangeController.getMyOffers);

router.post(
  "/",
  [
    body("toUserId").isUUID(),
    body("type").isIn(["trade", "sale", "gift"]),
    body("offeredStickerIds").isArray({ min: 1 }),
    body("requestedStickerIds").isArray(),
  ],
  validate,
  ExchangeController.createOffer
);

router.patch("/:id/accept", ExchangeController.acceptOffer);
router.patch("/:id/reject", ExchangeController.rejectOffer);

export default router;
