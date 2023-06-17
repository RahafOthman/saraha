import userModel from "../../../../DB/Model/User.model.js";
import messageModel from "../../../../DB/Model/Message.model.js"; 

export const getMessages= async(req,res)=>{

    const MessagesList = await messageModel.find({receivedId: req.id});
    return res.json({message: "success", MessagesList});   

}

export const sendMessage = async(req, res)=>{

    const {receivedId}= req.params;
    const {message} = req.body ; 
    const user = await userModel.findById(receivedId); 

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    const createMessage = await messageModel.create({receivedId, message});
    return res.json({message:'success', createMessage});
}

export const deleteMessage = async(req, res)=>{

    const id = req.id ; 
    const {messageId} = req.params; 
    
    const deletedMessage= await messageModel.deleteOne({_id:messageId, receivedId:id});
    if(deletedMessage.deletedCount==0){
        return res.status(400).json({message:"Invalid user or message id "});
    }

    return res.json({message:"Message Successfully Deleted"});
}