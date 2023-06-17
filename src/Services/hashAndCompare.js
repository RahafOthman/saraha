import bcrypt from 'bcrypt';

export const hash= (plainText, saltRound= process.env.SALTROUND)=>{
    const hashResult = bcrypt.hashSync(plainText, parseInt(saltRound));
    return hashResult;
}

export const compare = (password, hashvalue)=>{
    const hashResult = bcrypt.compareSync(password, hashvalue);
    return hashResult;
}