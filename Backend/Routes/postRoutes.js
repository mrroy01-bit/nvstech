const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const mongoose = require('mongoose');
const multer = require('multer');

// Middleware for error handling
const handleServerError = (res, error, customMessage = 'Server error') => {
    console.error('Server Error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
    });

    res.status(500).json({
        success: false,
        message: customMessage,
        error: {
            message: error.message,
            name: error.name
        }
    });
};

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
        console.log('Creating Post - Start');
        
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

        console.log('Post Created:', {
            title: post.title,
            content: post.content,
            category: post.category
        });

        await post.save();

        console.log('Post Saved:', {
            id: post._id,
            title: post.title
        });

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
        // Log full error details
        console.error('Error Creating Post:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error creating post');
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        console.log('Fetching posts - Start');
        
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection is not established');
            return res.status(500).json({
                success: false,
                message: 'Database connection is not established'
            });
        }

        // Log database connection details
        console.log('Mongoose Connection State:', mongoose.connection.readyState);
        console.log('Database Name:', mongoose.connection.db?.databaseName);

        // Fetch posts with detailed logging
        const posts = await Post.find().sort({ createdAt: -1 });
        
        console.log('Posts Fetched:', {
            count: posts.length,
            firstPost: posts[0]
        });
        
        // Transform posts to include image URLs instead of raw data
        const transformedPosts = posts.map(post => {
            const postObj = post.toObject();
            if (postObj.image) {
                postObj.imageUrl = `/api/posts/${post._id}/image`;
                delete postObj.image;
            }
            return postObj;
        });

        console.log('Transformed Posts:', {
            count: transformedPosts.length,
            firstPost: transformedPosts[0]
        });

        res.status(200).json({
            success: true,
            data: transformedPosts
        });
    } catch (error) {
        // Log full error details
        console.error('Error Fetching Posts:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error fetching posts');
    }
});

// Get a single post
router.get('/:id', async (req, res) => {
    try {
        console.log('Fetching Post - Start');
        
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        console.log('Post Fetched:', {
            id: post._id,
            title: post.title
        });

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
        // Log full error details
        console.error('Error Fetching Post:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error fetching post');
    }
});

// Get post image
router.get('/:id/image', async (req, res) => {
    try {
        console.log('Fetching Post Image - Start');
        
        const post = await Post.findById(req.params.id);
        if (!post || !post.image) {
            console.log('Post Image Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        console.log('Post Image Fetched:', {
            id: post._id,
            contentType: post.image.contentType
        });

        res.set('Content-Type', post.image.contentType);
        res.send(post.image.data);
    } catch (error) {
        // Log full error details
        console.error('Error Fetching Post Image:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error fetching image');
    }
});

// Update a post
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        console.log('Updating Post - Start');
        
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

        console.log('Post Updated:', {
            id: req.params.id,
            title: updateData.title,
            content: updateData.content,
            category: updateData.category
        });

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        console.log('Post Updated Successfully:', {
            id: post._id,
            title: post.title
        });

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
        // Log full error details
        console.error('Error Updating Post:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error updating post');
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        console.log('Deleting Post - Start');
        
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        console.log('Post Deleted Successfully:', {
            id: post._id,
            title: post.title
        });

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        // Log full error details
        console.error('Error Deleting Post:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error deleting post');
    }
});

// Increment view count
router.post('/:id/view', async (req, res) => {
    try {
        console.log('Incrementing View Count - Start');
        
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        console.log('View Count Incremented Successfully:', {
            id: post._id,
            views: post.views
        });

        res.status(200).json({
            success: true,
            data: { views: post.views }
        });
    } catch (error) {
        // Log full error details
        console.error('Error Incrementing View Count:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error updating view count');
    }
});

// Toggle like
router.post('/:id/like', async (req, res) => {
    try {
        console.log('Toggling Like - Start');
        
        const { userId } = req.body;
        if (!userId) {
            console.log('User ID Not Provided');
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex === -1) {
            // Like the post
            post.likes.push(userId);
        } else {
            // Unlike the post
            post.likes.splice(likeIndex, 1);
        }

        console.log('Like Toggled Successfully:', {
            id: post._id,
            likes: post.likes.length
        });

        await post.save();

        res.status(200).json({
            success: true,
            data: {
                likes: post.likes.length,
                isLiked: likeIndex === -1
            }
        });
    } catch (error) {
        // Log full error details
        console.error('Error Toggling Like:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error toggling like');
    }
});

// Add comment
router.post('/:id/comment', async (req, res) => {
    try {
        console.log('Adding Comment - Start');
        
        const { userId, content } = req.body;
        if (!userId || !content) {
            console.log('User ID or Content Not Provided');
            return res.status(400).json({
                success: false,
                message: 'User ID and content are required'
            });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        post.comments.push({
            content,
            author: userId
        });

        console.log('Comment Added Successfully:', {
            id: post._id,
            comments: post.comments.length
        });

        await post.save();

        // Populate the author details for the new comment
        const populatedPost = await Post.findById(post._id)
            .populate('comments.author', 'name email');

        res.status(200).json({
            success: true,
            data: populatedPost.comments[populatedPost.comments.length - 1]
        });
    } catch (error) {
        // Log full error details
        console.error('Error Adding Comment:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error adding comment');
    }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
    try {
        console.log('Fetching Comments - Start');
        
        const post = await Post.findById(req.params.id)
            .populate('comments.author', 'name email');

        if (!post) {
            console.log('Post Not Found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        console.log('Comments Fetched Successfully:', {
            id: post._id,
            comments: post.comments.length
        });

        res.status(200).json({
            success: true,
            data: post.comments
        });
    } catch (error) {
        // Log full error details
        console.error('Error Fetching Comments:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });

        handleServerError(res, error, 'Error fetching comments');
    }
});

// Get post statistics
router.get('/stats', async (req, res) => {
    try {
        console.log('Fetching Post Statistics - Start');
        
        // Validate database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection is not established');
            return res.status(500).json({
                success: false,
                message: 'Database connection is not established'
            });
        }

        // Log database connection details
        console.log('Mongoose Connection State:', mongoose.connection.readyState);
        console.log('Database Name:', mongoose.connection.db?.databaseName);

        // Get total posts count
        const totalPosts = await Post.countDocuments();

        console.log('Total Posts:', totalPosts);

        // Get posts by category
        const postsByCategory = await Post.aggregate([
            { 
                $group: { 
                    _id: { 
                        $ifNull: ['$category', 'Uncategorized'] 
                    }, 
                    count: { $sum: 1 } 
                } 
            }
        ]);

        console.log('Posts By Category:', postsByCategory);

        // Get total views
        const totalViews = await Post.aggregate([
            { 
                $group: { 
                    _id: null, 
                    total: { 
                        $sum: { 
                            $ifNull: ['$views', 0] 
                        } 
                    } 
                } 
            }
        ]);

        console.log('Total Views:', totalViews[0]?.total);

        // Get total likes
        const totalLikes = await Post.aggregate([
            { 
                $group: { 
                    _id: null, 
                    total: { 
                        $sum: { 
                            $size: { 
                                $ifNull: ['$likes', []] 
                            } 
                        } 
                    } 
                } 
            }
        ]);

        console.log('Total Likes:', totalLikes[0]?.total);

        // Get total comments
        const totalComments = await Post.aggregate([
            { 
                $group: { 
                    _id: null, 
                    total: { 
                        $sum: { 
                            $size: { 
                                $ifNull: ['$comments', []] 
                            } 
                        } 
                    } 
                } 
            }
        ]);

        console.log('Total Comments:', totalComments[0]?.total);

        // Get posts by month
        const postsByMonth = await Post.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: { $ifNull: ['$createdAt', new Date()] } },
                        month: { $month: { $ifNull: ['$createdAt', new Date()] } }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);

        console.log('Posts By Month:', postsByMonth);

        // Get most viewed posts
        const mostViewedPosts = await Post.find()
            .sort({ views: -1 })
            .limit(5)
            .select('title views')
            .lean()
            .exec();

        console.log('Most Viewed Posts:', mostViewedPosts);

        // Get most liked posts
        const mostLikedPosts = await Post.aggregate([
            {
                $project: {
                    title: 1,
                    likeCount: { 
                        $size: { 
                            $ifNull: ['$likes', []] 
                        } 
                    }
                }
            },
            { $sort: { likeCount: -1 } },
            { $limit: 5 }
        ]);

        console.log('Most Liked Posts:', mostLikedPosts);

        // Format the response with default values
        const response = {
            totalPosts: totalPosts || 0,
            postsByCategory: postsByCategory || [],
            totalViews: totalViews[0]?.total || 0,
            totalLikes: totalLikes[0]?.total || 0,
            totalComments: totalComments[0]?.total || 0,
            postsByMonth: postsByMonth || [],
            mostViewedPosts: mostViewedPosts.map(post => ({
                ...post,
                views: post.views || 0
            })),
            mostLikedPosts: mostLikedPosts.map(post => ({
                ...post,
                likeCount: post.likeCount || 0
            }))
        };

        console.log('Post Statistics:', response);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Stats Endpoint Error:', {
            message: error.message,
            stack: error.stack
        });

        handleServerError(res, error, 'Error fetching statistics');
    }
});

module.exports = router;
