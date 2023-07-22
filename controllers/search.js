const { request, response } = require("express");
const { User, Category, Product } = require("../models/models");
const allowCollections = ["category", "product", "user"];

const execSearch = async ({ options = {}, Model, res = response, msg }) => {
  const element = await Model.find(options);
  return element
    ? res.status(200).json({ results: element })
    : res.status(404).json({
        msg,
      });
};

const prepareSearch = async function ({options = {}, Model, res = response, term = ""}) {
  const isMongoId = require("mongoose").Types.ObjectId.isValid(term);

  if (isMongoId) {
    return execSearch({
      options: {
        _id: term,
        status: true,
      },
      Model,
      res,
      msg: "User not found",
    });
  } else {
    return execSearch({
      options,
      Model,
      res,
      msg: "User not found",
    });
  }
};

const search = async (req = request, res = response) => {
  const { term, collection } = req.params;
  const regex = new RegExp(term, "i");

  if (!allowCollections.includes(collection)) {
    res.status(404).json({
      msg: "Collection not found",
    });
  }

  const match = {
    category: function () {
        prepareSearch({
          Model: Category,
          options: {
              $or: [ { name: regex } ],
              $and: [{ status: true }],
            },
          term, 
          res,
        });
      },
    product: function () {
        prepareSearch({
          Model: Product,
          options: {
              $or: [{ name: regex }, { price: +term }],
              $and: [{ status: true }],
            },
          term, 
          res,
        });
      },
    user: function () {
      prepareSearch({
        Model: User,
        options: {
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }],
          },
        term, 
        res,
      });
    },
  };

  try {
    match[collection]();
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  search,
};