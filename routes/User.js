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

// route untuk mendapatkan seluruh user
router.get("/user/all", userController.getAllUser );

// route untuk mengupdate data user berdasarkan id
router.put("/user/edit/:id", userController.updateUser );

// route untuk menghapus data user berdasarkan id
router.delete('/user/delete/:id', userController.deleteUserById);

module.exports = router;