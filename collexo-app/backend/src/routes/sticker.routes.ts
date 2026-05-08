import { Router } from "express";
import { StickerController } from "../controllers/sticker.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/templates", StickerController.getAllTemplates);
router.get("/my-album", StickerController.getMyAlbum);
router.get("/album/:userId", StickerController.getUserAlbum);

export default router;
