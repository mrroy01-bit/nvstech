import React, { useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import './NewPost.css';

const NewPost = ({ onClose, onSave }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
    imagePreview: null
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(post);
    onClose();
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
            <button type="submit" className="save-button">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
