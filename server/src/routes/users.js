const Joi = require('joi');
const express = require('express');
const UsersModule = require('../modules/users');
const {authMiddleware} = require('./middlewares');
const {imgUpload} = require('./middlewares/imgUpload');
const jwt = require('jsonwebtoken');


const route = express.Router();

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    birthdate: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    secretQuestion: Joi.string().required(),
    gender: Joi.string().required(),
})

route.post('/create', async (req, res) =>{ 
    try{
        const { username,password,birthdate, country,city,secretQuestion,gender }  =  await userSchema.validateAsync(req.body)
            .catch(() => { throw new Error({status: 400, message: 'Invalid Data'})});  
        const data = await UsersModule.create([{ username, password,birthdate, country,city,secretQuestion,gender}]);
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
}));

const getByIdSchema = Joi.object({
    userId: Joi.string().required()
});

route.get('/:userId', async (req, res) => {
    const { userId } = await getByIdSchema.validateAsync(req.params);
    const user = await UsersModule.findById(userId);
    res.json(user.deletedAt ? null : user);
});

route.delete('/delete/:userId', async (req, res) => {
    const { userId } = req.params;
    const deletedUser = await UsersModule.findByIdAndUpdate(userId, { deletedAt: new Date() });
    res.json(deletedUser);

});

route.get('/', (req, res) => {
    imgUpload.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

route.post('/', upload.single('image'), (req, res, next) => {
  
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});

module.exports = route;



