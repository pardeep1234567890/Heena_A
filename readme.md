# Heena_A - Mehndi Booking Application

## Overview

Heena_A is a full-stack web application designed for Mehndi (Henna) services. It allows users to browse services, view a gallery of designs, book appointments, and manage accounts. Admins can handle bookings and gallery uploads. The frontend is built with React and Vite for a responsive UI, while the backend uses Node.js, Express, and MongoDB for data management and authentication.

## Features

- **User Authentication**: Secure login and signup with JWT tokens and bcrypt hashing.
- **Home & About**: Introduction to Mehndi services with background imagery.
- **Services**: Display available Mehndi design services.
- **Gallery**: View and upload Mehndi designs (admin-only uploads).
- **Booking**: Schedule appointments with user details.
- **Generator**: Interactive tool for generating custom designs (placeholder based on component).
- **Admin Dashboard**: Manage bookings and gallery.
- **Responsive Design**: Tailwind CSS for mobile-friendly interface.

## Tech Stack

### Frontend
- React 19.x with Vite for fast development and HMR.
- React Router for navigation.
- Tailwind CSS for styling.
- ESLint for code quality.

### Backend
- Node.js with Express.js for API server.
- Mongoose for MongoDB ORM.
- JWT for authentication.
- bcryptjs for password hashing.
- CORS enabled for frontend-backend communication.

### Database
- MongoDB (via Mongoose models for User, Booking, Gallery).

### Deployment
- Vercel support (vercel.json configs for frontend and backend).

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas; ensure it's running and accessible)
- Git
- npm or yarn for package management

## Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd Heena_A
   ```

2. **Backend Setup**:
   - Navigate to the server directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in `server/` with the following variables (replace placeholders with your actual values):
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/heena_a_db  # For local MongoDB; use Atlas URI for cloud
     JWT_SECRET=your_strong_jwt_secret_key_here  # Generate a secure secret (e.g., using openssl rand -hex 32)
     ```
     Ensure MONGO_URI points to a valid MongoDB instance. For MongoDB Atlas, get the connection string from your dashboard.
   - Start the backend:
     ```
     node server.js
     ```
     The server will run on `http://localhost:5000`. Check the console for any connection errors.

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```
     cd ../heena_a2
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Update the API base URL in your frontend code (e.g., in a config or API calls) to point to `http://localhost:5000/api` if needed.
   - Start the development server:
     ```
     npm run dev
     ```
     The app will run on `http://localhost:5173` (default Vite port).

## Project Structure

```
Heena_A/
├── .DS_Store
├── readme.md
├── heena_a2/          # React Frontend
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vercel.json
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   ├── mehandi-background.jpg
│       │   └── react.svg
│       ├── components/
│       │   ├── About.jsx
│       │   ├── Booking.jsx
│       │   ├── Footer.jsx
│       │   ├── Gallery.jsx
│       │   ├── Generator.jsx
│       │   ├── Header.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Services.jsx
│       │   └── Signup.jsx
│       └── pages/
│           └── Admin.jsx
├── server/            # Node.js Backend
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── galleryController.js
│   ├── models/
│   │   ├── booking.js
│   │   ├── gallery.js
│   │   └── user.js
│   └── routes/
│       ├── auth.js
│       ├── booking.js
│       └── gallery.js
```

## API Endpoints

Base URL: `http://localhost:5000/api`

All endpoints expect JSON content-type. Auth-required endpoints need `Authorization: Bearer <token>` header.

- **Auth**:
  - `POST /auth/signup`
    - Body: `{ "name": "string", "email": "string", "password": "string", "role": "user|admin" (optional) }`
    - Response: `{ "token": "string", "user": { "id": "string", "name": "string", "email": "string", "role": "string" } }`
  - `POST /auth/login`
    - Body: `{ "email": "string", "password": "string" }`
    - Response: `{ "token": "string", "user": { "id": "string", "name": "string", "email": "string", "role": "string" } }`

- **Bookings** (auth required):
  - `POST /bookings`
    - Body: `{ "service": "string", "date": "YYYY-MM-DD", "time": "HH:MM", "details": "string" }`
    - Response: `{ "id": "string", "service": "string", "date": "string", "time": "string", "userId": "string", "status": "pending" }`
  - `GET /bookings`
    - Response: Array of booking objects
  - `PUT /bookings/:id`
    - Body: `{ "status": "pending|confirmed|cancelled" }`
    - Response: Updated booking object
  - `DELETE /bookings/:id`
    - Response: `{ "message": "Booking deleted" }`

- **Gallery** (admin for POST/PUT/DELETE):
  - `POST /gallery`
    - Body: Multipart form with `image` file and optional `{ "description": "string", "category": "string" }`
    - Response: `{ "id": "string", "imageUrl": "string", "description": "string" }`
  - `GET /gallery`
    - Response: Array of gallery objects `{ "id": "string", "imageUrl": "string", "description": "string", "category": "string" }`
  - `PUT /gallery/:id`
    - Body: Similar to POST
    - Response: Updated gallery object
  - `DELETE /gallery/:id`
    - Response: `{ "message": "Design deleted" }`

## Running the Application

1. Ensure MongoDB is running and the backend server is started (check console for "Server running on port 5000" and "MongoDB connected").
2. Start the frontend dev server.
3. Open `http://localhost:5173` in your browser.
4. Register/login to access booking and admin features.

## Development Scripts

### Frontend (in heena_a2/)
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (in server/)
- `node server.js` - Start server
- Consider adding `npm start` script in package.json: `"start": "node server.js"`
- For testing: Add `"test": "jest"` if tests are implemented.

## Deployment

- **Prerequisites**: Install Vercel CLI (`npm i -g vercel`).

- **Frontend (heena_a2/)**:
  1. Navigate to `heena_a2/`.
  2. Run `vercel` and follow prompts (link to project, deploy).
  3. Update API calls in frontend to use the deployed backend URL (e.g., replace `http://localhost:5000` with your backend URL).
  4. Set environment variables if needed (e.g., VITE_API_URL).

- **Backend (server/)**:
  1. Navigate to `server/`.
  2. Run `vercel` and follow prompts.
  3. In Vercel dashboard, add environment variables: MONGO_URI, JWT_SECRET, PORT (optional, Vercel handles it).
  4. The API will be available at `https://your-project.vercel.app/api`.

- **CORS Configuration**: In server.js, ensure `app.use(cors({ origin: 'https://your-frontend.vercel.app' }))` for production.
- **Database**: Use MongoDB Atlas for cloud deployment to avoid local DB issues.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, open a GitHub issue in the repository or email the maintainer at pardeep905001@gmail.com.

## Troubleshooting

- **MongoDB Connection Failed**: Verify MONGO_URI in .env. For local, ensure MongoDB service is running (`brew services start mongodb-community` on macOS). For Atlas, check IP whitelist and credentials.
- **CORS Errors**: Update CORS origins in server.js to include your frontend URL (e.g., `http://localhost:5173` for dev).
- **Port Already in Use**: Change PORT in .env or kill the process using the port (`lsof -ti:5000 | xargs kill -9` on macOS/Linux).
- **JWT Errors**: Ensure JWT_SECRET is set and strong. Regenerate tokens on changes.
- **Frontend API Calls Failing**: Check network tab in browser dev tools for errors; ensure backend is running.
- **Build Issues**: Run `npm run lint -- --fix` for ESLint fixes; clear node_modules and reinstall if dependencies fail.
