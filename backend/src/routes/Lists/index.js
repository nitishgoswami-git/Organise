import { Router } from "express";
import ListController from "../../controllers/list.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const listRouter = Router();

listRouter.post('/create',verifyUser,ListController.createList)
listRouter.get('/board-lists',verifyUser,ListController.getLists)
// ListRouter.put('/update/:ListId',verifyUser,ListController.updateBoard)
// ListRouter.delete('/delete/:ListId',verifyUser,ListController.deleteBoard)
// ListRouter.post('/collaborators/:boardId',verifyUser,ListController.addCollaborations)
// ListRouter.delete('/collaborators/:boardId',verifyUser,ListController.removeCollaboartions)
// // authRouter.post("/refresh", AuthController.refreshToken);

export default listRouter;