import BoardServices from "../services/board.service.js"

class BoardController{
    static async createBoard(req,res){
        try{
            const res_obj = await BoardServices.createBoard({
                body: req?.body || null,
                userId : req.user?._id || null
            })
            return res.status(201).json({
                success:true,
                message:res_obj.msg ||  "Board Created Successfully",
                data : res_obj.data
            })
        }catch(err){
            return res.status(400).json({
                success : false ,
                message: err.message || "Failed to create a new board"
            })
        }
    }
}

export default BoardController