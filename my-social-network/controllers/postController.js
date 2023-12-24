const { Post, Comment } = require('../models/post');

module.exports = {
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;

            // Input validation
            if (!title || !content) {
                return res.status(400).json({ error: 'Title and content are required' });
            }

            const post = await Post.create({ title, content });
            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getPosts: async (req, res) => {
        try {
            // Use populate to fetch associated comments
            const posts = await Post.find().populate('comments');
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Other controllers as needed.
};
