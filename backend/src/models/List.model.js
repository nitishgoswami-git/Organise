import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description:{
      type:String
    },
    PositionX: {
        type: Number,
        
    },
   PositionY: {
        type: Number,
        
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