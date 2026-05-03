import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, BookOpen, User, GraduationCap, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [theses, setTheses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this thesis?')) {
      try {
        await axios.delete(`/api/theses/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTheses(theses.filter((thesis) => thesis._id !== id));
      } catch (err) {
        console.error('Failed to delete', err);
        alert('Failed to delete thesis');
      }
    }
  };

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const res = await axios.get('/api/theses');
        setTheses(res.data);
      } catch (err) {
        console.error('Failed to fetch theses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheses();
  }, []);

  const filteredTheses = theses.filter(
    (thesis) =>
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - Antigravity/Futuristic Theme */}
      <div className="relative overflow-hidden bg-slate-900 py-32 px-6 sm:px-12 lg:px-24 flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-sm text-slate-300">Discover Academic Excellence</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              muThesis acrve
            </span>
            <br />
            <span className="text-white mt-2 block text-4xl sm:text-6xl">Knowledge Without Limits</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore a vast repository of university thesis papers. Upload your research, discover groundbreaking ideas, and connect with the academic community in an immersive digital space.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 ml-4" />
              <input
                type="text"
                placeholder="Search by title or department..."
                className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-slate-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2">
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-blue-500" /> Recent Uploads
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTheses.length > 0 ? (
              filteredTheses.map((thesis) => (
                <div key={thesis._id} className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{thesis.title}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-slate-400 text-sm">
                      <User className="w-4 h-4 mr-2 text-blue-400" /> {thesis.author}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <GraduationCap className="w-4 h-4 mr-2 text-purple-400" /> {thesis.department}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                    {thesis.abstract}
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex gap-3">
                      <a
                        href={thesis.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center py-3 px-4 bg-slate-700/50 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300"
                      >
                        View PDF
                      </a>
                      {thesis.colabLink && (
                        <a
                          href={thesis.colabLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center py-3 px-4 bg-slate-700/50 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300"
                        >
                          Colab
                        </a>
                      )}
                    </div>
                    {user && thesis.uploader && String(user._id) === String(thesis.uploader) && (
                      <div className="flex gap-3 pt-3 border-t border-slate-700/50">
                        <Link
                          to={`/edit/${thesis._id}`}
                          className="flex-1 inline-flex items-center justify-center py-2 px-4 bg-slate-700/30 hover:bg-slate-600 text-slate-300 rounded-xl font-medium transition-all duration-300 text-sm"
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(thesis._id)}
                          className="flex-1 inline-flex items-center justify-center py-2 px-4 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl font-medium transition-all duration-300 text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-xl">No theses found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
