const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  firstName: {type:String, required:true},
  lastName: {type: String, required: true},
  profilePicture: String,
  bio: String,
  joinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
