import {ApiError} from "../utils/ApiError.js";
import Board from "../models/Board.model.js";

class BoardServices {
  static async createBoard({ body, userId }) {
    //get user data
    //check collaborators
    //assign a new board for user
    const { Title, Description, Members } = body || {};
    // console.log(Title,Desc,userId)
   
    if (!Title || !userId) {
      throw new ApiError(400, "UserId or Title is Empty");
    }

    try {
      const newBoard = await Board.create({
        Title: Title,
        Description: Description,
        Members: Members || [],
        createdBy: userId,
      });
      return {
        msg: "Board Created Successfully",
        data: newBoard,
      };
    } catch (err) {
      throw new ApiError(err.StatusCode, err.message);
    }
  }

  static async getBoardbyId(boardId) {
    if (!boardId) {
      throw new ApiError(400, "BoardId is Empty");
    }
    try {
      const boardData = await Board.findById({ _id: boardId });
      return {
        msg: "Board Retrived Successfully",
        data: boardData,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }

  static async getBoardsbyUserId(userId) {
    if (!userId) {
      throw new ApiError(400, "userId is Empty");
    }
    try {
      const userBoards = await Board.find({ createdBy: userId });
      return {
        msg: "Board Retrived Successfully",
        data: userBoards,
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }

  static async deleteBoard(boardId) {
    if (!boardId) {
      throw new ApiError(400, "BoardId is Empty");
    }
    try {
      const deletedBoard = await Board.findByIdAndDelete(boardId);
      return {
        msg: "Board Deleted Successfully",
      };
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }

  static async updateBoard(req, boardId) {
    // check boardID
    if (!boardId) {
      throw new ApiError(400, "BoardId is Empty");
    }
    try {
      const updatedBoard = await Board.findByIdAndUpdate({
        _id: boardId,
        Title: Title,
        Description: Desc,
        Members: Members,
        Lists: Lists,
      });
    } catch (err) {
      throw new ApiError(500, err.message);
    }
  }
}

export default BoardServices;
