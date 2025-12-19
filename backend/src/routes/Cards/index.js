import { Router } from "express";
import CardController from "../../controllers/card.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const cardRouter = Router();

cardRouter.post('/create', verifyUser, CardController.createCard);
cardRouter.get('/list-cards', verifyUser, CardController.getCards);
cardRouter.put('/update/:cardId', verifyUser, CardController.updateCard);
cardRouter.delete('/delete/:cardId', verifyUser, CardController.deleteCard);

export default cardRouter;
