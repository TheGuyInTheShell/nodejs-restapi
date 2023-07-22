const { request, response } = require("express");
const { uploadFile, deleteFile } = require("../helpers/index");
const { User, Product } = require("../models/models");
const path = require("path");
const fs = require('fs');
const defaultImg = '8ff4fc356ace7bb6a4defaa840e1e14d.jpg'
let model = {};

const foundAndUpdate = async ({ Model = {}, name = "", img = "", id = "", collection = "" }) => {
  model = await Model.findOne({
    _id: id,
    status: true,
  });
  if (!model) {
    return res.status(404).send({
      msg: `${name} not found`,
    });
  }
  if(model.img){
    deleteFile(collection, model.img)
  }
  model.img = img;
  await model.save();
  return model;
};

const foundFile = async ({Model, id, collection}) => {
   const model = await Model.findOne({
    _id: id,
    status: true
   })
   
   const pathFile = path.join(__dirname, '../uploads', collection, model?.img || '')
   if (model?.img && fs.existsSync( pathFile )) {
      return pathFile
   }
   return path.join(__dirname, '../uploads', defaultImg)
}

const getFile = async (req = request, res = response) => {
   const { id, collection } = req.params

   const match = {
    users: async function () {
      return foundFile({
        Model: User,
        collection,
        id,
      });
    },
    products: async function () {
      return foundFile({
        Model: Product,
        collection,
        id,
      });
    },
  };

  try {
    const pathFile = await match[collection]();
    res.sendFile(pathFile);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Internal error",
    });
  }

}


const changeFile = async (req, res = response) => {
  const { id, collection } = req.params;
  const { files } = req
  const validateExtensions = ["png", "jpg", "webp", "jpeg", "gif"];
  const match = {
    users: async function () {
      return foundAndUpdate({
        Model: User,
        name: "User",
        img: await uploadFile(validateExtensions, files?.profile, collection),
        id,
        collection
      });
    },
    products: async function () {
      return foundAndUpdate({
        Model: Product,
        name: "Product",
        img: await uploadFile(validateExtensions, files?.product, collection),
        id,
        collection
      });
    },
  };

  try {
    const updateModel = await match[collection]();
    res.send(updateModel);
    model = {};
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Internal error",
    });
  }
};

const saveFile = async (req = request, res = response) => {
  const result = {};

  try {
    const validateExtensions = ["png", "jpg", "webp", "jpeg", "gif"];
    await uploadFile(validateExtensions, req.files?.photo);
    result.msg = "Save file";
  } catch (error) {
    result.msg = error;
    console.log(result);
    return res.status(500).send(result);
  }

  res.send(result);
};

module.exports = {
  changeFile,
  deleteFile,
  saveFile,
  getFile,
};
