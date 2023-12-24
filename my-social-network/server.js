const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const authRoutes = require('./auth.routes');

const multer = require('multer');
const upload = multer({ dest: 'my-social-network/img' }); // Указываем папку для сохранения загруженных файлов

mongoose.connect('mongodb://127.0.0.1:27017/my-social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Подключение к MongoDB успешно!');
    })
    .catch((error) => {
        console.error('Ошибка подключения к MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, unique: true, required: true },
    number: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    img: { type: String }
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email , age, number,  password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user in the database with the hashed password
        const newUser = await User.create({ username,email,age,number,  password: hashedPassword });
        res.json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/profile/:username/posts', async (req, res) => {
    const { username } = req.params;

    try {
        const posts = await Post.find({ username });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ username });

        if (user) {
            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = req.file.path; // Путь к загруженному файлу
    // Добавьте логику сохранения imagePath в базе данных, например, в поле img пользователя

    res.json({ message: 'File uploaded successfully', imagePath });
});

app.get('/api/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (user) {
            // Возвращаем только нужные данные, не включая пароль
            const userData = {
                username: user.username,
                email: user.email,
                age: user.age,
                number: user.number,
            };

            res.json(userData);
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

const commentSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,
    content: String,
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/', (req, res) => {
    res.send('Привет, мир!');
});

app.get('/qwe', (req, res) => {
    res.send('qwee!');
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        await Post.findByIdAndDelete(postId);
        res.status(204).send(); // No content on successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

// Get comments for a post
app.get('/api/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.find({ postId });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

// Create a comment
app.post('/api/posts/comments', async (req, res) => {
    const { postId, content } = req.body;

    try {
        const newComment = new Comment({ postId, content });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
});

// Delete a comment
app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(204).send(); // No content on successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

app.get('/api/profile/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (user) {
            const userProfile = {
                username: user.username,
            };

            res.json(userProfile);
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

app.use((req, res, next) => {
    console.log(`Получен запрос: ${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
