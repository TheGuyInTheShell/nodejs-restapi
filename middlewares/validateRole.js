const { Request, Response } = require("express");
const {User} = require("../models/models");

const validateRole = (roles = []) =>
    (req = Request, res = Response, next)=> {
        const { role: userRole } = req.user;
        if(roles.findIndex((role)=> userRole === role) === -1 ){
            return res.status(401).send({
                msg: "Unauthorized"
            })
        }
        next();
    }

module.exports = validateRole