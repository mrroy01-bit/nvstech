import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoImg from '../img/logo.png';
import { FaLock } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[linear-gradient(135deg,#1a1c2c,#4389A2)] backdrop-blur-sm bg-opacity-80'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <div className="logo w-1/4">
            <Link to='/' className='flex items-center space-x-2'>
              <img src={logoImg} alt="NVS Tech Logo" className='h-10 w-auto' />
              <span className="hidden sm:block text-xl font-semibold">NVS Tech</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center w-2/4">
            <div className="flex space-x-1 bg-gray-800/50 rounded-full px-6 py-2 backdrop-blur-sm">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <NavLink to="/service" label="Service" />
              <NavLink to="/project" label="Portfolio" />
              <NavLink to="/blog" label="Blog" />
              <NavLink to="/contact" label="Contact" />
            </div>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex w-1/4 justify-end items-center">
            <Link 
              to='/login'
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#54587a] via-[#2d5569] to-[#4389A2] hover:from-[#4389A2] hover:via-[#2d5569] hover:to-[#9ca4e2] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <FaLock className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#4389A2] transition-colors duration-300"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink to="/" label="Home" />
              <MobileNavLink to="/about" label="About" />
              <MobileNavLink to="/service" label="Service" />
              <MobileNavLink to="/project" label="Portfolio" />
              <MobileNavLink to="/blog" label="Blog" />
              <MobileNavLink to="/contact" label="Contact" />
              <MobileNavLink to="/login" label="Login" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop NavLink component
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-full transition-all duration-300"
  >
    {label}
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({ to, label }) => (
  <Link
    to={to}
    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-md transition-all duration-300"
  >
    {label}
  </Link>
);

export default Nav;
