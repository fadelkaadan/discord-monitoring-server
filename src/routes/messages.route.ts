import express from "express";
import controller from "../controllers/messages.controller";

const messagesRouter = express.Router();

messagesRouter.route("/").get(controller.getMessages);
messagesRouter.route("/:id").delete(controller.deleteMessage);

export default messagesRouter;
