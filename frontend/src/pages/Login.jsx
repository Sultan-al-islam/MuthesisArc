import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/users/login', {
        email,
        password,
      });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px]"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-text-main">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <Link to="/register" className="font-medium text-accent hover:opacity-80">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-slate-200 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center text-red-400">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent-red hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(215,61,51,0.2)]"
              >
                {loading ? 'Signing in...' : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" /> Sign In
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
