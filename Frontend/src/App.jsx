import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
import Service from './Pages/Service';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Dashboard from './Pages/Admin/Dashboard';
import Register from './Pages/register';
import PostDetail from './Pages/PostDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/project" element={<Portfolio />} />
      <Route path="/service" element={<Service />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<PostDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
