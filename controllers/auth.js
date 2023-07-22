const {request, response} = require('express');
const {User} = require('../models/models');
const bycrypt = require('bcryptjs');
const generateJwt = require('../helpers/generateJwt');
const googleVerify = require('../helpers/google');

const login = async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        
        const userExists = await User.findOne({email, status: true});
        
        if(!userExists) return res.status(400).send({msg: 'Email not found'});

        if(! (await bycrypt.compare(password, userExists?.password)) ) return res.status(400).send({msg: 'Incorrect Password'});

        const token = await generateJwt(userExists.id);

        res.status(200).send({
            userExists,
            token
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).send('Server Error')
    }

}

const googleSignIn = async (req = request, res = response) => {
    const {credential} = req.body; 
    
    try {
        const {name, email, img} = await googleVerify(credential);
        let userExists = await User.findOne({correo})
        if(!userExists){
            const data = {
                name,
                email,
                password: ':p',
                img,
                role: 'USER_ROLE',
                google: true,
            }
            userExists = new User(data)
            await userExists.save()
        }
        if(!userExists.status){
            return res.status(401).send({
                msg: 'Bad user'
            })
        }
        res.status(200).send({
            msg: 'Log in sucessful',
            token: await generateJwt(userExists.id)
        })

    } catch (error) {
        
        res.status(500).send('Server Error')
    }

}



module.exports = {
    login,
    googleSignIn
}