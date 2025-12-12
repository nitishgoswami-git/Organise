import mongoose, { mongo } from "mongoose"

const BoardSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
        trim: true
    },
    Description:{
        type: String,

    },
    Lists:[ {
        type: new mongoose.Schema.Types.ObjectId(),
        ref:"List"
    }],
    members:[{
        type: new mongoose.Schema.Types.ObjectId(),
        ref:"User"
    }],
    createdBy:{
        type: new mongoose.Schema.Types.ObjectId(),
        ref:"User"
    }
},{timestamps:true})


const Board = mongoose.model("Board",BoardSchema)
export default Board