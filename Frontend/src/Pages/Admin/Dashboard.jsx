import React, { useState, useEffect } from 'react';
import { 
  FaRegNewspaper, 
  FaChartBar, 
  FaRegFile,
  FaPalette,
  FaBrush,
  FaCog,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';
import NewPost from './NewPost';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('posts');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError('Error fetching posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (postData) => {
    try {
      setShowNewPost(false);
      await fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error handling new post:', error);
    }
  };

  const handleEditPost = async (postData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/posts/${postData._id}`, postData);
      if (response.data.success) {
        setEditingPost(null);
        await fetchPosts(); // Refresh the posts list
      }
    } catch (error) {
      console.error('Error editing post:', error);
      setError('Failed to edit post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/posts/${postId}`);
        if (response.data.success) {
          await fetchPosts(); // Refresh the posts list
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post');
      }
    }
  };

  const menuItems = [
    { id: 'posts', icon: <FaRegNewspaper />, label: 'Posts' },
    { id: 'stats', icon: <FaChartBar />, label: 'Stats' },
    { id: 'pages', icon: <FaRegFile />, label: 'Pages' },
    { id: 'layout', icon: <FaPalette />, label: 'Layout' },
    { id: 'theme', icon: <FaBrush />, label: 'Theme' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="dashboard-container text-black">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="new-post-button" onClick={() => setShowNewPost(true)}>
          <FaPlus style={{ marginRight: '8px' }} />
          NEW POST
        </button>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="menu-item-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-bar">
            <FaSearch style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#5f6368'
            }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search posts"
            />
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="loading-state">Loading posts...</div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchPosts}>Retry</button>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <img src="/pencil-icon.png" alt="No posts" />
            <h3>No posts</h3>
            <p>Posts you create will show up here</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post._id} className="post-card">
                {post.imageUrl && (
                  <img 
                    src={`http://localhost:8080${post.imageUrl}`} 
                    alt={post.title} 
                    className="post-image" 
                  />
                )}
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p className="post-category">{post.category}</p>
                  <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                  <div className="post-meta">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="separator">•</span>
                    <span>{post.author}</span>
                    <div className="post-actions">
                      <button 
                        className="edit-button"
                        onClick={() => setEditingPost(post)}
                        title="Edit post"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeletePost(post._id)}
                        title="Delete post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New/Edit Post Modal */}
      {(showNewPost || editingPost) && (
        <NewPost
          post={editingPost}
          onClose={() => {
            setShowNewPost(false);
            setEditingPost(null);
          }}
          onSave={editingPost ? handleEditPost : handleNewPost}
        />
      )}
    </div>
  );
};

export default Dashboard;