import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Elements/Nav';
import StarBackground from '../Components/Elements/StarBackground';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://nvstech-backend.onrender.com/api/posts/${id}`);
      if (response.data.success) {
        setPost(response.data.data);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post. Please try again later.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <StarBackground />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-[400px] bg-gray-800/30 backdrop-blur-sm rounded-xl mb-8 border border-gray-700/50"></div>
              <div className="h-8 bg-gray-800/30 backdrop-blur-sm rounded-lg w-3/4 mx-auto mb-4 border border-gray-700/50"></div>
              <div className="h-4 bg-gray-800/30 backdrop-blur-sm rounded-lg w-1/2 mx-auto mb-8 border border-gray-700/50"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50"></div>
                <div className="h-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50"></div>
                <div className="h-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Nav />
        <StarBackground />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] animate-gradient">
              {error || 'Post not found'}
            </h2>
            <div className="mt-6">
              <button 
                onClick={() => navigate('/blog')}
                className="text-gray-300 hover:text-[#0A647A] font-medium transition-colors duration-300"
              >
                ← Back to Blog
              </button>
              {error && (
                <button 
                  onClick={fetchPost}
                  className="ml-6 text-gray-300 hover:text-[#0A647A] font-medium transition-colors duration-300"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <StarBackground />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/blog')}
            className="mb-8 text-gray-300 hover:text-[#0A647A] font-medium inline-flex items-center transition-colors duration-300"
          >
            <span className="mr-2">←</span> Back to Blog
          </button>
          
          <article className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:border-[#0A647A]/50">
            {post.imageUrl && (
              <div className="relative">
                <img 
                  src={`https://nvstech-backend.onrender.com${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-400 mb-4 flex-wrap">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] capitalize font-medium">{post.category}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] mb-6 animate-gradient">{post.title}</h1>
              
              <div className="prose prose-lg max-w-none prose-invert">
                <div className="text-gray-300 whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
