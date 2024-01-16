const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/social', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
  

app.post('/api/register', async (req, res) => {
    try {
      const { username, email, password, name } = req.body;
  
      if (!username || !email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const newUser = new User({ username, email, password, name });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  // Your server-side login route

app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const user = await User.findOne({ username, password });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Send back user data upon successful login
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Add this after the userSchema definition in your server file

// Add this after the existing '/api/register' and '/api/login' routes
app.post('/api/createPost', async (req, res) => {
    const {userId, desc, img } = req.body;
    console.log(userId)
     
    try {
      const {userId, desc, img } = req.body;
  
      if (!userId || !desc) {
        return res.status(400).json({ message: 'User ID and description are required' });
      }
  
      const newPost = new Post({ userId, desc, img });
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const postSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    desc: String,
    img: String,
  });
  
  const Post = mongoose.model('Post', postSchema);

  app.post('/api/getPosts', async (req, res) => {
    try {
      const posts = await Post.find();  
      res.json({ posts})
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/api/deletePost/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Delete the post from the database
      await Post.findByIdAndDelete(postId);
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


    


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
