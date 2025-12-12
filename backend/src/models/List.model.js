import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Position: {
        type: Number,
        required: true,
        unique: true,
    },
    BoardId: {
        type: new mongoose.Schema.Types.ObjectId(),
        ref: "Board"
    },
    Cards: [
      {
        type: new mongoose.Schema.Types.ObjectId(),
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);




const List = mongoose.model("List", ListSchema);
export default List