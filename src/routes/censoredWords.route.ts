import express from "express";
import controller from "../controllers/censoredWords.controller";

const router = express.Router();

router.route("/").get(controller.getCensoredWords);
router.route("/").post(controller.addCensoredWord);
router.route("/:id").delete(controller.deleteCensoredWord);

export default router;
