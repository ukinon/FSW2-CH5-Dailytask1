const router = require("express").Router();

const Auth = require("../controller/authController");

const autentikasi = require("../middlewares/authenticate");
const checkOwnership = require("../middlewares/checkOwnership");

router.post(
  "/register",
  autentikasi,
  checkOwnership.checkShopOwnerByRequest,
  Auth.register
);
router.post("/login", Auth.login);
router.get("/", autentikasi, Auth.checkToken);

module.exports = router;
