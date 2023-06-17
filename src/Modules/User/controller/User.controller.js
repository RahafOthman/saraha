import userModel from "../../../../DB/Model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const getProfile= (req,res)=>{
    return res.json({message: req.id});
}

export const profilePic = async(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: "file is required"});
    }

    //const imageUrl = req.file.destination + "/" + req.file.filename ; 
   
    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `saraha/user${req.id}`});
   
   
    
    const user = await userModel.updateOne({_id: req.id}, {profilePic: secure_url});


    return res.json({ message: "profile updated successfully"});
}