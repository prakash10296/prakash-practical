const { authJwt } = require("../middlewares");
const orders = require("../controllers/order.controller.js");
module.exports = app => {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new order
  router.post("/", orders.create);

  // Retrieve all orders
  router.get("/", orders.findAll);

  // Retrieve a single order with id
  router.get("/:id", orders.findOne);

  // Update a order with id
  router.put("/:id", orders.update);

  // Delete a order with id
  router.delete("/:id", orders.delete);

  // Create a new order
  router.delete("/", orders.deleteAll);

  app.use("/api/orders", [authJwt.verifyToken, authJwt.isUserOrAdmin], router);
};