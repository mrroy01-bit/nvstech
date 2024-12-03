import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../Components/Elements/Nav';

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Post not found</h2>
            <button 
              onClick={() => navigate('/blog')}
              className="mt-4 text-[#0A647A] hover:text-[#085466] font-medium"
            >
              ← Back to Blog
            </button>
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
            className="mb-8 text-[#0A647A] hover:text-[#085466] font-medium"
          >
            ← Back to Blog
          </button>
          
          <article>
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
                {post.category && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-[#0A647A] capitalize">{post.category}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="mt-6 text-gray-700">
                {post.content || post.excerpt}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
