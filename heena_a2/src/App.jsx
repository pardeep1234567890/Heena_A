import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import UsersAdmin from './pages/UsersAdmin';
import TestimonialsAdmin from './pages/TestimonialsAdmin';
import Generator from './components/Generator';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import GoogleAuthCallback from './components/GoogleAuthCallback';
import GalleryAdmin from './pages/GalleryAdmin';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ToastContainer />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UsersAdmin /></AdminRoute>} />
            <Route path="/admin/gallery" element={<AdminRoute><GalleryAdmin /></AdminRoute>} />
            <Route path="/admin/testimonials" element={<AdminRoute><TestimonialsAdmin /></AdminRoute>} />
            <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
            <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
