import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/upload.middleware";
import { uploadRateLimit } from "../middlewares/rateLimit.middleware";

const router = Router();

router.use(requireAuth);

router.get("/me", UserController.getMe);
router.get("/:username", UserController.getByUsername);
router.put(
  "/me/avatar",
  uploadRateLimit,
  uploadAvatar.single("avatar"),
  UserController.uploadAvatar
);

export default router;
