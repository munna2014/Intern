import React from 'react';

function TestMASA() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gradient">MASA AI Style Test</h1>
          <p className="text-xl text-gray-600">Testing the new design system</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Save 6 hours a week</h3>
            <p className="text-gray-600">One-click schedules that hit labour-law limits automatically.</p>
          </div>

          <div className="card">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cut payroll up to 15%</h3>
            <p className="text-gray-600">Predict daily traffic and staff only when you'll be busy.</p>
          </div>

          <div className="card">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Keep teams happy</h3>
            <p className="text-gray-600">Fair, preference-based rosters sent straight to employees' WhatsApp.</p>
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="btn-primary">
            Join Pilot Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestMASA;
