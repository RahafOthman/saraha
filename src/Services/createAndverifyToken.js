import jwt from 'jsonwebtoken'; 

export const createToken = (payload, signature= process.env.TOKEN_SIGNATURE, expiresIn='1h')=>{
    const token = jwt.sign(payload, signature, {expiresIn});
    return token;
}

export const verfiyToken = (token, signature= process.env.TOKEN_SIGNATURE)=>{
    const decoded = jwt.verify(token,signature);
    return decoded;
}