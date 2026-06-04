import { useEffect, useState } from 'react';
import { Trash2, Search, Filter, CheckCircle, Clock, XCircle, MapPin, User, AlertTriangle, Edit2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Report {
  id: string;
  location: string;
  locationName: string; // fallback
  healthScore: number;
  status: string;
  timestamp: string;
  imageUrl: string;
  submitterName: string;
  name: string; // fallback
  coverage: number;
  aiCoverage?: number;
  aiVerified?: boolean;
}

const ManageReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Report>>({});
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`);
    const data = await res.json();
    if (data.success) {
        setReports(data.data.map((r: any) => ({
            ...r,
            location: r.locationName || r.location,
            submitterName: r.submitterName || r.name
        })));
    }
  };

  const handleEdit = (report: Report) => {
    setEditingId(report.id);
    setFormData(report);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId 
      ? `${import.meta.env.VITE_API_URL}/api/reports/${editingId}`
      : `${import.meta.env.VITE_API_URL}/api/reports`;
    
    const method = editingId ? 'PUT' : 'POST';

    // If verified, maybe we want to sync coverage? For now just save what's verified.
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setShowForm(false);
    setEditingId(null);
    setFormData({});
    fetchReports();
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/reports/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        fetchReports(); 
    } catch (error) {
        console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/reports/${id}`, { method: 'DELETE' });
      fetchReports();
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const filteredReports = reports.filter(r => 
    (r.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.submitterName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Reports</h1>
          <p className="text-gray-500 text-sm mt-0.5">Validate community submissions and AI analysis</p>
        </div>
        <div className="flex gap-2">
            <button 
            onClick={fetchReports}
            className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
            >
            Refresh List
            </button>
            <button 
                onClick={() => { setEditingId(null); setFormData({}); setShowForm(true); }}
                className="bg-nature-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-nature-700 shadow-md shadow-nature-600/20 transition-all text-sm font-medium"
            >
                <Plus size={18} /> New
            </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by location, submitter, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none text-sm shadow-sm"
          />
        </div>
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 shadow-sm">
          <Filter size={18} />
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="glass-card p-5 rounded-xl border border-nature-100">
              <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-md bg-nature-100 flex items-center justify-center text-nature-600">
                  {editingId ? <Edit2 size={16} /> : <Plus size={16} />}
                </span>
                {editingId ? 'Edit Report' : 'New Report'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Location Name</label>
                    <input 
                      value={formData.location || ''} 
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none transition-all text-sm" 
                      placeholder="e.g. Powai Lake"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Health Score</label>
                    <input 
                      type="number"
                      value={formData.healthScore || ''} 
                      onChange={e => setFormData({...formData, healthScore: Number(e.target.value)})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none transition-all text-sm" 
                      placeholder="85"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                    <select 
                      value={formData.status || 'pending'} 
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none transition-all bg-white text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Coverage %</label>
                    <input 
                      type="number"
                      value={formData.coverage || ''} 
                      onChange={e => setFormData({...formData, coverage: Number(e.target.value)})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none transition-all text-sm" 
                      placeholder="50"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-nature-600 text-white rounded-lg shadow-md shadow-nature-600/20 hover:bg-nature-700 transition-all text-sm font-medium">Save Changes</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image Section */}
                <div className="w-full lg:w-48 h-48 lg:h-auto shrink-0 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer" onClick={() => setSelectedImage(report.imageUrl)}>
                    {report.imageUrl ? (
                        <img src={report.imageUrl} alt={report.location} className="w-full h-full object-cover transition-transform hover:scale-105" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <MapPin size={32} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 hover:opacity-100 bg-black/60 text-white text-xs px-2 py-1 rounded">View Full</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                             <div>
                                <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{report.location}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                    <span className="flex items-center gap-1"><User size={14} /> {report.submitterName || 'Anonymous'}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {new Date(report.timestamp).toLocaleDateString()}</span>
                                </div>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(report.status)}`}>
                                {report.status}
                             </span>
                        </div>

                        {/* AI Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <span className="text-xs text-gray-500 block">Health Score</span>
                                <span className={`text-lg font-bold ${report.healthScore > 50 ? 'text-green-600' : 'text-red-500'}`}>
                                    {report.healthScore ?? 'N/A'}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <span className="text-xs text-gray-500 block">User Coverage</span>
                                <span className="text-lg font-bold text-gray-900">{report.coverage ?? 0}%</span>
                            </div>
                            <div className="bg-nature-50 p-2 rounded-lg border border-nature-100 relative overflow-hidden">
                                <span className="text-xs text-nature-700 block relative z-10">AI Coverage</span>
                                <span className="text-lg font-bold text-nature-800 relative z-10">
                                    {report.aiCoverage ? `${report.aiCoverage.toFixed(1)}%` : 'Processing'}
                                </span>
                            </div>
                            <div className={`p-2 rounded-lg border relative overflow-hidden ${report.aiVerified ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                                <span className={`text-xs block relative z-10 ${report.aiVerified ? 'text-green-700' : 'text-amber-700'}`}>AI Check</span>
                                <div className="flex items-center gap-1 relative z-10">
                                    {report.aiVerified ? <CheckCircle size={16} className="text-green-600" /> : <AlertTriangle size={16} className="text-amber-600" />}
                                    <span className={`text-sm font-bold ${report.aiVerified ? 'text-green-800' : 'text-amber-800'}`}>
                                        {report.aiVerified ? 'Verified' : 'Flagged'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                        {report.status === 'pending' && (
                            <>
                                <button 
                                  onClick={() => handleStatusUpdate(report.id, 'rejected')}
                                  className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <XCircle size={16} /> Reject
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(report.id, 'verified')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md shadow-green-600/20 hover:bg-green-700 text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <CheckCircle size={16} /> Verify & Publish
                                </button>
                            </>
                        )}
                        <button 
                           onClick={() => handleEdit(report)}
                           className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                           title="Edit Details"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                           onClick={() => handleDelete(report.id)}
                           className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                           title="Delete Permanently"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-20 text-gray-400 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
            <Search size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium text-gray-500">No matching reports found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedImage(null)}>
              <div className="relative max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl">
                  <img src={selectedImage} alt="Full View" className="w-full h-full object-contain" />
                  <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
                      <XCircle size={24} />
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default ManageReports;
