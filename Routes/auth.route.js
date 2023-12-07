const authController = require("../Controllers/auth.controller");

module.exports = function (app) {
  app.post("/eshop/api/v1/auth/signup", authController.signup);

  app.post("/eshop/api/v1/auth/signin", authController.signin);
};
