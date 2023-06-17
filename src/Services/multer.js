import multer from 'multer'; 
import { nanoid } from 'nanoid';

export const HME=(err,req,res,next)=>{
    if(err){
        return res.status(400).json({message:"Error", err});
    }
    else{
        next();
    }
}

function fileUpload(){
    const storage = multer.diskStorage({
        // destination:(req,res,cb)=>{
        //    cb(null, 'uploads');
        //},
        //filename:(req,file,cb)=>{
        //    cb(null,nanoid()+'_'+file.originalname);
        //}
    })

    function fileFilter(req,file,cb){
        if(['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)){
            cb(null, true);
        }else{
            cb("invalid formate", false)
        }
    }

    const upload = multer({fileFilter:fileFilter, storage});
    return upload;
}

export default fileUpload ; 