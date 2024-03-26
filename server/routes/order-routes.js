const { addOrder, getOrderById } = require("../controllers/order-controller");

const express = require("express");
const router = express.Router();

router.route("/addOrder").post(addOrder);
router.route("/order?:id").get(getOrderById);

module.exports = router;
