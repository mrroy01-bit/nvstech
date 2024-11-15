import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      email,
      password
    });

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return {
        success: true,
        data: response.data
      };
    }

    return {
      success: false,
      error: 'Invalid credentials'
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export default login;
