import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const CardSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
    },
    ListId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "List",
    },
    Postion: {
      type: Number,
      required: true,
      default: 1,
    },
    AssignedTo: [
      {
        type: new mongoose.Schema.Types.ObjectId(),
        ref: "User",
      },
    ],
    Labels: {
      type: String,
    },
    Comments: [CommentSchema],
  },
  { timestamps: true }
);


const Card = mongoose.model("Card", CardSchema);
export default Card;
