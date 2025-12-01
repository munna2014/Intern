import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin, Briefcase, Store
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { assignmentsAPI } from '../services/api';

function StaffProfile({ staff: propStaff, onBack, onUpdate }) {
  const navigate = useNavigate();
  const { user: staff } = useAuth();
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [myAssignments, setMyAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch staff's assignments from database
  useEffect(() => {
    const fetchMyAssignments = async () => {
      try {
        setLoading(true);
        const allAssignments = await assignmentsAPI.getAll();
        // Filter assignments for current user
        const myShifts = (allAssignments || []).filter(
          a => a.staffId === staff?.id
        );
        setMyAssignments(myShifts);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (staff?.id) {
      fetchMyAssignments();
    }
  }, [staff?.id]);

  // Convert assignments to calendar format
  const scheduledShifts = myAssignments.map(a => {
    const date = new Date(a.date);
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      time: `${a.startTime} - ${a.endTime}`,
      location: a.vendorName,
      type: a.role,
      status: a.status,
      id: a.id
    };
  });


  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/staff');
    }
  };

  // Enhanced calendar generation
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Navigation functions
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonthName = monthNames[currentMonth];

  const realCurrentDay = today.getDate();
  const isCurrentMonthAndYear = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

  const selectedShift = scheduledShifts.find(
    shift => shift.day === selectedDate && shift.month === currentMonth && shift.year === currentYear
  );

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex">
            <div className="flex-1 p-8 overflow-auto">
              {/* Upcoming Shifts from Database */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Shifts</h2>
                  <span className="text-sm text-gray-500">{myAssignments.filter(a => a.status === 'scheduled').length} scheduled</span>
                </div>
                {myAssignments.filter(a => a.status === 'scheduled').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myAssignments
                      .filter(a => a.status === 'scheduled')
                      .slice(0, 6)
                      .map((shift) => (
                        <div key={shift.id} className="group">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
                            <div className="text-sm font-bold mb-2">{shift.date}</div>
                            <div className="text-xs mb-1 opacity-90">{shift.role}</div>
                            <div className="text-sm font-semibold">{shift.startTime} - {shift.endTime}</div>
                            <div className="text-xs mt-2 opacity-80 flex items-center gap-1">
                              <Store className="w-3 h-3" />
                              {shift.vendorName}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No upcoming shifts</p>
                  </div>
                )}
              </div>

              {/* Enhanced Current Schedule */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{currentMonthName} {currentYear} Schedule</h2>
                  <div className="flex gap-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Assignees</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>This Month</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Locations</option>
                    </select>
                  </div>
                </div>
                
                {/* Enhanced Calendar View */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handlePreviousMonth}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                          title="Previous month"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold">{currentMonthName} {currentYear}</h3>
                        <button 
                          onClick={handleNextMonth}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                          title="Next month"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">Month</button>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Week</button>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Day</button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {weekDays.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-700 py-3">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => {
                        if (day === null) {
                          return <div key={index} className="h-14"></div>;
                        }
                        
                        const isSelected = day === selectedDate;
                        const isToday = isCurrentMonthAndYear && day === realCurrentDay;
                        const hasShift = scheduledShifts.some(
                          shift => shift.day === day && shift.month === currentMonth && shift.year === currentYear
                        );
                        const isOff = [4, 11, 18, 25].includes(day);
                        
                        return (
                          <div
                            key={index}
                            className={`h-14 flex flex-col items-center justify-center rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-lg transform scale-105' 
                                : isOff 
                                  ? 'bg-gray-100 text-gray-400'
                                  : hasShift 
                                    ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 font-medium'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedDate(day)}
                          >
                            <span>{day}</span>
                            {isToday && <span className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-blue-600'}`}>Today</span>}
                            {hasShift && !isSelected && <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {selectedShift && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Shift Details for {currentMonthName} {selectedDate}
                      </h4>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <CalendarDays className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{selectedShift.type}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedShift.time}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedShift.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar - My Shifts */}
            <div className="w-96 bg-white border-l border-gray-100 p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">My Shifts</h3>
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading shifts...</div>
                ) : myAssignments.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No shifts assigned yet</p>
                    <p className="text-sm text-gray-400">Your assigned shifts will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {myAssignments.map((shift) => (
                      <div key={shift.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-gray-900">{shift.date}</span>
                            <div className="text-xs text-gray-500 mt-1">{shift.role}</div>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            shift.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                            shift.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {shift.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                            {shift.startTime} - {shift.endTime}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Store className="w-4 h-4 mr-2 text-blue-500" />
                            {shift.vendorName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
    </div>
  );
}

export default StaffProfile;