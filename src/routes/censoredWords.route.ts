import express from "express";
import controller from "../controllers/censoredWords.controller";

const router = express.Router();

router.route("/").get(controller.getAll);
router.route("/:id").get(controller.getAll);
router.route("/").post(controller.createOne);
router.route("/:id").delete(controller.deleteOne);

export default router;
