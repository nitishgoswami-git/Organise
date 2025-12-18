import ListServices from "../services/list.service.js";

class ListController {
  static async createList(req, res) {
    try {
      const res_obj = await ListServices.createList(req.body);

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

  static async getLists(req, res) {
    try {
      const res_obj = await ListServices.getLists(req.query.boardId);

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
}

export default ListController;
