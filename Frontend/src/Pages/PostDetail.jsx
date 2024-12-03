import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Elements/Nav';

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
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-[400px] bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {error || 'Post not found'}
            </h2>
            <div className="mt-6">
              <button 
                onClick={() => navigate('/blog')}
                className="text-[#0A647A] hover:text-[#085466] font-medium"
              >
                ← Back to Blog
              </button>
              {error && (
                <button 
                  onClick={fetchPost}
                  className="ml-6 text-[#0A647A] hover:text-[#085466] font-medium"
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/blog')}
            className="mb-8 text-[#0A647A] hover:text-[#085466] font-medium inline-flex items-center"
          >
            <span className="mr-2">←</span> Back to Blog
          </button>
          
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.imageUrl && (
              <img 
                src={`http://localhost:8080${post.imageUrl}`}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap">
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
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap">
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
