import { useState, useEffect } from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Zap, Home, Settings, LogOut, X, Clock, MapPin, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { vendorsAPI, staffAPI, assignmentsAPI, staffApplicationsAPI } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vendorsData, staffData, assignmentsData, applicationsData] = await Promise.all([
          vendorsAPI.getAll(),
          staffAPI.getAll(),
          assignmentsAPI.getAll(),
          staffApplicationsAPI.getAll().catch(() => []),
        ]);
        
        setVendors(vendorsData || []);
        setStaff(staffData || []);
        setAssignments(assignmentsData || []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveApplication = async (id) => {
    try {
      await staffApplicationsAPI.approve(id, '');
      const updated = await staffApplicationsAPI.getAll();
      setApplications(Array.isArray(updated) ? updated : []);
    } catch (error) {
      alert('Failed to approve application');
    }
  };

  const handleRejectApplication = async (id) => {
    try {
      await staffApplicationsAPI.reject(id, '');
      const updated = await staffApplicationsAPI.getAll();
      setApplications(Array.isArray(updated) ? updated : []);
    } catch (error) {
      alert('Failed to reject application');
    }
  };
  
  
  const totalVendors = vendors.length;
  const totalStaff = staff.length;
  const availableStaff = staff.filter(s => s.status === 'available').length;
  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter((a) => a.status === 'checked-out').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGenerateSchedule = async () => {
    try {
      const result = await assignmentsAPI.generate();
      
      if (result.success) {
        // Refresh assignments
        const updatedAssignments = await assignmentsAPI.getAll();
        setAssignments(updatedAssignments);
        setGeneratedSchedule(updatedAssignments);
        setShowScheduleModal(true);
        alert(`Schedule generated successfully! ${result.data.count} assignments created.`);
      } else {
        alert('Failed to generate schedule. Please try again.');
      }
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Failed to generate schedule. Please try again.');
    }
  };

  const handleCheckIn = async (assignmentId) => {
    try {
      await assignmentsAPI.checkIn(assignmentId);
      // Refresh assignments
      const updatedAssignments = await assignmentsAPI.getAll();
      setAssignments(updatedAssignments);
      alert(`GPS Time Clock: Staff checked in at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in. Please try again.');
    }
  };

  const handleCheckOut = async (assignmentId) => {
    try {
      await assignmentsAPI.checkOut(assignmentId);
      // Refresh assignments
      const updatedAssignments = await assignmentsAPI.getAll();
      setAssignments(updatedAssignments);
      alert(`GPS Time Clock: Staff checked out at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to check out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-black">StaffFlow Admin</h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 text-black font-medium hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/assignments')}
                  className="flex items-center gap-2 text-gray-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg"
                >
                  <Users className="w-4 h-4" />
                  Staff Assignment
                </button>

                {isAdmin() && (
                  <>
                    <button
                      onClick={() => navigate('/staff')}
                      className="flex items-center gap-2 text-gray-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg"
                    >
                      <Users className="w-4 h-4" />
                      Staff List
                    </button>
                    <button
                      onClick={() => navigate('/vendors')}
                      className="flex items-center gap-2 text-gray-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg"
                    >
                      <Calendar className="w-4 h-4" />
                      Vendor List
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center gap-2 text-gray-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg"
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all px-3 py-2 rounded-lg">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* MASA AI Hero Section */}
        <div className="bg-gradient-to-r from-gray-600 to-purple-400 text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Schedule in Seconds, Not Days</h2>
          <p className="text-lg mb-6">Automate scheduling in under 30 seconds with AI-powered demand forecasting</p>
          <div className="flex gap-4">
            <button
              onClick={handleGenerateSchedule}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              One-Click Schedule Generation
            </button>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <span className="font-semibold">247% Working Hours Saved</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Vendors</p>
                <p className="text-2xl font-bold text-black">{totalVendors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => navigate('/staff')}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Available Staff</p>
                <p className="text-2xl font-bold text-black">{availableStaff} / {totalStaff}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Today's Assignments</p>
                <p className="text-2xl font-bold text-black">{totalAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-black">{totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vendor Management */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4">Vendor Management</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {vendors.length > 0 ? (
                vendors.map((vendor) => {
                  const vendorAssignments = assignments.filter(a => a.vendorId === vendor.id);
                  return (
                    <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-black-600 hover:text-white transition-colors">{vendor.name}</h4>
                          <p className="text-black-600 text-sm hover:text-white transition-colors">{vendor.location}</p>
                          <p className="text-black-500 text-xs hover:text-white transition-colors">{vendor.contact}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {vendorAssignments.length} assignments
                        </span>
                      </div>
                      {vendorAssignments.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {vendorAssignments.slice(0, 3).map((assignment) => (
                            <div key={assignment.id} className="text-sm text-gray-600 flex justify-between bg-white p-2 rounded hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-colors">
                              <span className="hover:text-white transition-colors">
                                {assignment.date} • {assignment.startTime}-{assignment.endTime}
                              </span>
                              <span className="text-blue-600 font-medium hover:text-white transition-colors">{assignment.role}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-4">No vendors found. Add vendors to get started.</p>
              )}
            </div>
          </div>

          {/* Check-in/Check-out System */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4">GPS Time Clock</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-black-600 text-sm hover:text-white transition-colors">{assignment.staffName}</h4>
                        <p className="text-black-600 text-xs hover:text-white transition-colors">{assignment.vendorName}</p>
                        <p className="text-black-500 text-xs hover:text-white transition-colors">{assignment.date} • {assignment.startTime}-{assignment.endTime}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    
                    {assignment.checkInTime && (
                      <div className="text-xs text-green-600 mb-1">
                        ✓ Checked in: {assignment.checkInTime}
                      </div>
                    )}
                    
                    {assignment.checkOutTime && (
                      <div className="text-xs text-gray-600 mb-1">
                        ✓ Checked out: {assignment.checkOutTime}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-2">
                      {assignment.status === 'scheduled' && (
                        <button
                          onClick={() => handleCheckIn(assignment.id)}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-black transition-colors"
                        >
                          Check In
                        </button>
                      )}
                      {assignment.status === 'checked-in' && (
                        <button
                          onClick={() => handleCheckOut(assignment.id)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-black transition-colors"
                        >
                          Check Out
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No assignments today. Generate a schedule to get started.</p>
              )}
            </div>
          </div>
        </div>

        {/* Staff Availability */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-4">Staff Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.length > 0 ? (
              staff.map((staffMember) => (
                <div key={staffMember.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all hover:shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-black-600 hover:text-white transition-colors">{staffMember.name}</h4>
                      <p className="text-black-600 text-sm hover:text-white transition-colors">
                        {staffMember.skills && staffMember.skills.length > 0 ? staffMember.skills.join(', ') : 'No skills listed'}
                      </p>
                      <p className="text-black-500 text-xs hover:text-white transition-colors">{staffMember.phone}</p>
                      <p className="text-black-500 text-xs hover:text-white transition-colors">
                        Max: {staffMember.max_hours_per_week || 40}h/week • Current: {staffMember.current_hours || 0}h
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      staffMember.status === 'available' ? 'bg-green-100 text-green-800' :
                      staffMember.status === 'unavailable' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {staffMember.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 col-span-3">No staff members found. Add staff to get started.</p>
            )}
          </div>
        </div>

        {/* Staff Applications from Managers */}
        {isAdmin() && (
          <div className="mt-8 bg-white border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black">Staff Requests from Managers</h3>
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  {applications.filter(a => a.status === 'pending').length} pending
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            app.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            {app.status === 'pending' ? <Clock className="w-3 h-3" /> :
                             app.status === 'approved' ? <CheckCircle className="w-3 h-3" /> :
                             <XCircle className="w-3 h-3" />}
                            {app.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {app.eventDate && `Event: ${app.eventDate}`}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">
                          <span className="text-purple-600">{app.managerName}</span> requests {app.staffCount} staff
                          {app.vendorName && (
                            <span className="ml-2 text-sm text-gray-500">
                              for <span className="font-medium text-indigo-600">{app.vendorName}</span>
                            </span>
                          )}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">{app.description}</p>
                      </div>
                      {app.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApproveApplication(app.id)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectApplication(app.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No staff requests from managers yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Generated Work Schedule</h2>
                  <p className="text-blue-100">MASA AI - Optimized schedule in under 30 seconds</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-white hover:bg-black p-2 rounded-lg transition-all hover:shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Calendar View */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">January 2024 Calendar</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const hasSchedule = generatedSchedule.some(shift => {
                        const shiftDay = parseInt(shift.date.split('-')[2]);
                        return shiftDay === day;
                      });
                      
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition
                            ${hasSchedule 
                              ? 'bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200' 
                              : 'text-gray-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          <span>{day}</span>
                          {hasSchedule && (
                            <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Schedule List */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-black">Scheduled Shifts</h3>
                {generatedSchedule.length > 0 ? (
                  generatedSchedule.map((shift) => (
                    <div key={shift.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-purple-400 hover:text-white transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-black hover:text-white transition-colors">{shift.staffName}</h3>
                            <p className="text-gray-600 text-sm hover:text-white transition-colors">{shift.role}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          {shift.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors">
                          <Calendar className="w-4 h-4" />
                          <span>{shift.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors">
                          <Clock className="w-4 h-4" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 hover:text-white transition-colors">
                          <span className="font-medium text-black hover:text-white transition-colors">Vendor:</span> {shift.vendorName}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No schedule generated yet.</p>
                )}
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    alert('Schedule distributed to all staff via SMS and Email');
                    setShowScheduleModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-all hover:shadow-lg"
                >
                  Distribute Schedule to Staff
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-black hover:text-white transition-all hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
