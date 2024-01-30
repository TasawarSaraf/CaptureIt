require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // For parsing application/json
app.use(cors());

// Configure Mongoose Connection connection

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected successfully'))
   .catch(err => console.error('MongoDB connection error:', err));



// Defining connection
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});

/**-----SignUp and Login Routes ------- */

app.post('/signup', async (req, res) => {
  try {
    const { username, firstName, lastName, formattedEmail, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the database
    const newUser = new User({
      username,
      email: formattedEmail,
      passwordHash: hashedPassword,
      firstName,
      lastName
    });

    const result = await newUser.save();

    console.log(result);
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error("Log", error);
    res.status(500).send('Error occurred');
  }
});


app.post('/login', async (req, res) => {
  try {
    const { formattedUsername, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ username: formattedUsername });

    if (!user) {
      return res.status(401).send('User not found.');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).send('Password Invalid');
    }

    // Generate a token valid for 24 hours
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error has occurred within login");
  }
});


/**Profile page */

/**Grab info from the User */

app.get('/user/:username', async(req,res)=>{
  try{
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    // Simple error checking
    if (!user) {
      return res.status(404).send('User not found.');
    }
    // Send all details of that user for the frontend to use
    res.json(user);
    
  } catch(error){
    res.status(500).send("Server error");
  }
})

app.get('/posts/:username', async (req, res) => {
  try {
    const username = req.params.username;
    // Find the user to get their ObjectId
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find posts by the ObjectId of the user
    const posts = await Post.find({ user: user._id });

    if (posts.length === 0) {
      return res.status(404).send('Posts not found');
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});




/**Update/Posts  */


app.post('/post/:username', async (req, res) => {

  
  try {
    const { username, photoUrl, caption, location } = req.body;

    const newPost = new Post({
      userId,
      photoUrl,
      caption,
      location
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
});


// In your Express server (e.g., server.js)
app.put('/user/:username/bio', async (req, res) => {
  try {
    const username = req.params.username;
    const { bio } = req.body; 

    const user = await User.findOneAndUpdate(
      { username: username },
      { bio: bio },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
