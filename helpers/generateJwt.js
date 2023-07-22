require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwt = (uid = '')=> new Promise((resolve, reject)=>{

    jwt.sign({
        uid
    }, process.env.SECRET_JWT_SEED, {
        expiresIn: '10h'
    }, (err, token)=>{
        if(err){
            reject(err);
        }else{
            resolve(token);
        }
    });

})


module.exports = generateJwt;