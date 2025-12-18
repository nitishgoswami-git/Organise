import { ApiError } from "../utils/ApiError.js";
import List from "../models/List.model.js";

class ListServices {
  static async createList(body) {
    const { Title, Description, boardId } = body || {};

    if (!Title || !boardId) {
      throw new ApiError(400, "Title or boardId is Empty");
    }

    try {
      const newList = await List.create({
        Title,
        Description,
        BoardId: boardId,
      });

      return {
        msg: "List Created Successfully",
        data: newList,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }

  static async getLists(boardId) {
    if (!boardId) {
      throw new ApiError(400, "BoardId is Empty");
    }

    try {
      const lists = await List.find({ BoardId: boardId });
      return {
        msg: "Lists Retrieved Successfully",
        data: lists,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }
}

export default ListServices;
