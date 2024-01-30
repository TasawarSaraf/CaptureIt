const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photoURL: { type: String, required: true },
    caption: String,
    location: String,
    postDate: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);
