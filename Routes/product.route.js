const productController = require("../Controllers/product.controller");
const { authMiddleware } = require("../Middlewares");

module.exports = function (app) {
  app.post(
    "/eshop/api/v1/auth/saveproduct",
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    productController.saveProduct
  );
  app.get("/eshop/api/v1/findproduct", productController.findAllProducts);
  app.get(
    "/eshop/api/v1/getproductcategory",
    productController.getProductCategory
  );
  app.get("/eshop/api/v1/getproducts/:id", productController.getProductById);
  app.put(
    "/eshop/api/v1/updateproduct/:id",
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    productController.updateProductInfo
  );
  app.delete(
    "/eshop/api/v1/deleterestaurant/:id",
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    productController.deleteProduct
  );
};
