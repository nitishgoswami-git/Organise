import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import List from "../models/List.model.js";
import Card from "../models/Card.model.js";

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

 static async deleteList(listId) {
    if (!listId) {
      throw new ApiError(400, "ListId is required");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const list = await List.findByIdAndDelete(listId, { session });

      if (!list) {
        throw new ApiError(404, "List not found");
      }

      //DELETE ALL CARDS IN THIS LIST
      await Card.deleteMany(
        { ListId: listId },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return {
        msg: "List and cards deleted successfully",
      };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      throw new ApiError(err.statusCode || 500, err.message);
    }
}
}

export default ListServices;
