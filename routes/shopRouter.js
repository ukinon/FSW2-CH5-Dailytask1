const router = require("express").Router();

const Shop = require("../controller/shopController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/", autentikasi, checkRole("Owner"), Shop.createShop);
router.get("/", Shop.findShops);
router.get("/:id", Shop.findShopById);
router.patch("/:id", autentikasi, checkRole("Owner"), Shop.updateShop);
router.delete("/:id", autentikasi, checkRole("Owner"), Shop.deleteShop);

module.exports = router;
