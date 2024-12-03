const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Create a new post
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { title, content, category } = req.body;
        
        const post = new Post({
            title,
            content,
            category,
            author: 'Admin' // You can get this from auth token later
        });

        // If image was uploaded, add it to the post
        if (req.file) {
            post.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await post.save();

        // Don't send image data in response
        const postResponse = post.toObject();
        if (postResponse.image) {
            postResponse.imageUrl = `/api/posts/${post._id}/image`;
            delete postResponse.image;
        }

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: postResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        
        // Transform posts to include image URLs instead of raw data
        const transformedPosts = posts.map(post => {
            const postObj = post.toObject();
            if (postObj.image) {
                postObj.imageUrl = `/api/posts/${post._id}/image`;
                delete postObj.image;
            }
            return postObj;
        });

        res.status(200).json({
            success: true,
            data: transformedPosts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching posts',
            error: error.message
        });
    }
});

// Get a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Transform post to include image URL instead of raw data
        const postObj = post.toObject();
        if (postObj.image) {
            postObj.imageUrl = `/api/posts/${post._id}/image`;
            delete postObj.image;
        }

        res.status(200).json({
            success: true,
            data: postObj
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching post',
            error: error.message
        });
    }
});

// Get post image
router.get('/:id/image', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || !post.image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.set('Content-Type', post.image.contentType);
        res.send(post.image.data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching image',
            error: error.message
        });
    }
});

// Update a post
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const updateData = {
            title,
            content,
            category
        };

        // If new image was uploaded, update the image data
        if (req.file) {
            updateData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Transform response to include image URL instead of raw data
        const postResponse = post.toObject();
        if (postResponse.image) {
            postResponse.imageUrl = `/api/posts/${post._id}/image`;
            delete postResponse.image;
        }

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: postResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating post',
            error: error.message
        });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting post',
            error: error.message
        });
    }
});

module.exports = router;
