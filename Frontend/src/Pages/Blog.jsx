import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Components/Elements/Nav'

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/posts');
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

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id='blog'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
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
                      src={`http://localhost:8080${post.imageUrl}`}
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
                    <button 
                      onClick={() => handleReadMore(post._id)}
                      className="text-[#0A647A] hover:text-[#085466] font-medium inline-flex items-center"
                    >
                      Read more <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
