import { ApiError } from "../utils/ApiError.js";
import Card from "../models/Card.model.js";

class CardServices {
  static async createCard(body) {
    const { Title, Description, listId } = body || {};

    if (!Title || !listId) {
      throw new ApiError(400, "Title or listId is required");
    }

    const newCard = await Card.create({ Title, Description, ListId: listId });
    return { msg: "Card created successfully", data: newCard };
  }

  static async getCards(listId) {
    if (!listId) throw new ApiError(400, "listId is required");
    const cards = await Card.find({ ListId: listId });
    return { msg: "Cards retrieved successfully", data: cards };
  }

  static async updateCard(cardId, data) {
    if (!cardId) throw new ApiError(400, "cardId is required");
    const updated = await Card.findByIdAndUpdate(cardId, data, { new: true });
    if (!updated) throw new ApiError(404, "Card not found");
    return { msg: "Card updated successfully", data: updated };
  }

  static async deleteCard(cardId) {
    if (!cardId) throw new ApiError(400, "cardId is required");
    const deleted = await Card.findByIdAndDelete(cardId);
    if (!deleted) throw new ApiError(404, "Card not found");
    return { msg: "Card deleted successfully" };
  }
}

export default CardServices;
