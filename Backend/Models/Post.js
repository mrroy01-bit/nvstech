const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['technology', 'lifestyle', 'travel', 'food']
    },
    image: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: String,
        required: true,
        default: 'Admin'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
