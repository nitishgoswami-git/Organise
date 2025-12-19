import CardServices from "../services/card.service.js";

class CardController {
  static async createCard(req, res) {
    try {
      const res_obj = await CardServices.createCard(req.body);
      return res.status(201).json({
        success: true,
        message: res_obj.msg,
        data: res_obj.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async getCards(req, res) {
    try {
      const res_obj = await CardServices.getCards(req.query.listId);
      return res.status(200).json({
        success: true,
        message: res_obj.msg,
        data: res_obj.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async updateCard(req, res) {
    try {
      const res_obj = await CardServices.updateCard(req.params.cardId, req.body);
      return res.status(200).json({
        success: true,
        message: res_obj.msg,
        data: res_obj.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async deleteCard(req, res) {
    try {
      const res_obj = await CardServices.deleteCard(req.params.cardId);
      return res.status(200).json({
        success: true,
        message: res_obj.msg,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export default CardController;
