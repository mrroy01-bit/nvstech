# NVS Tech Project

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</div>

## Overview
A modern full-stack web application showcasing NVS Tech's services and team. Built with React, Node.js, and MongoDB, featuring a sleek UI, user authentication, team showcase, and contact functionality.

## Features

### User Authentication System
- Secure registration and login with JWT
- Password encryption using bcrypt
- Protected routes and middleware
- Session management

### Team Showcase
- Modern card-based design
- Animated transitions
- Team member profiles with:
  - Profile images
  - Role descriptions
  - Social media links (GitHub, LinkedIn, X)

### Contact System
- Interactive contact form
- Real-time form validation
- Secure message storage
- Admin notification system

### Modern UI/UX
- Responsive design for all devices
- Custom animations and transitions
- Dark theme with gradient accents
- Loading states and error handling
- Interactive components

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **React Router DOM** - Navigation
- **Axios** - API requests
- **React Icons** - Modern iconography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mrroy01-bit/nvstech.git
cd nvstech
```

2. **Frontend Setup**
```bash
cd Frontend
npm install
```

3. **Backend Setup**
```bash
cd Backend
npm install
```

4. **Environment Configuration**
Create `.env` in Backend directory:
```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

5. **Start Development Servers**

Backend:
```bash
cd Backend
npm run dev
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
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   └── utils/
│   │       ├── axios.js
│   │       └── auth.js
│   └── package.json
│
├── Backend/
│   ├── Models/
│   │   ├── User.js
│   │   └── Contact.js
│   ├── Routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin only)

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Environment variable protection
- Input validation and sanitization
- XSS protection
- Rate limiting

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js](https://nodejs.org/)
