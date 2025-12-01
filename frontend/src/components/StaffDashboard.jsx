import React from 'react';
import { Home, Users, Calendar, TrendingUp, Clock, Activity, AlertCircle, CheckCircle } from 'lucide-react';

function StaffDashboard() {
  const quickStats = [
    {
      title: 'Today\'s Shift',
      value: '8:00 AM - 4:00 PM',
      icon: Clock,
      color: 'bg-blue-500',
      trend: 'In Progress'
    },
    {
      title: 'Hours This Week',
      value: '32.5',
      icon: Activity,
      color: 'bg-green-500',
      trend: '+2.5 from last week'
    },
    {
      title: 'Team Members',
      value: '12',
      icon: Users,
      color: 'bg-purple-500',
      trend: 'All active'
    },
    {
      title: 'Pending Tasks',
      value: '3',
      icon: AlertCircle,
      color: 'bg-orange-500',
      trend: 'Due today'
    }
  ];

  const recentActivities = [
    {
      action: 'Clocked In',
      time: '8:00 AM',
      status: 'completed',
      icon: CheckCircle
    },
    {
      action: 'Shift Started',
      time: '8:00 AM',
      status: 'completed',
      icon: CheckCircle
    },
    {
      action: 'Team Meeting',
      time: '10:00 AM',
      status: 'upcoming',
      icon: Clock
    },
    {
      action: 'Lunch Break',
      time: '12:00 PM',
      status: 'upcoming',
      icon: Clock
    }
  ];

  const upcomingShifts = [
    {
      date: 'Tomorrow',
      time: '8:00 AM - 4:00 PM',
      location: 'Main Office',
      type: 'Regular Shift'
    },
    {
      date: 'Dec 18',
      time: '6:00 PM - 12:00 AM',
      location: 'Downtown Branch',
      type: 'Evening Shift'
    },
    {
      date: 'Dec 19',
      time: 'OFF',
      location: '-',
      type: 'Day Off'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your work today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <activity.icon className={`w-5 h-5 ${
                          activity.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.action}</h3>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Shifts</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingShifts.map((shift, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{shift.date}</h3>
                        <p className="text-sm text-gray-600">{shift.time}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {shift.location}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {shift.type}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                  Clock In/Out
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  View Schedule
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Request Time Off
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Update Availability
                </button>
              </div>
            </div>

            {/* Team Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Team Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Now</span>
                    <span className="font-semibold text-green-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">On Break</span>
                    <span className="font-semibold text-orange-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Off Duty</span>
                    <span className="font-semibold text-gray-600">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
