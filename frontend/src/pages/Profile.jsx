import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Settings, CheckCircle, AlertCircle, BookOpen, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [userTheses, setUserTheses] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        dept: user.dept || '',
        batch: user.batch || '',
        password: '',
      });
      fetchUserTheses();
    }
  }, [user]);

  const fetchUserTheses = async () => {
    try {
      const res = await axios.get(`/api/theses?uploader=${user._id}`);
      setUserTheses(res.data);
    } catch (err) {
      console.error('Failed to fetch user theses', err);
    }
  };

  const handleDeleteThesis = async (id) => {
    if (window.confirm('Are you sure you want to delete this thesis?')) {
      try {
        await axios.delete(`/api/theses/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserTheses(userTheses.filter((t) => t._id !== id));
      } catch (err) {
        console.error('Failed to delete thesis', err);
        alert('Failed to delete thesis');
      }
    }
  };

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

      const res = await axios.put('/api/users/profile', formData, config);
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
    <div className="min-h-screen bg-secondary py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-accent-blue/10 rounded-2xl border border-accent-blue/20">
            <User className="w-12 h-12 text-accent-blue" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-text-main">Student Profile</h1>
            <p className="text-slate-600 text-lg">Manage your academic details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Read-only info panel */}
          <div className="col-span-1 bg-white border border-slate-200 rounded-3xl p-6 h-fit shadow-sm">
            <h3 className="text-lg font-semibold text-text-main mb-4 border-b border-slate-200 pb-2">Account Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Student ID</p>
                <p className="font-medium text-text-main">{user.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email (Gmail)</p>
                <p className="font-medium text-text-main truncate">{user.email}</p>
              </div>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 text-center">Student ID and Email cannot be changed after registration.</p>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-text-main">Edit Details</h2>
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
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Department</label>
                  <input
                    type="text"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">New Password <span className="text-slate-500 text-xs">(Leave blank to keep current)</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent-red hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* My Theses Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
              <BookOpen className="text-accent-red" /> My Uploaded Theses
            </h2>
          </div>

          {userTheses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTheses.map((thesis) => (
                <div key={thesis._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-text-main mb-2 line-clamp-1">{thesis.title}</h3>
                  <p className="text-slate-500 text-xs mb-4 line-clamp-2">{thesis.abstract}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{thesis.department}</span>
                    <div className="flex gap-2">
                      <Link
                        to={`/edit/${thesis._id}`}
                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteThesis(thesis._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-accent-red rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-6">You haven't uploaded any research papers yet.</p>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent-blue/20"
              >
                Upload Your First Thesis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
