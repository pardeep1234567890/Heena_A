# Heena by Anshu

A full-stack web application for a professional mehndi (henna) artist booking platform. This application allows clients to browse services, view gallery, book appointments, and leave testimonials, while providing administrators with tools to manage bookings, users, gallery, and testimonials.

## 🌟 Features

### Client Features
- **Service Catalog**: Browse different types of mehndi services (Bridal, Engagement, Festivals, etc.)
- **Gallery**: View portfolio of mehndi designs
- **Booking System**: Book appointments with event details and preferences
- **Image Upload**: Upload reference images for custom designs
- **Testimonials**: View and submit testimonials
- **User Authentication**: Sign up/login with email or Google OAuth
- **User Profile**: Manage personal information and bookings

### Admin Features
- **Booking Management**: View and manage all bookings with status updates
- **User Management**: Manage user accounts and roles
- **Gallery Management**: Upload and manage portfolio images
- **Testimonial Management**: Moderate and manage client testimonials
- **Admin Dashboard**: Centralized control panel for all administrative tasks

## 🛠️ Tech Stack

### Frontend (`heena_a2`)
- **Framework**: React 19
- **Build Tool**: Vite with Rolldown bundler
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **UI/UX**: React Toastify for notifications

### Backend (`server`)
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: 
  - Passport.js
  - Google OAuth 2.0
  - JWT (JSON Web Tokens)
  - bcryptjs for password hashing
- **File Upload**: 
  - Multer
  - Cloudinary for image storage
- **Security**: CORS, Express Session
- **Email Validation**: Disposable email domain checking

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Google OAuth credentials (for Google login)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/pardeep1234567890/Heena_A.git
cd Heena_A
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Server
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Session
SESSION_SECRET=your_session_secret_key

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
```

### 3. Frontend Setup

```bash
cd heena_a2
npm install
```

Create a `.env` file in the `heena_a2` directory (if needed):

```env
VITE_API_URL=http://localhost:4000
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:4000`

### Start Frontend Development Server
```bash
cd heena_a2
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🔨 Available Scripts

### Backend (`server`)
- `npm start` - Start the production server
- `npm test` - Run tests (placeholder)

### Frontend (`heena_a2`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
Heena_A/
├── heena_a2/                 # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components (Admin pages)
│   │   ├── context/         # React context providers
│   │   ├── assets/          # Images and other assets
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind CSS configuration
│
└── server/                   # Backend Express application
    ├── config/              # Configuration files (passport, etc.)
    ├── controllers/         # Route controllers
    ├── middleware/          # Custom middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    └── server.js            # Server entry point
```

## 🔐 Authentication

The application supports two authentication methods:

1. **Email/Password**: Traditional signup and login
2. **Google OAuth**: Single sign-on with Google

All passwords are hashed using bcryptjs before storage.

## 🖼️ Image Management

Images are stored and managed using Cloudinary:
- Gallery images
- Booking reference images
- Automatic optimization and transformations

## 🌐 Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment with `vercel.json` configuration.

### Backend (Vercel)
The backend is also configured for Vercel serverless deployment with proper MongoDB connection caching.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - Logout user

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Upload new image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PATCH /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Heena by Anshu - Professional Mehndi Artist

## 🙏 Acknowledgments

- React and Vite teams for the excellent framework and build tool
- MongoDB and Express for the robust backend infrastructure
- Cloudinary for seamless image management
- All the open-source contributors whose packages made this project possible
