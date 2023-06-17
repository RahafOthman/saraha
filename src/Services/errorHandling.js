export const asyncHandler = (fn)=>{
    return (req, res)=>{
        fn(req,res).catch(error =>{
            return res.json({message:"Error", error: error.stack})
        });
    }
}