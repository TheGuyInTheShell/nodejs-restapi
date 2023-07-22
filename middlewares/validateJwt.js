require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Request, Response } = require("express");
const {User} = require("../models/models");

const validateJwt = async (req = Request, res = Response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send({
      msg: "No token provided in x-token header",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    const {__v, _id: id, ...data} = await User.findOne(
      { _id: uid, status: true }
      );
    if (!data) return res.status(401).send({
        msg: "Invalid token: user not found",
      });

    req.user = {
      id,
      ...data._doc,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Invalid token: err",
    });
  }
};

module.exports = validateJwt;
