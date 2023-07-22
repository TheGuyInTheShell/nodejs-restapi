const {response, request} = require('express')
const {User} = require('../models/models')
const bcryptjs = require('bcryptjs')// 

const getUsers = async ( req = request, res = response) => {
    const { pag = 1, limit = 5 } = req.query
    try {
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find({status: true})
            .limit(+limit)
            .skip((+pag - 1) * limit)
        ])
        res.status(200).send({
            total,
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

const postUsers = async (req = request, res = response) => {
    try {
        const {name, password, email, role, google} = req.body
        const hashPassword = await bcryptjs.hash(password, 10)
        const userExists = new User({
            name,
            password: hashPassword,
            email,
            role,
            google
        })
        const existEmail = await User.findOne({email})
        if(existEmail){
            res.status(400).send({
                error: 'Email already exists: ' + email
            })
            return
        }
        await userExists.save()
        res.status(200).send(userExists)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

const deleteUsers = async (req = request, res = response) => {
    const {id} = req.params
    try {
        const userExists = await User.findByIdAndUpdate(id, {status: false})
        res.status(200).send(userExists)
    }
     catch(error) {
        console.log(error)
        res.status(500).send({
            err: 'Error deleting user',
            id
        })
    }
}

const putUsers = async (req = request, res = response) => {
    const {id} = req.params
    const {_id, __v, password, google, email, correo,
          ...rest} = req.body
    
    if(password){
        rest.password = await bcryptjs.hash(password, 10)
    }

    try {
        const userExists = await User.findByIdAndUpdate(id, rest)         
        res.status(200).send(userExists)
    } catch (error) {
        console.log(error)
        res.status(500).send(id)
    }
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers
}