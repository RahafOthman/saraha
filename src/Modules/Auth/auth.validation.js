import joi from 'joi';


export const signupSchema = 
{   
    body: joi.object({
        userName: joi.string().alphanum().min(2).max(10).required().messages({
            'any.required': 'userName is required',
            'string.empty': 'userName is empty'
        }),
        email: joi.string().email({
            minDomainSegments: 1 ,
            maxDomainSegments: 2 , 
            tlds: { allow: ['com', 'net']},
        }).required().messages({
            'any.required': 'email is required',
            'string.empty': 'email is empty',
            'string.email': 'email must be a valid email'
        }),
        password: joi.string().required().messages({
            'any.required': 'password is required',
            'string.empty': 'password is empty',
        }),
        cPassword: joi.string().valid(joi.ref('password')).required().messages({
            'any.required': 'cPassword is required',
            'any.only': 'cPassword must be a refernce password',
        }),
    }).required(),

    query:joi.object({
        test: joi.boolean().required(),
    }).required(),
}

export const loginSchema = {
    body: joi.object({
        email: joi.string().email({
            minDomainSegments: 1 ,
            maxDomainSegments: 2 , 
            tlds: { allow: ['com', 'net']},
        }).required().messages({
            'any.required': 'email is required',
            'string.empty': 'email is empty',
            'string.email': 'email must be a valid email'
        }),
        password: joi.string().required().messages({
            'any.required': 'password is required',
            'string.empty': 'password is empty',
        }),
    }).required(),
}