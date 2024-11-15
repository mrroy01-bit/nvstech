import { useState, useEffect } from 'react';
import Nav from '../../Components/Elements/Nav';
import Footer from '../../Components/Elements/Footer';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: Fetch posts from backend
    // This is example data
    setPosts([
      {
        id: 1,
        title: "Getting Started with React",
        content: "React is a powerful JavaScript library...",
        author: "John Doe",
        date: "2023-07-20",
        likes: 15,
        views: 234,
        comments: [
          {
            id: 1,
            author: "Jane Smith",
            content: "Great article!",
            date: "2023-07-21"
          }
        ]
      }
    ]);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const [newComment, setNewComment] = useState("");

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: post.comments.length + 1,
            author: "Current User", // Should come from auth context
            content: newComment,
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return post;
    }));
    setNewComment("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                >
                  <span>👍</span>
                  <span>{post.likes}</span>
                </button>
                <div className="text-gray-500">
                  <span>👁️ {post.views} views</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Comments ({post.comments.length})</h3>
                <div className="space-y-4">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded">
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        By {comment.author} on {comment.date}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border rounded"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
