const {Reponse, Request} = require('express')

const getUsers = (req = Request, res = Reponse) => {
    console.log(req.query)
    res.status(200).send(req.query)
}

const postUsers = (req = Request, res = Reponse) => {
    console.log(req.body)
    res.status(200).send(req.body)
}

const deleteUsers = (req = Request, res = Reponse) => {
    console.log(req.params)
    res.status(200).send(req.params)
}

const putUsers = (req = Request, res = Reponse) => {
    console.log(req.body)
    res.status(200).send(req.body)
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers
}