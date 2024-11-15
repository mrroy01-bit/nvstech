import axios from 'axios';

const loginAuth = async (email, password) => {
  try {
    // Input validation
    if (!email || !password) {
      return {
        success: false,
        message: 'Email and password are required'
      };
    }

    // Configure axios with timeout and headers
    const config = {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('http://localhost:5000/api/login', {
      email,
      password
    }, config);

    if (response.data && response.data.token) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      return {
        success: true,
        message: 'Login successful'
      };
    }

    return {
      success: false,
      message: 'Invalid credentials'
    };

  } catch (error) {
    // Handle specific error cases
    if (error.code === 'ECONNREFUSED') {
      return {
        success: false,
        message: 'Unable to connect to server. Please check if server is running.'
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timed out. Please try again.'
      };
    }

    if (error.response) {
      // Server responded with error
      return {
        success: false,
        message: error.response.data?.message || 'Invalid credentials'
      };
    }

    // Generic error handling
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const logout = () => {
  localStorage.removeItem('token');
};

export { loginAuth, isAuthenticated, logout };
