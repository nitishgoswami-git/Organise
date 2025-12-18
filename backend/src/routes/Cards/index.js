import { Router } from "express";
import CardController from "../../controllers/card.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const cardRouter = Router();

cardRouter.post('/create',verifyUser,CardController.createCard)
cardRouter.get('/list-cards',verifyUser,CardController.getCards)

// cardRouter.get('/:CardId',verifyUser,CardController.getBoard)
// cardRouter.put('/update/:CardId',verifyUser,CardController.updateBoard)
// cardRouter.delete('/delete/:CardId',verifyUser,CardController.deleteBoard)
// cardRouter.post('/collaborators/:boardId',verifyUser,CardController.addCollaborations)
// cardRouter.delete('/collaborators/:boardId',verifyUser,CardController.removeCollaboartions)
// // authRouter.post("/refresh", AuthController.refreshToken);

export default cardRouter;