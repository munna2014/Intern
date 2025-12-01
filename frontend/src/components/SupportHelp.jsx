import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, Book, FileText, Video, Users, Search, ChevronRight, Calendar } from 'lucide-react';

function SupportHelp() {
  const helpCategories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of StaffFlow',
      articles: 12,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Schedule Management',
      description: 'Manage your work schedule',
      articles: 8,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work with your team effectively',
      articles: 15,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FileText,
      title: 'Reports & Analytics',
      description: 'Understanding your performance data',
      articles: 6,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const popularArticles = [
    {
      title: 'How to clock in and out',
      category: 'Getting Started',
      views: 1234
    },
    {
      title: 'Requesting time off',
      category: 'Schedule Management',
      views: 892
    },
    {
      title: 'Viewing your work history',
      category: 'Reports & Analytics',
      views: 756
    },
    {
      title: 'Updating your profile',
      category: 'Account Settings',
      views: 645
    }
  ];

  const contactOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Call Now'
    },
    {
      icon: Video,
      title: 'Video Call',
      description: 'Schedule a video consultation',
      availability: 'By appointment',
      action: 'Schedule Call'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Help</h1>
          <p className="text-gray-600">Find answers, get support, and learn how to use StaffFlow effectively</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.articles} articles</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="divide-y divide-gray-200">
                {popularArticles.map((article, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">{article.category}</span>
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <option.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      <p className="text-xs text-gray-500 mb-3">{option.availability}</p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        {option.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Help */}
            <div className="mt-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <HelpCircle className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Need immediate help?</h3>
              <p className="text-sm mb-4 opacity-90">Our support team is here to assist you with any questions or issues.</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportHelp;
