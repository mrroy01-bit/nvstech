# NVS Tech Project

## Overview
A full-stack web application built with React, Node.js, and MongoDB, featuring user authentication, team showcase, and contact form functionality.

## Features
- User Authentication System
  - Secure registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
- Team Showcase
  - Responsive design with Tailwind CSS
  - Team member cards with profile images
  - Social media integration (GitHub, LinkedIn, Twitter/X)
- Contact Form
  - Form submission with backend integration
  - MongoDB storage for contact messages
- Modern UI/UX
  - Responsive design
  - Interactive components
  - Loading states and error handling

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js
- CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/mrroy01-bit/nvstech.git
```

2. Install Frontend dependencies
```bash
cd Frontend
npm install
```

3. Install Backend dependencies
```bash
cd Backend
npm install
```

4. Set up environment variables
Create a `.env` file in the Backend directory:
```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

5. Start the servers

Backend:
```bash
cd Backend
npm start
```

Frontend:
```bash
cd Frontend
npm run dev
```

## Project Structure
```
nvstech/
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   └── Elements/
│   │   │       ├── Nav.jsx
│   │   │       ├── Team.jsx
│   │   │       └── Footer.jsx
│   │   ├── Pages/
│   │   │   ├── register.jsx
│   │   │   └── login.jsx
│   │   └── utils/
│   │       └── axios.js
│   └── package.json
│
├── Backend/
│   ├── Models/
│   │   ├── User.js
│   │   └── Contact.js
│   ├── Routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   ├── index.js
│   └── package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Contact
- POST `/api/contact/submit` - Submit contact form

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Environment variable protection
- Input validation and sanitization

## Contributing
Feel free to submit issues and pull requests.

## License
MIT License
