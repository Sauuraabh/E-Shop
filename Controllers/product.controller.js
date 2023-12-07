// File with all the functions related to products
const Product = require("../Models/product.model");

//Function to save Product in Database
exports.saveProduct = async (req, res) => {
  try {
    const saveProductReq = {
      productId: req.body.productId,
      name: req.body.name,
      availableItems: req.body.availableItems,
      category: req.body.category,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    };
    // Save the product to the database
    const savedProduct = await Product.create(saveProductReq);

    // Return the saved product in the response
    res.status(201).json(savedProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error while saving product" });
  }
};

//Function to search all the products in Database and filter data using queries

exports.findAllProducts = async (req, res) => {
  try {
    // Default values
    const defaultValues = {
      category: "",
      direction: "DESC",
      name: "",
      sortBy: "productId",
    };

    // Extract query parameters from the request and apply default values if necessary
    const {
      category = defaultValues.category,
      direction = defaultValues.direction,
      name = defaultValues.name,
      sortBy = defaultValues.sortBy,
    } = req.query;

    // Validate direction query parameter
    if (direction !== "ASC" && direction !== "DESC") {
      return res
        .status(400)
        .send({ message: "Direction should be either ASC or DESC." });
    }

    // Construct the query object based on provided parameters
    const queryObj = {};
    if (category !== "") {
      queryObj.category = category;
    }
    if (name !== "") {
      queryObj.name = name;
    }

    // Fetch products based on the query object
    const products = await Product.find(queryObj).sort({ [sortBy]: direction });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Some error occurred while fetching the products.",
    });
  }
};

//Function to get Categories of all the Products

exports.getProductCategory = async (req, res) => {
  try {
    const getCategory = await Product.distinct("category");

    res.status(200).send(getCategory);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching Categories",
    });
  }
};

//Find products based on MongoDB ID
exports.getProductById = async (req, res) => {
  try {
    // Find product based on ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: `No Product found for ID - ${req.params.id}!`,
      });
    }

    // If product found, send the product details in the response
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Some error occurred while fetching Products by ID",
    });
  }
};

//Function to update product details
exports.updateProductInfo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    //Checking if product ID is valid
    if (!product) {
      return res.status(404).json({
        message: `No Product found for ID - ${req.params.id}!`,
      });
    }
    //Logic to update the product information
    product.productId =
      req.body.productId != undefined ? req.body.productId : product.productId;

    product.name = req.body.name != undefined ? req.body.name : product.name;

    product.availableItems =
      req.body.availableItems != undefined
        ? req.body.availableItems
        : product.availableItems;

    product.price =
      req.body.price != undefined ? req.body.price : product.price;

    product.category =
      req.body.category != undefined ? req.body.category : product.category;

    product.description =
      req.body.description != undefined
        ? req.body.description
        : product.description;

    product.imageUrl =
      req.body.imageUrl != undefined ? req.body.imageUrl : product.imageUrl;

    product.manufacturer =
      req.body.manufacturer != undefined
        ? req.body.manufacturer
        : product.manufacturer;

    //Saving updated product
    const updatedProduct = await product.save();
    return res.status(200).send(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Some error occurred while updating Product",
    });
  }
};

//Function to delete any product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id, // Create a query using the _id field
    });

    if (!deletedProduct) {
      return res.status(200).send({
        message: `No Product found for ID - ${req.params.id}!`,
      });
    }

    res.status(200).send({
      message: `Product with ID ${req.params.id} deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while deleting Product",
    });
  }
};
