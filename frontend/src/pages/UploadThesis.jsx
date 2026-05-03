import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const UploadThesis = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    department: '',
    colabLink: '',
    driveLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to upload a thesis');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/theses', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSuccess(true);
      setFormData({ title: '', author: '', abstract: '', department: '', colabLink: '', driveLink: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-red/5 rounded-full blur-[100px]"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-blue mb-4">
            Upload Thesis
          </h1>
          <p className="text-slate-600 text-lg">Contribute your research to the global archive.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          {success && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <p>Thesis uploaded successfully!</p>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Thesis Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="Enter the full title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Google Colab Link (Optional)</label>
                <input
                  type="url"
                  name="colabLink"
                  value={formData.colabLink}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                  placeholder="https://colab.research.google.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Abstract</label>
              <textarea
                name="abstract"
                required
                rows="4"
                value={formData.abstract}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-none"
                placeholder="Brief summary of the thesis..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">PDF Drive Link</label>
              <input
                type="url"
                name="driveLink"
                required
                value={formData.driveLink}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-accent-red to-accent-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(215,61,51,0.2)]"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 mr-2" /> Submit Thesis
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadThesis;
