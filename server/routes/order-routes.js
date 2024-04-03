const {
  addOrder,
  getOrderById,
  deleteCompleteOrder,
  deleteProductFromOrder,
} = require("../controllers/order-controller");
//const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/addOrder").post(addOrder);
router.route("/order?:id").get(getOrderById).delete(deleteCompleteOrder);
router.route("/product?:id").delete(deleteProductFromOrder);

module.exports = router;
