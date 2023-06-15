const Post = require("../models/Post")
const CustomError = require("../helpers/error/CustomError");
const User = require('../models/User');
const mongoose = require("mongoose");
const asyncErrorWrapper = require("express-async-handler");

const getAllPosts = asyncErrorWrapper(async (req, res) => {
    const posts = await Post.find().populate("postedBy").populate("comments.postedBy").populate("comments.likes.likedBy")
    // post.populate("comments.postedBy").execPopulate().then(response=>{
    //     return res.status(201).json({message: "yorum başarılı", data: response.comments})
    // })
    return res.status(200).json({
        success: true,
        data: posts
    })
})

const addPost = asyncErrorWrapper(async (req, res) => {
    console.log(req.body)
    const post = await Post.create({
        ...req.body,
        imageUrl: `http://localhost:5000/postImages/${req.savedPostImage}`,
    });
    post.save().then(() => {
        res.status(201).json({
            message: "created post succesfully",
            post,
        });
    })
})

const addComment = asyncErrorWrapper(async (req, res) => {
    const {text, postedBy, postId} = req.body;
    // if(!mongoose.Types.ObjectId.isValid(postedBy)) return res.status(404).send(`Bu Id'ye uygun kullanıcı bulunamadı.. ${postedBy}`);

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).send(`Bu Id'ye uygun kullanıcı bulunamadı.. ${postedBy}`);

    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`Bu Id'ye uygun post bulunamadı.. ${postId}`);
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send(`Bu Id'ye uygun post bulunamadı.. ${postId}`);

    post.comments.push({text, postedBy})
    post.save();

    post.populate("comments.postedBy").execPopulate().then(response => {
        return res.status(201).json({message: "yorum başarılı", data: response.comments})
    })
})

const likeUndoLikeComment = asyncErrorWrapper(async (req, res) => {
    const {postId, commentId, likedBy} = req.body;
    if (!mongoose.Types.ObjectId.isValid(likedBy)) return res.status(404).send(`Bu Id'ye uygun kullanıcı bulunamadı.. ${likedBy}`);
    const user = await User.findById(likedBy);
    if (!user) return res.status(404).send(`Bu Id'ye uygun kullanıcı bulunamadı.. ${likedBy}`);
    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`Bu Id'ye uygun post bulunamadı.. ${postId}`);
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send(`Bu Id'ye uygun post bulunamadı.. ${postId}`);


    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId.toString())
    if (commentIndex === -1) {
        return res.status(404).send(`Bu Id'ye uygun yorum bulunamadı.. ${commentId}`);
    }

    const index = post.comments[commentIndex].likes.findIndex(like => like.likedBy.toString() === likedBy.toString());

    if (index === -1) {
        post.comments[commentIndex].likes.push({likedBy: likedBy});
    } else {
        post.comments[commentIndex].likes = post.comments[commentIndex].likes.filter(like => like.likedBy._id.toString() !== likedBy.toString())
    }

    post.save();
    post.populate("comments.postedBy").populate("comments.likes.likedBy").execPopulate().then(response => {
        return res.status(201).json({message: "yorum başarılı", data: response.comments})
    })
})

module.exports = {
    getAllPosts,
    addPost,
    addComment,
    likeUndoLikeComment
}