import userModel from "../../DB/Model/User.model.js";
import { verfiyToken } from "../Services/createAndverifyToken.js";

export const auth = async(req, res, next)=>{
   
    const {authorization} = req.headers;
       

    if(!authorization?.startsWith(process.env.BEARERKEY)){
        return res.json({message:"invalid bearer key"});
    }

    const token = authorization.split(process.env.BEARERKEY)[1];

    if(!token){
        return res.json({message:"invalid token"});
    }

    const decoded = verfiyToken(token);
    const authUser = await userModel.findById(decoded.id);
    if(!authUser){
        return res.json({message:"not register account"});
    }
    req.id = decoded.id ; 
    next();


}