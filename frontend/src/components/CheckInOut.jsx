import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, LogOut, Filter, Search } from 'lucide-react';

function CheckInOut({ assignments, onCheckIn, onCheckOut }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = assignments.filter((a) => {
    const searchMatch =
      a.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === 'all' || a.status === filterStatus;
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'checked-in':
        return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'checked-out':
        return 'bg-gray-900 text-white border-gray-900';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-black mb-2">Check-In / Check-Out</h2>
        <p className="text-gray-600">Track staff attendance and working hours</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by staff name or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
          </select>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white border border-gray-200 rounded-xl p-6 card-hover cursor-pointer shadow-sm"
            onClick={() => setSelectedAssignment(assignment)}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">{assignment.staffName}</h3>
                <p className="text-sm text-gray-600">{assignment.staffPhone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  assignment.status
                )}`}
              >
                {assignment.status.replace('-', ' ')}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Vendor</p>
                <p className="text-black font-semibold">{assignment.vendorName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Date</p>
                  <p className="text-black font-semibold text-sm">{assignment.date}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Role</p>
                  <p className="text-black font-semibold text-sm">{assignment.role}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2 border border-gray-200">
                <Clock className="w-4 h-4 text-black" />
                <div>
                  <p className="text-xs text-gray-600">Shift Time</p>
                  <p className="text-black font-semibold">
                    {assignment.startTime} - {assignment.endTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Check-In/Out Info */}
            {assignment.checkInTime && (
              <div className="bg-gray-100 rounded-lg p-3 mb-4 border border-gray-200">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Check-In Time</p>
                <p className="text-gray-800 font-semibold">{assignment.checkInTime}</p>
              </div>
            )}

            {assignment.checkOutTime && (
              <div className="bg-gray-100 rounded-lg p-3 mb-4 border border-gray-200">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Check-Out Time</p>
                <p className="text-gray-800 font-semibold">{assignment.checkOutTime}</p>
                {assignment.hoursWorked > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Hours Worked: <span className="text-black font-semibold">{assignment.hoursWorked}h</span>
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {assignment.status === 'scheduled' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckIn(assignment.id);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  Check In
                </button>
              )}
              {assignment.status === 'checked-in' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckOut(assignment.id);
                  }}
                  className="flex-1 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  Check Out
                </button>
              )}
              {assignment.status === 'checked-out' && (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl shadow-sm">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No assignments found</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAssignment && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAssignment(null)}
        >
          <div
            className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-black mb-4">{selectedAssignment.staffName}</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vendor</p>
                <p className="text-black font-semibold">{selectedAssignment.vendorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date</p>
                <p className="text-black font-semibold">{selectedAssignment.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Shift Time</p>
                <p className="text-black font-semibold">
                  {selectedAssignment.startTime} - {selectedAssignment.endTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="text-black font-semibold">{selectedAssignment.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-black font-semibold">
                  {selectedAssignment.status.replace('-', ' ')}
                </p>
              </div>
              {selectedAssignment.checkInTime && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check-In Time</p>
                  <p className="text-gray-800 font-semibold">{selectedAssignment.checkInTime}</p>
                </div>
              )}
              {selectedAssignment.checkOutTime && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check-Out Time</p>
                  <p className="text-gray-800 font-semibold">{selectedAssignment.checkOutTime}</p>
                </div>
              )}
              {selectedAssignment.hoursWorked > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours Worked</p>
                  <p className="text-gray-800 font-semibold">{selectedAssignment.hoursWorked}h</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedAssignment(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckInOut;
