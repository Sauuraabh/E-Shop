const shippingController = require("../Controllers/shipping.controller");
const { authMiddleware } = require("../Middlewares");

module.exports = function (app) {
  app.post(
    "/eshop/api/v1/auth/addaddress",
    authMiddleware.verifyToken,
    shippingController.addAddress
  );
};
