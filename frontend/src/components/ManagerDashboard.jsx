import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { staffApplicationsAPI, vendorsAPI } from '../services/api';
import { 
  Users, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  FileText,
  LogOut,
  Send,
  Store,
  MapPin
} from 'lucide-react';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    staff_count: 1,
    description: '',
    event_date: '',
    vendor_id: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appsData, vendorsData] = await Promise.all([
        staffApplicationsAPI.getAll(),
        vendorsAPI.getAll()
      ]);
      setApplications(Array.isArray(appsData) ? appsData : []);
      setVendors(Array.isArray(vendorsData) ? vendorsData : []);
      // Set default vendor if user has one
      if (user?.vendorId) {
        setFormData(prev => ({ ...prev, vendor_id: user.vendorId }));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendor_id) {
      alert('Please select a restaurant/vendor');
      return;
    }
    setSubmitting(true);
    try {
      await staffApplicationsAPI.create(formData);
      setShowForm(false);
      setFormData({ staff_count: 1, description: '', event_date: '', vendor_id: user?.vendorId || '' });
      loadData();
    } catch (error) {
      alert('Failed to submit application: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                StaffFlow
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">
                {user?.username} <span className="text-purple-600 font-medium">(Manager)</span>
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h2>
          <p className="text-gray-600 mt-1">Manage your staff requests and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Application Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition shadow-lg shadow-purple-200"
          >
            <Plus className="w-5 h-5" />
            Request Staff
          </button>
        </div>

        {/* Application Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-purple-100 shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Staff Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Vendor Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Store className="w-4 h-4 inline mr-1" />
                  Restaurant / Venue
                </label>
                <select
                  value={formData.vendor_id}
                  onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a restaurant...</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name} - {vendor.location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Staff Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.staff_count}
                    onChange={(e) => setFormData({ ...formData, staff_count: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Requirements
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the event and any specific requirements..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Applications List */}
        <div className="bg-white rounded-xl border border-purple-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Your Applications</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No applications yet</p>
              <p className="text-sm text-gray-400">Click "Request Staff" to create your first application</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {applications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-purple-50/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusBadge(app.status)}
                        {app.vendorName && (
                          <span className="inline-flex items-center gap-1 text-sm text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            <Store className="w-3 h-3" />
                            {app.vendorName}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {app.eventDate && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {app.eventDate}
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium">
                        {app.staffCount} staff member{app.staffCount > 1 ? 's' : ''} requested
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{app.description}</p>
                      {app.adminNotes && (
                        <p className="text-sm text-purple-600 mt-2 bg-purple-50 p-2 rounded">
                          Admin note: {app.adminNotes}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(app.createdAt * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
