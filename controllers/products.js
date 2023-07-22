const { request, response } = require("express");
const { Product } = require("../models/models");

const addProduct = async (req = request, res = response) => {
  try {
    const productData = req.body;
    const ProductDB = await Product.findOne({ name: productData.name.toUpperCase() });

    if (ProductDB) {
      return res.status(400).send({
        msg: `The Product already ${name} exists`,
      });
    }
    const data = {
      ...productData,
      name: productData.name.toUpperCase(),
      user_ref: req.user.id,
    };

    const newProduct = new Product(data);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server error",
    });
  }
};

const getSomeProducts = async (req = request, res = response) => {
  try {
    const { limit = 5, pag = 1 } = req.query;
    const { role } = req.user;
    const queryOptions = {};
    role !== "ADMIN_ROLE" && (queryOptions.status = true);
    const [total, ProductResult] = await Promise.all([
      Product.countDocuments(),
      Product.find(queryOptions)
        .limit(limit)
        .skip((+pag - 1) * limit)
        .populate("user_ref", "name")
        .populate("category_ref", "name"),
    ]);
    if (!ProductResult) {
      return res.status(404).send({
        msg: "Not found Product",
      });
    }

    res.status(201).send({
      total,
      ProductResult,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const getProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    const queryOptions = {
      _id: id,
    };
    role !== "ADMIN_ROLE" && (queryOptions.status = true);
    const ProductDB = await Product.findOne(queryOptions)
      .populate("category_ref", "name")
      .populate("user_ref", "name");

    if (!ProductDB) {
      return res.status(404).send({
        msg: "Product not found",
      });
    }

    res.status(201).send(ProductDB);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const editProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const user_ref = req.user.id;

    const ProductDB = await Product.findOneAndUpdate(
      {
        _id: id,
        status: true,
      },
      {
        ...productData,
        name: productData.name.toUpperCase(),
        user_ref,
      },
      {
        new: true,
      }
    );

    if (!ProductDB) {
      return res.status(404).send({
        msg: "Not found Product",
      });
    }
    res.status(201).send(ProductDB);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Server Error",
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const ProductDB = await Product.findByIdAndUpdate(
      id,
      {
        status: false,
      },
      {
        new: true,
      }
    );

    if (!ProductDB) {
      return res.status(404).send({
        msg: "Not found Product",
      });
    }
    res.status(201).send(ProductDB);
  } catch (error) {}
};

module.exports = {
  addProduct,
  getProduct,
  getSomeProducts,
  editProduct,
  deleteProduct,
};
