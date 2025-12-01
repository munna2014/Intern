import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Users, Calendar, ChevronDown, ChevronUp, ArrowLeft, Search, Mail, Star, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { vendorsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function VendorList() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [expandedVendor, setExpandedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    status: 'active'
  });
  const [submitting, setSubmitting] = useState(false);

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Only admins can view the vendor list.');
      navigate('/profile');
    }
  }, [isAdmin, navigate]);

  // Fetch vendors from API
  useEffect(() => {
    if (isAdmin()) {
      fetchVendors();
    }
  }, [isAdmin]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorsAPI.getAll();
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await vendorsAPI.create(formData);
      // Refresh vendor list
      await fetchVendors();
      // Reset form and close modal
      setFormData({ name: '', location: '', contact: '', status: 'active' });
      setShowAddModal(false);
      alert('Vendor added successfully!');
    } catch (error) {
      console.error('Error adding vendor:', error);
      alert('Failed to add vendor. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sample vendor data for fallback
  const sampleVendors = [
    {
      id: 1,
      name: 'Sultan Dines Restaurant',
      location: 'Downtown District',
      phone: '+60 3-1234 5678',
      email: 'manager@sultandines.com',
      rating: 4.5,
      totalStaff: 12,
      description: 'Premium dining restaurant specializing in local and international cuisine',
      requirements: [
        { date: '2024-01-15', startTime: '08:00', endTime: '16:00', staffNeeded: 3, role: 'Waiter', rate: 'RM 15/hour' },
        { date: '2024-01-15', startTime: '16:00', endTime: '00:00', staffNeeded: 2, role: 'Chef', rate: 'RM 25/hour' },
        { date: '2024-01-16', startTime: '10:00', endTime: '22:00', staffNeeded: 4, role: 'Waiter', rate: 'RM 15/hour' }
      ]
    },
    {
      id: 2,
      name: 'Marriott Convention Center',
      location: 'Business Park',
      phone: '+60 3-2345 6789',
      email: 'events@marriott.com',
      rating: 4.8,
      totalStaff: 25,
      description: 'World-class convention center hosting international events and conferences',
      requirements: [
        { date: '2024-01-15', startTime: '15:00', endTime: '23:00', staffNeeded: 3, role: 'Security', rate: 'RM 18/hour' },
        { date: '2024-01-17', startTime: '09:00', endTime: '17:00', staffNeeded: 5, role: 'Event Staff', rate: 'RM 20/hour' }
      ]
    },
    {
      id: 3,
      name: 'Hilton Garden Inn',
      location: 'Airport Area',
      phone: '+60 3-3456 7890',
      email: 'manager@hilton.com',
      rating: 4.6,
      totalStaff: 18,
      description: 'Modern hotel near airport with comprehensive hospitality services',
      requirements: [
        { date: '2024-01-16', startTime: '06:00', endTime: '14:00', staffNeeded: 2, role: 'Kitchen Staff', rate: 'RM 16/hour' },
        { date: '2024-01-18', startTime: '07:00', endTime: '15:00', staffNeeded: 3, role: 'Housekeeping', rate: 'RM 14/hour' }
      ]
    },
    {
      id: 4,
      name: 'Grand Hyatt Hotel',
      location: 'City Center',
      phone: '+60 3-4567 8901',
      email: 'info@grandhyatt.com',
      rating: 4.9,
      totalStaff: 30,
      description: 'Luxury hotel offering premium accommodation and dining experiences',
      requirements: [
        { date: '2024-01-19', startTime: '18:00', endTime: '02:00', staffNeeded: 4, role: 'Bartender', rate: 'RM 22/hour' },
        { date: '2024-01-20', startTime: '12:00', endTime: '20:00', staffNeeded: 3, role: 'Concierge', rate: 'RM 18/hour' }
      ]
    },
    {
      id: 5,
      name: 'Sunway Resort',
      location: 'Suburban Area',
      phone: '+60 3-5678 9012',
      email: 'reservations@sunway.com',
      rating: 4.7,
      totalStaff: 22,
      description: 'Resort-style hotel with water park and entertainment facilities',
      requirements: [
        { date: '2024-01-21', startTime: '09:00', endTime: '17:00', staffNeeded: 6, role: 'Lifeguard', rate: 'RM 19/hour' },
        { date: '2024-01-22', startTime: '14:00', endTime: '22:00', staffNeeded: 4, role: 'Receptionist', rate: 'RM 17/hour' }
      ]
    }
  ];

  // Use real vendors if available, otherwise use sample data
  const vendorsToDisplay = vendors.length > 0 ? vendors : sampleVendors;

  const filteredVendors = vendorsToDisplay.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-50">
      {/* Header */}
      <header className="bg-white border-b border-black-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-black-600 transition-colors px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-black">Vendor List</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Vendor
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vendors by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white border border-black-200 rounded-xl overflow-hidden shadow-sm transition-shadow"
            >
              {/* Vendor Header */}
              <button
                onClick={() =>
                  setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)
                }
                className="w-full p-6 flex items-center justify-between transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-black p-3 rounded-lg transition-colors">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-bold text-black-600 mb-2">{vendor.name}</h3>
                    {vendor.description && (
                      <p className="text-black-600 text-sm mb-3">{vendor.description}</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-black-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white " />
                        <span className="text-black-600">{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600 " />
                        <span>{vendor.contact || vendor.phone}</span>
                      </div>
                      {vendor.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600 " />
                          <span>{vendor.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      {vendor.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current " />
                          <span className="text-sm font-semibold text-black">{vendor.rating}</span>
                          {vendor.totalStaff && (
                            <span className="text-sm text-black-600">({vendor.totalStaff} staff)</span>
                          )}
                        </div>
                      )}
                      {vendor.requirements && vendor.requirements.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600 " />
                          <span className="text-sm text-black-600">{vendor.requirements.length} active requirements</span>
                        </div>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vendor.status || 'active'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-black-600 ml-4">
                  {expandedVendor === vendor.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedVendor === vendor.id && (
                <div className="border-t border-black-200 p-6 bg-black-50">
                  {vendor.requirements && vendor.requirements.length > 0 ? (
                    <>
                      <h4 className="text-lg font-semibold text-black mb-4">Staffing Requirements</h4>
                      <div className="space-y-3">
                        {vendor.requirements.map((req, index) => (
                      <div key={index} className="bg-white border border-black-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">
                                {req.role}
                              </span>
                              <span className="text-black-600 text-sm">
                                {req.date} • {req.startTime} - {req.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-black-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {req.staffNeeded} staff needed
                              </span>
                              <span className="font-semibold text-green-600">
                                {req.rate}
                              </span>
                            </div>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                            Apply Staff
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No staffing requirements yet</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 bg-black text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Contact Vendor
                    </button>
                    <button className="flex-1 bg-black-200 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                      View History
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-black-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-black-400" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">No vendors found</h3>
            <p className="text-black-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Add New Vendor</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddVendor} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vendor Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Grand Hotel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Downtown District, Kuala Lumpur"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., +60 3-1234 5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                  {submitting ? 'Adding...' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorList;
