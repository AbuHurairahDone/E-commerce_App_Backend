const express = require("express");
const multer = require("multer");
const router = express.Router();
const AuthToken = require("../Authentication/AuthToken");
const createProduct = require("../controllers/createProduct");
const getProduct = require("../controllers/getProduct");
const updateProduct = require("../controllers/updateProduct");
const deleteProduct = require("../controllers/deleteProduct");
const getAllProducts = require("../controllers/getAllProducts");

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router
  .route("/product/create")
  .post(AuthToken, upload.single("productPic"), createProduct);
router.route("/product/get").get(AuthToken, getProduct);
router
  .route("/product/Update")
  .put(AuthToken, upload.single("productPic"), updateProduct);
router.route("/product/delete").delete(AuthToken, deleteProduct);

router.route("/products").get(AuthToken, getAllProducts);
module.exports = router;
