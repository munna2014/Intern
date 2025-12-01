import { useState, useEffect } from 'react';
import { Users, Phone, Calendar, Award, Clock, Search, ArrowLeft, ChevronDown, ChevronUp, Plus, X, Mail, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { staffAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StaffList = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStaff, setExpandedStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    max_hours_per_week: 40,
    staff_status: 'available'
  });
  const [submitting, setSubmitting] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Only admins can view the staff list.');
      navigate('/profile');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin()) {
      loadStaff();
    }
  }, [isAdmin]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await staffAPI.getAll();
      setStaff(data || []);
    } catch (err) {
      console.error('Failed to load staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await staffAPI.create(formData);
      await loadStaff();
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        max_hours_per_week: 40,
        staff_status: 'available'
      });
      setShowAddModal(false);
      alert('Staff member added successfully!');
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff member. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteStaff = async (staffId, staffName) => {
    if (window.confirm(`Are you sure you want to delete ${staffName}? This action cannot be undone.`)) {
      try {
        await staffAPI.delete(staffId);
        await loadStaff();
        alert('Staff member deleted successfully!');
      } catch (error) {
        console.error('Error deleting staff:', error);
        alert('Failed to delete staff member. Please try again.');
      }
    }
  };

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.phone?.includes(searchTerm);
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-gray-600 transition-colors px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-black">Staff List</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Staff
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff by name, username, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Staff Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredStaff.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-shadow"
            >
              {/* Staff Header */}
              <button
                onClick={() =>
                  setExpandedStaff(expandedStaff === member.id ? null : member.id)
                }
                className="w-full p-6 flex items-center justify-between transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-black p-3 rounded-lg transition-colors">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name || member.username}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span>{member.phone || 'N/A'}</span>
                      </div>
                      {member.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <span>{member.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member.staff_status || member.status)}`}>
                        {member.staff_status || member.status || 'available'}
                      </span>
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">{member.skills.length} skills</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {member.current_hours || 0} / {member.max_hours_per_week || 40} hrs/week
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 ml-4">
                  {expandedStaff === member.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedStaff === member.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  {/* Skills */}
                  {member.skills && member.skills.length > 0 ? (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 mb-6">
                      <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No skills listed</p>
                    </div>
                  )}

                  {/* Availability */}
                  {member.availability && member.availability.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Availability</h4>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{member.availability.length} days available</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button className="flex-1 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                      View Schedule
                    </button>
                    <button className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                      Edit Details
                    </button>
                    <button 
                      onClick={() => handleDeleteStaff(member.id, member.name || member.username)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">No staff found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Add staff members to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Add New Staff</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., john_doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., john@staffflow.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., +60 12-345 6789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Hours Per Week
                </label>
                <input
                  type="number"
                  name="max_hours_per_week"
                  value={formData.max_hours_per_week}
                  onChange={handleInputChange}
                  min="1"
                  max="168"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="staff_status"
                  value={formData.staff_status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? 'Adding...' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffList;
