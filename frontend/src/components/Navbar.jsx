import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { Menu, X, Home as HomeIcon, Upload, User as UserIcon, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeMenu} className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-accent-red to-accent-blue tracking-tighter">
              Mu ThesisArc
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="group flex items-center gap-2 text-slate-600 hover:text-accent-red transition-all text-sm font-bold uppercase tracking-widest">
              <HomeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="group flex items-center gap-2 text-slate-600 hover:text-accent-blue transition-all text-sm font-bold uppercase tracking-widest">
                  <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{user.name}</span>
                </Link>
                <Link to="/upload" className="flex items-center gap-2 bg-gradient-to-r from-accent-red to-red-600 hover:from-red-600 hover:to-accent-red text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 active:scale-95">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </Link>
                <button onClick={handleLogout} className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all active:scale-90">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-accent-red transition-all text-sm font-bold uppercase tracking-widest">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-indigo-600 hover:from-indigo-600 hover:to-accent-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 active:scale-95">
                  <UserPlus className="w-4 h-4" />
                  <span>Join Now</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-bold"
          >
            <HomeIcon className="w-5 h-5 text-accent-blue" /> Home
          </Link>
          
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-bold"
              >
                <UserIcon className="w-5 h-5 text-accent-blue" /> My Profile
              </Link>
              <Link
                to="/upload"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-red text-white font-bold shadow-lg shadow-accent-red/20"
              >
                <Upload className="w-5 h-5" /> Upload Thesis
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-bold"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-bold"
              >
                <LogIn className="w-5 h-5 text-accent-blue" /> Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-red text-white font-bold shadow-lg shadow-accent-red/20"
              >
                <UserPlus className="w-5 h-5" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
