import userModel from "../../../../DB/Model/User.model.js";
import { sendEmail } from "../../../Services/SendEmail.js";
import { createToken, verfiyToken } from "../../../Services/createAndverifyToken.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";

export const signup = async(req, res)=>{
       
      
        const {userName, email, password } = req.body;
        const user = await userModel.findOne({email});

        if(user){
            return res.status(409).json({message: "email already exists"});
        }
        const hashPassword = hash(password); 
        
        const token = createToken({email}, process.env.EMAIL_TOKEN);
        const link = `https://agreeable-lingerie-hare.cyclic.app/auth/confirmEmail/${token}`;
        sendEmail(email, 'Confirm Email', `<a href=${link}>Verfiy your email </a>`);

        const createuser = await userModel.create({userName, email, password:hashPassword});

        return res.status(201).json({message:"done", user: createuser._id});
   
}

export const confirmEmail=async(req,res)=>{
   const {token} = req.params;
   const decoded = verfiyToken(token, process.env.EMAIL_TOKEN);
   const user = await userModel.updateOne({email:decoded.email}, {confirmEmail: true});

   return res.redirect('https://www.facebook.com');
}

export const login = async(req, res)=>{

    const {email, password}= req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.json({message: "Email not exists"});
    }else {

        if(!user.confirmEmail){
            return res.json({message: "please verfiy your email"}); 
        }
        const match = compare(password, user.password);
        if(!match){
            return res.json({message: "error in password or email"});
        }else {
            const token = createToken({id:user._id});
            return res.json({message:"Successful login", token});
        }
    }

}