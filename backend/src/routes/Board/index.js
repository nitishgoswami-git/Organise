import { Router } from "express";
import BoardController from "../../controllers/auth.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const boardRouter = Router();

// boardRouter.post('/create',verifyUser,BoardController.createBoard)
// boardRouter.get('/:boardId',verifyUser,BoardController.getBoard)
// boardRouter.get('/allboards',verifyUser,BoardController.getAllBoards)
// boardRouter.put('/update/:boardId',verifyUser,BoardController.updateBoard)
// boardRouter.delete('/delete/:boardId',verifyUser,BoardController.deleteBoard)
// boardRouter.post('/collaborators/:boardId',verifyUser,BoardController.addCollaborations)
// boardRouter.delete('/collaborators/:boardId',verifyUser,BoardController.removeCollaboartions)
// // authRouter.post("/refresh", AuthController.refreshToken);

export default boardRouter;