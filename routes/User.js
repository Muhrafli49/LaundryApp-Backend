const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { validateInput, validationRegistrasi, validationLogin} = require('../validator');
const middleware = require("../middleware/index");

// route untuk registrasi
router.post("/registrasi", validationRegistrasi, validateInput, userController.registrasi);

// route untuk login
router.post("/login", validationLogin,  validateInput, userController.login);

// route untuk user
router.get("/user", middleware, userController.getUser );

module.exports = router;