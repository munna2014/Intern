import { useState, useEffect } from 'react';
import { Users, Trash2, Edit2, Plus, X, ArrowLeft, Search, Filter, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { staffAPI, vendorsAPI, assignmentsAPI } from '../services/api';

function StaffAssignment() {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchStaff, setSearchStaff] = useState('');
  const [searchVendor, setSearchVendor] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignmentDate, setAssignmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [role, setRole] = useState('');

  // Fetch all data from database
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [staffData, vendorData, assignmentData] = await Promise.all([
        staffAPI.getAll(),
        vendorsAPI.getAll(),
        assignmentsAPI.getAll()
      ]);
      setStaffList(staffData || []);
      setVendorList(vendorData || []);
      setAssignments(assignmentData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if staff is available for selected date/time
  const isStaffAvailable = (staff) => {
    if (!staff.assignedDates || staff.assignedDates.length === 0) return true;
    
    return !staff.assignedDates.some(assignment => {
      if (assignment.date !== assignmentDate) return false;
      // Check time overlap
      const assignStart = assignment.startTime;
      const assignEnd = assignment.endTime;
      const newStart = startTime + ':00';
      const newEnd = endTime + ':00';
      
      return (newStart < assignEnd && newEnd > assignStart);
    });
  };

  const filteredStaff = staffList.filter(staff => {
    const name = (staff.name || staff.username || '').toLowerCase();
    const skills = (staff.skills || []).join(' ').toLowerCase();
    const search = searchStaff.toLowerCase();
    return name.includes(search) || skills.includes(search);
  });

  const filteredVendors = vendorList.filter(vendor => {
    const name = (vendor.name || '').toLowerCase();
    const location = (vendor.location || '').toLowerCase();
    const search = searchVendor.toLowerCase();
    return name.includes(search) || location.includes(search);
  });

  const handleCreateAssignment = async () => {
    if (!selectedStaff || !selectedVendor) {
      alert('Please select both staff and vendor');
      return;
    }

    if (!role) {
      alert('Please enter a role for this assignment');
      return;
    }

    try {
      const newAssignment = {
        vendor_id: selectedVendor.id,
        user_id: selectedStaff.id,
        date: assignmentDate,
        start_time: startTime + ':00',
        end_time: endTime + ':00',
        role: role,
        status: 'scheduled'
      };

      console.log('Creating assignment with data:', newAssignment);
      
      const result = await assignmentsAPI.create(newAssignment);
      console.log('Assignment created:', result);
      
      await fetchAllData(); // Refresh all data
      
      // Reset form
      setSelectedStaff(null);
      setSelectedVendor(null);
      setRole('');
      setAssignmentDate(new Date().toISOString().split('T')[0]);
      setStartTime('09:00');
      setEndTime('17:00');
      
      alert('Assignment created successfully!');
    } catch (error) {
      console.error('Error creating assignment:', error);
      console.error('Error details:', error.response || error.message);
      alert(`Failed to create assignment: ${error.message || 'Please try again.'}`);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await assignmentsAPI.delete(assignmentId);
        await fetchAllData(); // Refresh data
        alert('Assignment deleted successfully!');
      } catch (error) {
        console.error('Error deleting assignment:', error);
        alert('Failed to delete assignment. Please try again.');
      }
    }
  };

  const handleConfirmAssignment = async (assignmentId) => {
    try {
      await assignmentsAPI.update(assignmentId, { status: 'checked-in' });
      await fetchAllData(); // Refresh data
      alert('Assignment confirmed successfully!');
    } catch (error) {
      console.error('Error confirming assignment:', error);
      alert('Failed to confirm assignment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
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
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-black">Staff Assignment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-black mb-6">Create New Assignment</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staff Selection */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Select Staff</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchStaff}
                  onChange={(e) => setSearchStaff(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredStaff.map((staff) => {
                  const available = isStaffAvailable(staff);
                  const assignmentOnDate = staff.assignedDates?.find(a => a.date === assignmentDate);
                  
                  return (
                    <div
                      key={staff.id}
                      onClick={() => available && setSelectedStaff(staff)}
                      className={`p-4 border rounded-lg transition-all ${
                        !available 
                          ? 'border-red-200 bg-red-50 cursor-not-allowed opacity-70'
                          : selectedStaff?.id === staff.id
                            ? 'border-blue-500 bg-blue-50 cursor-pointer'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-black">{staff.name || staff.username}</h4>
                          <p className="text-sm text-gray-600">
                            {staff.skills && staff.skills.length > 0 ? staff.skills.join(', ') : 'No skills listed'}
                          </p>
                          <p className="text-xs text-gray-500">{staff.phone || 'N/A'}</p>
                          {assignmentOnDate && (
                            <p className="text-xs text-red-600 mt-1">
                              Assigned: {assignmentOnDate.startTime?.slice(0,5)} - {assignmentOnDate.endTime?.slice(0,5)} @ {assignmentOnDate.vendorName}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            !available 
                              ? 'bg-red-100 text-red-800'
                              : (staff.staff_status || staff.status) === 'available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {!available ? 'Unavailable' : (staff.staff_status || staff.status || 'available')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vendor Selection */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Select Vendor</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchVendor}
                  onChange={(e) => setSearchVendor(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    onClick={() => setSelectedVendor(vendor)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedVendor?.id === vendor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-black">{vendor.name}</h4>
                      <p className="text-sm text-gray-600">{vendor.location}</p>
                      <p className="text-xs text-gray-500">{vendor.contact || vendor.phone}</p>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {vendor.status || 'active'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={assignmentDate}
                onChange={(e) => setAssignmentDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Time *</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Waiter, Chef"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCreateAssignment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Assignment
            </button>
          </div>
        </div>

        {/* Current Assignments */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-6">Current Assignments</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Staff</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Vendor</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-black">{assignment.staffName || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{assignment.role || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{assignment.vendorName || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{assignment.date}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {assignment.startTime} - {assignment.endTime}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          assignment.status === 'checked-in' || assignment.status === 'checked-out'
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {assignment.status === 'scheduled' && (
                            <button 
                              onClick={() => handleConfirmAssignment(assignment.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Confirm Assignment"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAssignment(assignment.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete Assignment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No assignments found. Create your first assignment above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAssignment;
