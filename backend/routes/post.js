// Import
const express = require('express');
const router = express.Router();

const multer= require('../middleware/multer-config');
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/posts');

// // Routage
router.post("/", auth, multer, postCtrl.createPost);
router.post('/:id/like', auth, postCtrl.likePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.get("/", auth, postCtrl.findAllPosts);
router.get("/:id", auth, postCtrl.findOnePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;