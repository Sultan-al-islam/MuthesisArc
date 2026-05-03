import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Settings, CheckCircle, AlertCircle } from 'lucide-react';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    dept: '',
    batch: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        dept: user.dept || '',
        batch: user.batch || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.put('http://localhost:5000/api/users/profile', formData, config);
      login(res.data);
      setSuccess('Profile updated successfully!');
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center py-20">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <User className="w-12 h-12 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white">Student Profile</h1>
            <p className="text-slate-400 text-lg">Manage your academic details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Read-only info panel */}
          <div className="col-span-1 bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 h-fit">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Account Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Student ID</p>
                <p className="font-medium text-white">{user.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email (Gmail)</p>
                <p className="font-medium text-white truncate">{user.email}</p>
              </div>
              <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-500 text-center">Student ID and Email cannot be changed after registration.</p>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="col-span-1 md:col-span-2 bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-slate-400" />
              <h2 className="text-xl font-semibold text-white">Edit Details</h2>
            </div>

            {success && (
              <div className="mb-6 bg-green-500/10 border border-green-500/50 p-4 rounded-xl flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Department</label>
                  <input
                    type="text"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">New Password <span className="text-slate-500 text-xs">(Leave blank to keep current)</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
