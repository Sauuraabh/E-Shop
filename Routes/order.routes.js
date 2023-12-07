const orderController = require("../Controllers/order.controller");
const { authMiddleware } = require("../Middlewares");

module.exports = function (app) {
  app.post(
    "/eshop/api/v1/auth/order",
    authMiddleware.verifyToken,
    authMiddleware.isUser,
    orderController.createOrder
  );
};
