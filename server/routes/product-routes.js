const {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProductsByFilters,
} = require("../controllers/product-controller");

//const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.route("/addProduct").post(addProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllProductsByFilters").get(getAllProductsByFilters);
router
  .route("/product?:id")
  .get(getProductById)
  .put(editProduct)
  .delete(deleteProduct);

module.exports = router;
