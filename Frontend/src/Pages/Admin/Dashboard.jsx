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
  FaTrash,
  FaEye,
  FaHeart,
  FaComment
} from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';
import NewPost from './NewPost';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [activePage, setActivePage] = useState('posts');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (activePage === 'posts') {
      fetchPosts();
    } else if (activePage === 'stats') {
      fetchStats();
    }
  }, [activePage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      console.log('Full API Response:', response);
      
      if (response.data && response.data.success) {
        setPosts(response.data.data || []);
      } else {
        setError('Unexpected response format from server');
        console.error('Unexpected response:', response);
      }
    } catch (err) {
      const errorMessage = err.response 
        ? `Server Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}` 
        : 'Network error. Check your server connection.';
      
      setError(errorMessage);
      console.error('Detailed Error:', {
        message: err.message,
        response: err.response,
        config: err.config
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const response = await axios.get('http://localhost:8080/api/posts/stats');
      
      // Log the full response for debugging
      console.log('Stats API Response:', response);
      
      if (response.data && response.data.success) {
        setStats(response.data.data);
      } else {
        // Handle unexpected response format
        const errorMsg = response.data?.message || 'Unexpected response format';
        setError(`Failed to load statistics: ${errorMsg}`);
        console.error('Stats Error:', errorMsg);
      }
    } catch (error) {
      // Detailed error logging
      const errorMessage = error.response 
        ? `Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}` 
        : error.message || 'Network error. Check your server connection.';
      
      setError(errorMessage);
      console.error('Detailed Stats Fetch Error:', {
        message: errorMessage,
        fullError: error,
        response: error.response,
        config: error.config
      });
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

  const renderStats = () => {
    if (!stats) return null;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const monthlyData = {
      labels: stats.postsByMonth.map(item => `${monthNames[item._id.month - 1]} ${item._id.year}`),
      datasets: [{
        label: 'Posts Published',
        data: stats.postsByMonth.map(item => item.count),
        backgroundColor: '#0A647A',
      }]
    };

    const categoryData = {
      labels: stats.postsByCategory.map(item => item._id),
      datasets: [{
        data: stats.postsByCategory.map(item => item.count),
        backgroundColor: [
          '#0A647A',
          '#1A8594',
          '#2AA6B3',
          '#3AC7D2',
          '#4AE8F1',
        ],
      }]
    };

    return (
      <div className="stats-container p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Posts</h3>
            <div className="flex items-center">
              <FaRegNewspaper className="text-[#0A647A] text-2xl mr-2" />
              <span className="text-2xl font-bold">{stats.totalPosts}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Views</h3>
            <div className="flex items-center">
              <FaEye className="text-[#0A647A] text-2xl mr-2" />
              <span className="text-2xl font-bold">{stats.totalViews}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Likes</h3>
            <div className="flex items-center">
              <FaHeart className="text-[#0A647A] text-2xl mr-2" />
              <span className="text-2xl font-bold">{stats.totalLikes}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Comments</h3>
            <div className="flex items-center">
              <FaComment className="text-[#0A647A] text-2xl mr-2" />
              <span className="text-2xl font-bold">{stats.totalComments}</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 font-semibold mb-4">Posts by Month</h3>
            <Bar
              data={monthlyData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 font-semibold mb-4">Posts by Category</h3>
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Top Posts Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 font-semibold mb-4">Most Viewed Posts</h3>
            <ul className="space-y-3">
              {stats.mostViewedPosts.map((post, index) => (
                <li key={post._id} className="flex items-center justify-between">
                  <span className="text-gray-600">{post.title}</span>
                  <span className="text-[#0A647A] font-medium">{post.views} views</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 font-semibold mb-4">Most Liked Posts</h3>
            <ul className="space-y-3">
              {stats.mostLikedPosts.map((post, index) => (
                <li key={post._id} className="flex items-center justify-between">
                  <span className="text-gray-600">{post.title}</span>
                  <span className="text-[#0A647A] font-medium">{post.likeCount} likes</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Content */}
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={activePage === 'posts' ? fetchPosts : fetchStats}>
              Retry
            </button>
          </div>
        ) : activePage === 'stats' ? (
          renderStats()
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