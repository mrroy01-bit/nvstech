import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../../Components/Elements/Nav';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Load post from localStorage
    const posts = JSON.parse(localStorage.getItem('blog-posts')) || [];
    const currentPost = posts.find(p => p.id === parseInt(id));
    
    if (currentPost) {
      setPost(currentPost);
      // Find related posts in the same category
      const related = posts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);

  if (!post) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Post not found</h2>
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
      <article className="post-container">
        <div className="post-header">
          <img 
            src={post.imagePreview || post.imageUrl} 
            alt={post.title}
            className="post-featured-image"
          />
          <div className="post-meta">
            <div className="post-category">{post.category}</div>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-info">
              <span>{post.date}</span>
              <span className="separator">•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        <div className="post-content">
          <div className="content-wrapper">
            {post.content}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h2>Related Posts</h2>
            <div className="related-posts-grid">
              {relatedPosts.map(relatedPost => (
                <div 
                  key={relatedPost.id} 
                  className="related-post-card"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <img 
                    src={relatedPost.imagePreview || relatedPost.imageUrl} 
                    alt={relatedPost.title}
                  />
                  <div className="related-post-info">
                    <h3>{relatedPost.title}</h3>
                    <p>{relatedPost.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="post-navigation">
          <button 
            onClick={() => navigate('/blog')}
            className="back-button"
          >
            ← Back to Blog
          </button>
        </div>
      </article>
    </>
  );
};

export default Post;
