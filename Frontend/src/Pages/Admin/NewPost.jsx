import React, { useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './NewPost.css';

const NewPost = ({ onClose, onSave }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
    imagePreview: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({
        ...post,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('category', post.category);
      if (post.image) {
        formData.append('image', post.image);
      }

      const response = await axios.post('http://localhost:8080/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        onSave(response.data.data);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-post-overlay">
      <div className="new-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input className='text-black'
              type="text"
              placeholder="Post Title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group text-black">
            <select
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div className="form-group text-black">
            <textarea
              placeholder="Write your post content..."
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
              rows="10"
            />
          </div>
          <div className="form-group">
            <label className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
              <div className="upload-placeholder">
                {post.imagePreview ? (
                  <img src={post.imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <FaImage />
                    <span>Add Featured Image</span>
                  </>
                )}
              </div>
            </label>
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
