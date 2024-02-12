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


/**Get the list of posts from the homepage*/
app.get('/feed', async (req, res) => {
  try {
    // Fetch all posts and populate the 'user' field to include user details
    // Sort by 'postDate' in descending order
    // Adjust the fields you want from 'User'
    const posts = await Post.find({}).populate('user', 'username').sort('-postDate');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});


/**getting posts of the user */

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






/**Posting post based on username  */


app.post('/post/:username', async (req, res) => {  
  try {
    const {photoUrl, caption, location } = req.body;

    const username = req.params.username;

    const user = await User.findOne({username: username});

    if (!user) {
      return res.status(404).send('User not found');
    }

    const userId = user.id;

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



/** Liking and Unliking Photo */

app.post('/post/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const userId = req.body.userId; // Assuming the user's ID is sent in the request body

  try {
      const post = await Post.findById(postId);

      if (!post) {
          return res.status(404).send('Post not found');
      }

      // Check if the user has already liked the post
      const index = post.likes.indexOf(userId);

      if (index === -1) {
          // If the user has not liked the post meanign couldn't find their ID , then push it
          post.likes.push(userId);
      } else {
           // The user has already liked the post, so unlike it by removing the user's ID from the likes array.
          post.likes.splice(index, 1);
      }

      await post.save();
      res.status(200).json(post);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error processing like/unlike');
  }
});



app.post('/user/:id/follow', async (req, res) => {
  const userId = req.body.userId; // The ID of the user who is performing the follow action
  const targetUserId = req.params.id; // The ID of the user to be followed

  if(userId === targetUserId){
    return res.status(400).send("Users cannot follow themselves.");
  }

  try {
    // Add target user to the current user's following array
    await User.findByIdAndUpdate(userId, 
      { $addToSet: { following: targetUserId } }, // Prevents duplicate entries
      { new: true });

    // Add current user to the target user's followers array
    await User.findByIdAndUpdate(targetUserId, 
      { $addToSet: { followers: userId } }, // Prevents duplicate entries
      { new: true });

    res.status(200).send("Followed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing follow');
  }
});




app.post('/user/:id/unfollow', async (req, res) => {
  const userId = req.body.userId; // The ID of the user who is performing the unfollow action
  const targetUserId = req.params.id; // The ID of the user to be unfollowed

  try {
    // Remove target user from the current user's following array
    await User.findByIdAndUpdate(userId, 
      { $pull: { following: targetUserId } },
      { new: true });

    // Remove current user from the target user's followers array
    await User.findByIdAndUpdate(targetUserId, 
      { $pull: { followers: userId } },
      { new: true });

    res.status(200).send("Unfollowed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing unfollow');
  }
});






