const jwt = require('jsonwebtoken');


const authMiddleware  = (next) => ( req , res) => {
    try{
        
        const {headers: {authorization}} = req;
        const token = authorization.substring('Barier '.length);

        const decoded = jwt.verify(token, 'shhhhh');
        if(!decoded?.id) throw new Error();
        console.log(decoded.id);

        req.headers.userId = decoded.id;
        next(req, res);
    }catch(e){
        res.status(401).json({message: "Unauthorized"})
        
    }
} ;

module.exports = authMiddleware 