import { ApiError } from "../utils/ApiError.js";
import Card from "../models/Card.model.js";

class CardServices {
  static async createCard(body) {
    const { Title, Description, listId } = body || {};

    if (!Title || !listId) {
      throw new ApiError(400, "Title or listId is Empty");
    }

    try {
      const newCard = await Card.create({
        Title,
        Description,
        ListId: listId,
      });

      return {
        msg: "Card Created Successfully",
        data: newCard,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }

  static async getCards(listId) {
    if (!listId) {
      throw new ApiError(400, "listId is Empty");
    }

    try {
      const Cards = await Card.find({ ListId: listId });
      return {
        msg: "Cards Retrieved Successfully",
        data: Cards,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }
}

export default CardServices;
