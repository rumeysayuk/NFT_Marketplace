const express = require("express")
const {getAllPosts, addPost, addComment, likeUndoLikeComment} = require("../controllers/postsContoller");
const router = express.Router();
const postImageUpload = require("../middlewares/lib/postImageUpload");

router.post("/addpost", postImageUpload.single("imageUrl"), addPost);
router.post("/addcomment", addComment);
router.post("/likeundolikecomment", likeUndoLikeComment);

module.exports = router;