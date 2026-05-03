import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    dept: '',
    batch: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/users/register', formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px]"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-text-main">
          Join the Archive
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-accent hover:opacity-80">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white border border-slate-200 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center text-red-400">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="mt-1">
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Student ID</label>
                <div className="mt-1">
                  <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Department</label>
                <div className="mt-1">
                  <input type="text" name="dept" required value={formData.dept} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Batch</label>
                <div className="mt-1">
                  <input type="text" name="batch" required value={formData.batch} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Gmail</label>
              <div className="mt-1">
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1">
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent-red hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(215,61,51,0.2)]"
              >
                {loading ? 'Creating account...' : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" /> Sign Up
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

export default Register;
