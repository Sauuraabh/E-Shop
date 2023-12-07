//This is the starting point of the application

const serverConfig = require("./Configs/server.config");
const dbConfig = require("./Configs/db.config");
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

app.listen(serverConfig.PORT, () => {
  console.log("Sever started at PORT: ", serverConfig.PORT);
});

//Connecting to Database

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", () => {
  console.log("Connected to DB");
});
//Routes
require("./Routes/auth.route")(app);
require("./Routes/address.routes")(app);
require("./Routes/product.route")(app);
require("./Routes/order.routes")(app);
