import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Dashboard from './Pages/Admin/Dashboard';
import Register from './Pages/register';
import PostDetail from './Pages/PostDetail';
import Profile from './Pages/Admin/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/project" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<PostDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
