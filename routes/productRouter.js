const router = require("express").Router();

const Product = require("../controller/productController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");

router.post(
  "/",
  checkOwnership.checkShopOwner,
  upload.single("image"),
  Product.createProduct
);
router.get("/", autentikasi, checkRole("Owner"), Product.findProducts);
router.get("/:id", Product.findProductById);
router.patch(
  "/:id",
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  Product.updateProduct
);
router.delete(
  "/:id",
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  Product.deleteProduct
);

module.exports = router;
