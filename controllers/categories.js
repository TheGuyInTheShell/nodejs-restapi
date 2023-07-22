const { request, response } = require("express");
const { Category } = require("../models/models");

const addCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
      return res.status(400).send({
        msg: `The category already ${name} exists`,
      });
    }
    const data = {
      name,
      user_ref: req.user.id,
    };

    const newCategory = new Category(data);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server error",
    });
  }
};

const getCategories = async (req = request, res = response) => {
  try {
    const { limit = 5, pag = 1 } = req.query;
    const {role} = req.user
    const [total, categoriesResult] = await Promise.all([
      Category.countDocuments(),
      Category.find( role !== 'ADMIN_ROLE' ? { status: true } : {} )
      .limit(limit)
      .skip((+pag - 1) * limit)
      .populate("user_ref"),
    ])
    if (!categoriesResult) {
      return res.status(404).send({
        msg: "Not found categories",
      });
    }

    res.status(201).send({
      total,
      categoriesResult,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const getCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {role} = req.user
    const queryOptions = role !== 'ADMIN_ROLE' ? 
    {
      _id: id, 
      status: true 
    } : 
    {
      _id: id,
    }
    const categoryDB = await Category.findOne(queryOptions).populate("user_ref");

    if (!categoryDB) {
      return res.status(404).send({
        msg: "Category not found",
      });
    }

    res.status(201).send(categoryDB);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const editCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const user_ref = req.user.id;

    const categoryDB = await Category.findOneAndUpdate(
      {
        _id: id,
        status: true,
      },
      {
        name,
        user_ref,
      },
      {
        new: true,
      }
    );

    if (!categoryDB) {
      return res.status(404).send({
        msg: "Not found categories",
      });
    }
    res.status(201).send(categoryDB);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const categoryDB = await Category.findByIdAndUpdate(
      id,
      {
        status: false,
      },
      {
        new: true,
      }
    );

    if (!categoryDB) {
      return res.status(404).send({
        msg: "Not found categories",
      });
    }
    res.status(201).send(categoryDB);
  } catch (error) {}
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
};
