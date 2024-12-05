# 🚀 NVS Tech Project

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</div>

## 🌟 Overview
A modern full-stack web application built with React, Node.js, and MongoDB. NVS Tech showcases our services and team with a beautiful, responsive design and seamless user experience.

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication system
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Input validation and sanitization

### 💼 Core Features
- **Team Showcase**: Modern profile cards with social media integration
- **Contact System**: Form submission with backend storage
- **Portfolio Display**: Showcase of our work and services
- **Admin Dashboard**: Manage content and view messages

### 🎨 UI/UX
- Responsive design using Tailwind CSS
- Custom animations with GSAP
- Dark theme with gradient accents
- Interactive components and transitions
- Loading states and error handling

## 🛠️ Technology Stack

### Frontend
```
React.js        → Modern UI framework
Tailwind CSS    → Utility-first styling
React Router    → Navigation management
Axios           → API requests
GSAP            → Smooth animations
React Icons     → Modern iconography
```

### Backend
```
Node.js         → Runtime environment
Express.js      → Web framework
MongoDB         → Database
Mongoose        → ODM
JWT             → Authentication
Bcrypt          → Password security
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Setup & Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/mrroy01-bit/nvstech.git
   cd nvstech
   ```

2. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd Backend
   npm install
   
   # Create .env file
   echo "MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PORT=5000" > .env
   
   npm start
   ```

## 📁 Project Structure
```
nvstech/
├── Frontend/                 # React application
│   ├── src/
│   │   ├── Components/      # Reusable components
│   │   ├── Pages/          # Route components
│   │   ├── Assets/         # Static files
│   │   └── utils/          # Helper functions
│   └── package.json
│
├── Backend/                  # Node.js server
│   ├── Models/             # Database schemas
│   ├── Routes/             # API endpoints
│   ├── middleware/         # Custom middleware
│   └── package.json
```

## 🔌 API Routes

### Authentication
```
POST /api/auth/register   # Create new user
POST /api/auth/login      # User login
GET  /api/auth/profile    # Get user profile
```

### Contact
```
POST /api/contact/submit  # Submit contact form
GET  /api/contact/list    # Get messages (admin)
```

## 🔒 Security Measures
- Secure password hashing
- JWT authentication
- CORS protection
- XSS prevention
- Rate limiting
- Input validation
- Environment variables

## 🤝 Contributing
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License
[MIT License](LICENSE)

## 🙏 Acknowledgments
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
