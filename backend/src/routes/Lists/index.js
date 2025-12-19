import { Router } from "express";
import ListController from "../../controllers/list.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const listRouter = Router();

listRouter.post("/create", verifyUser, ListController.createList);
listRouter.get("/board-lists", verifyUser, ListController.getLists);

listRouter.delete("/delete/:listId", verifyUser, ListController.deleteList);

export default listRouter;
