import express from "express";
import controller from "../controllers/channel.controller";

const channelRouter = express.Router();

channelRouter.route("/").get(controller.getMessages);
channelRouter.route("/:id").delete(controller.deleteMessage);

channelRouter.route("/flagged").get(controller.getFlaggedMessages);

export default channelRouter;
