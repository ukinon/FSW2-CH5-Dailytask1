const router = require("express").Router();

const Product = require("../controller/productController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");

router.post("/", upload.single("image"), Product.createProduct);
router.get("/", autentikasi, checkRole("Owner"), Product.findProducts);
router.get("/:id", Product.findProductById);
router.patch(
  "/:id",
  autentikasi,
  checkOwnership.checkOwnership,
  Product.updateProduct
);
router.delete(
  "/:id",
  autentikasi,
  checkOwnership.checkOwnership,
  Product.deleteProduct
);

module.exports = router;
