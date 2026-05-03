import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const EditThesis = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    department: '',
    colabLink: '',
    driveLink: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchThesis = async () => {
      try {
        const res = await axios.get('/api/theses');
        // Find thesis locally since we don't have a single thesis GET route.
        // For production, create a GET /api/theses/:id route
        const thesis = res.data.find((t) => t._id === id);
        if (thesis) {
          if (String(thesis.uploader) !== String(user._id)) {
            navigate('/');
            return;
          }
          setFormData({
            title: thesis.title,
            author: thesis.author,
            abstract: thesis.abstract,
            department: thesis.department,
            colabLink: thesis.colabLink || '',
            driveLink: thesis.driveLink,
          });
        } else {
          setError('Thesis not found');
        }
      } catch (err) {
        setError('Error loading thesis');
      } finally {
        setLoading(false);
      }
    };
    fetchThesis();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await axios.put(`/api/theses/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-text-main">Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-red/5 rounded-full blur-[100px]"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-blue mb-4">
            Edit Thesis
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Thesis Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
                <input type="text" name="author" required value={formData.author} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <input type="text" name="department" required value={formData.department} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Google Colab Link (Optional)</label>
                <input type="url" name="colabLink" value={formData.colabLink} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Abstract</label>
              <textarea name="abstract" required rows="4" value={formData.abstract} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">PDF Drive Link</label>
              <input type="url" name="driveLink" required value={formData.driveLink} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all" />
            </div>

            <button type="submit" disabled={saving} className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-accent-red to-accent-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditThesis;
