const router = require("express").Router();

const Auth = require("../controller/authController");

const autentikasi = require("../middlewares/authenticate");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/", autentikasi, Auth.checkToken);

module.exports = router;
