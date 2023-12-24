const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const commentSchema = new mongoose.Schema({
    text: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    // Additional fields if needed
});

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Post, Comment };
