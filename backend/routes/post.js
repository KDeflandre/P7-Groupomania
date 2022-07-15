// Import
const express = require('express');
const router = express.Router();

const multer= require('../middleware/multer-config');
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/posts');

// // Routage
router.post("/", auth, multer, postCtrl.createPost);
// router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.get("/", auth, postCtrl.findAllPosts);
// router.get("/users/:id", auth, postCtrl.findAllPostsForOne);
router.get("/:id", auth, postCtrl.findOnePost);
router.delete("/:id", auth, postCtrl.deletePost);

// router.post('/', auth, multer, sauceCtrl.createSauce);
// router.post('/:id/like', auth, sauceCtrl.likeSauce);
// router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);
// router.get('/', auth, sauceCtrl.getSauce);
// router.get('/:id', auth, sauceCtrl.getSauceId);

module.exports = router;