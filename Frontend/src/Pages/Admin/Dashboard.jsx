import React, { useState, useEffect } from 'react';
import { 
  FaRegNewspaper, 
  FaChartBar, 
  FaRegComments,
  FaDollarSign,
  FaRegFile,
  FaPalette,
  FaBrush,
  FaCog,
  FaPlus,
  FaSearch
} from 'react-icons/fa';
import './Dashboard.css';
import NewPost from './NewPost';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('posts');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load existing posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handleNewPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      author: 'Admin' // You can replace this with actual user data
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    // Save to localStorage
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  };

  const menuItems = [
    { id: 'posts', icon: <FaRegNewspaper />, label: 'Posts' },
    { id: 'stats', icon: <FaChartBar />, label: 'Stats' },
    { id: 'comments', icon: <FaRegComments />, label: 'Comments' },
    { id: 'earnings', icon: <FaDollarSign />, label: 'Earnings' },
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

        {/* Empty State or Posts List */}
        {posts.length === 0 ? (
          <div className="empty-state">
            <img src="/pencil-icon.png" alt="No posts" />
            <h3>No posts</h3>
            <p>Posts you create will show up here</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                {post.imagePreview && (
                  <img src={post.imagePreview} alt={post.title} className="post-image" />
                )}
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p className="post-category">{post.category}</p>
                  <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <NewPost
          onClose={() => setShowNewPost(false)}
          onSave={handleNewPost}
        />
      )}
    </div>
  );
};

export default Dashboard;