const Product = require("../models/product-model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
      totalProducts: products.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getAllProductsByFilters = async (req, res) => {
  const { search, category, company, price, freeShipping } = req.query;
  console.log(search, category, company, price, freeShipping);
  const title = search;

  const filteredProduct = {};

  if (title) {
    filteredProduct.title = { $regex: title, $options: "i" };
  }
  if (category && category !== "All") {
    filteredProduct.category = category;
  }

  if (company && company !== "All") {
    filteredProduct.company = company;
  }
  console.log(filteredProduct.company,"mm")
  // if (price) {
  //   filteredProduct.price = { $gte: price, $lte: 0 };
  // }
  if (freeShipping === "true") {
    filteredProduct.freeShipping = "free";
  }

  try {
    const filteredProducts = await Product.find(filteredProduct);
    console.log(filteredProducts);
    res.status(200).json({
      products: filteredProducts,
      totalProducts: filteredProducts.length,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ error: `Product doesn't exist` });
    }
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const addProduct = async (req, res) => {
  const { title, description, image, category, price, rating } = req.body;
  const userId = req.user.id;
  try {
    const product = await Product.find({ title, description, price });
    if (product) {
      return res.status(400).json({ error: `Product already exists` });
    } else {
      const newProduct = new Product({
        title,
        description,
        image,
        category,
        price,
        rating,
        createdBy: userId,
      });
      await newProduct.save();
      res.status(400).json({ message: `Product added successfully` });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const editProduct = async (req, res) => {
  const id = req.query;
  const { title, description, image, category, price, rating } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, image, category, price, rating },
      { new: true }
    );
    if (!product) {
      return res.status(400).json({ error: `Product doesn't exist` });
    }
    return res
      .status(200)
      .json({ message: `Product updated successfully`, data: product });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.query;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ error: `Product doesn't exist` });
    }
    return res
      .status(200)
      .json({ message: `Product deleted successfully`, data: product });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsByFilters,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
