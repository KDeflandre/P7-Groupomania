const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Routage
router.get("/:id", auth, userCtrl.findOneUser);
router.put("/:id", auth, multer, userCtrl.modifyUser);
router.delete("/:id", auth, multer, userCtrl.deleteUser);


module.exports = router;