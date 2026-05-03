import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import UploadThesis from './pages/UploadThesis';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditThesis from './pages/EditThesis';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              muThesis acrve
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            {user ? (
              <>
                <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]">Upload</Link>
                <Link to="/profile" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">{user.name}</Link>
                <button onClick={handleLogout} className="hover:text-red-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadThesis />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit/:id" element={<EditThesis />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
