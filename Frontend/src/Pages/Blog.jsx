import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Components/Elements/Nav'
import StarBackground from '../Components/Elements/StarBackground'
import { FaHeart, FaRegHeart, FaComment, FaEye } from 'react-icons/fa'

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  
  // TODO: Get actual user ID from authentication
  const currentUserId = '123'; // Temporary user ID for testing

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://nvstech-backend.onrender.com/api/posts');
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = async (postId) => {
    try {
      // Increment view count
      await axios.post(`https://nvstech-backend.onrender.com/api/posts/${postId}/view`);
      navigate(`/blog/${postId}`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`https://nvstech-backend.onrender.com/api/posts/${postId}/like`, {
        userId: currentUserId
      });
      if (response.data.success) {
        // Update posts state with new like status
        setPosts(posts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              likes: post.likes.includes(currentUserId)
                ? post.likes.filter(id => id !== currentUserId)
                : [...post.likes, currentUserId]
            };
          }
          return post;
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`https://nvstech-backend.onrender.com/api/posts/${selectedPost._id}/comment`, {
        userId: currentUserId,
        content: newComment
      });

      if (response.data.success) {
        // Update posts state with new comment
        setPosts(posts.map(post => {
          if (post._id === selectedPost._id) {
            return {
              ...post,
              comments: [...post.comments, response.data.data]
            };
          }
          return post;
        }));

        // Reset comment form
        setNewComment('');
        setShowCommentModal(false);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchPosts}
              className="px-4 py-2 bg-[#0A647A] text-white rounded hover:bg-[#085466]"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <StarBackground />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='blog'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B7892] sm:text-4xl">
              Our Blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Latest articles, news, and updates from our team
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-500">
              No blog posts available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {post.imageUrl && (
                    <img 
                      src={`process.env.VITE_BASE_URL${post.imageUrl}`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 flex-wrap mb-2">
                      <span>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                      {post.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-[#0A647A] capitalize">{post.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
                        : post.content}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleLike(post._id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                        >
                          {post.likes.includes(currentUserId) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                          <span>{post.likes.length}</span>
                        </button>
                        <button 
                          onClick={() => handleComment(post)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-[#0A647A]"
                        >
                          <FaComment />
                          <span>{post.comments.length}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <FaEye />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReadMore(post._id)}
                        className="text-[#0A647A] hover:text-[#085466] font-medium inline-flex items-center"
                      >
                        Read more <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 h-32"
              placeholder="Write your comment..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={submitComment}
                className="px-4 py-2 bg-[#0A647A] text-white rounded hover:bg-[#085466]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
