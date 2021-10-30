const Joi = require('joi');
const express = require('express');
const UsersModule = require('../modules/users');
const {authMiddleware} = require('./middlewares');
const jwt = require('jsonwebtoken');


const route = express.Router();

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

route.post('/create', async (req, res) =>{ 
    try{
        const { username,password }  =  await userSchema.validateAsync(req.body)
            .catch(() => { throw new Error({status: 400, message: 'Invalid Data'})});  
        const data = await UsersModule.create([{ username, password}]);
        res.json(data[0]);
    }catch({status, message}){
        console.log(`ERROR status: ${status} message: ${message}`);
        res.status(status || 500).json({message});
    }
});

route.post('/login', async (req, res) =>{ 
    try{
        const { username,password }  =  await userSchema.validateAsync(req.body)
            .catch(() => { throw new Error({status: 400, message: 'Invalid Data'})});  
        
        const user = await UsersModule.findOne({ username, password});
        if(!user) throw new Error({status: 403, message:'Invalid Credentials' });

        var token = jwt.sign({ id: user._id } , 'shhhhh');
        console.log(token)
        res.json({token});

    }catch({status, message}){
        console.log(`ERROR status: ${status} message: ${message}`);
        res.status(status || 500).json({message});
    }
});
route.get('/app', authMiddleware(async (req, res) => {
    
    console.log(req.headers.userId);
    res.json({});
}))






module.exports = route;



