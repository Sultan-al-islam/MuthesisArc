import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UploadThesis from './pages/UploadThesis';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditThesis from './pages/EditThesis';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-secondary text-text-main font-sans">
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadThesis />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit/:id" element={<EditThesis />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

