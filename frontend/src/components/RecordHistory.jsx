import React from 'react';
import { ArrowLeft, Clock, Users, TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react';

function RecordHistory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Record & History</h1>
          <p className="text-gray-600">View your work history, attendance records, and performance metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">1,247</span>
            </div>
            <h3 className="text-gray-700 font-medium">Total Hours</h3>
            <p className="text-sm text-gray-500">This month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">95%</span>
            </div>
            <h3 className="text-gray-700 font-medium">Attendance Rate</h3>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">4.8</span>
            </div>
            <h3 className="text-gray-700 font-medium">Performance Score</h3>
            <p className="text-sm text-gray-500">Out of 5.0</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">142</span>
            </div>
            <h3 className="text-gray-700 font-medium">Shifts Completed</h3>
            <p className="text-sm text-gray-500">This year</p>
          </div>
        </div>

        {/* Recent Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Work Records</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Morning Shift</h3>
                      <p className="text-sm text-gray-600">December {15 - item}, 2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">8:00 AM - 4:00 PM</p>
                    <p className="text-sm text-green-600">8 hours completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordHistory;
