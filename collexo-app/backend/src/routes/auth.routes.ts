import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { authRateLimit } from "../middlewares/rateLimit.middleware";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

router.post(
  "/register",
  authRateLimit,
  [
    body("username").trim().isLength({ min: 3, max: 30 }).isAlphanumeric(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("country").isISO31661Alpha2(),
  ],
  validate,
  AuthController.register
);

router.post(
  "/login",
  authRateLimit,
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  AuthController.login
);

router.post(
  "/refresh",
  [body("refreshToken").notEmpty()],
  validate,
  AuthController.refresh
);

router.post("/logout", requireAuth, AuthController.logout);

export default router;
