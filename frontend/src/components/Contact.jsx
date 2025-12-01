import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle, Menu, X } from 'lucide-react';

function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', project: '' });
  };

  const industries = [
    {
      title: 'Healthcare',
      challenges: [
        'Data privacy and HIPAA compliance',
        'Patient record management',
        'Telehealth integration'
      ],
      solutions: [
        'Secure infrastructure aligned with regulatory standards',
        'Patient-first UX that simplifies complex workflows',
        'Clean, professional UI that builds user trust'
      ]
    },
    {
      title: 'Retail & Hospitality',
      challenges: [
        'Staff scheduling and management',
        'Customer experience optimization',
        'Real-time inventory tracking'
      ],
      solutions: [
        'AI-powered scheduling systems',
        'Seamless customer journey design',
        'Integrated management dashboards'
      ]
    },
    {
      title: 'Finance & Fintech',
      challenges: [
        'KYC, AML, and global compliance',
        'Complex onboarding flows',
        'Real-time payment integrations'
      ],
      solutions: [
        'Frictionless onboarding and verification UX',
        'Secure UI for transactions and money movement',
        'API-driven architecture built for performance'
      ]
    },
    {
      title: 'Education',
      challenges: [
        'Low engagement in learning environments',
        'Accessibility compliance (ADA, WCAG)',
        'Performance under high user loads'
      ],
      solutions: [
        'Gamified UX to keep learners motivated',
        'Adaptive UI for different learning needs',
        'Cloud-based, scalable architecture'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Restaurant Manager',
      content: 'StaffFlow has transformed how we manage our team. Scheduling that used to take hours now takes minutes.',
      rating: 5.0
    },
    {
      name: 'Michael Roberts',
      role: 'Retail Operations Director',
      content: 'The AI-powered scheduling has reduced our labor costs by 15% while improving staff satisfaction.',
      rating: 5.0
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Clinic Administrator',
      content: 'Compliance and scheduling in healthcare is complex, but StaffFlow makes it seamless and secure.',
      rating: 5.0
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition font-semibold inline-flex items-center gap-2"
            >
              Send Another Message
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl x-2 font-bold absolute left-4 cursor-pointer" onClick={() => onNavigate('home')}>StaffFlow</div>
            <div className="hidden md:flex gap-8 mx-auto">
              <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-black transition">Home</button>
              <button onClick={() => onNavigate('home')} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 transition">Services</button>
              <button onClick={() => onNavigate('home')} className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition">Work</button>
              <button onClick={() => onNavigate('home')} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-200 transition">About</button>
              <button className="text-black font-semibold">Contact Us</button>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden md:block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition absolute right-4"
            >
              Launch App
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black absolute right-4"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-lg md:hidden">
          <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => onNavigate('home')} 
              className="block w-full text-left py-2 text-gray-600 hover:text-black transition"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('home')} 
              className="block w-full text-left py-2 bg-orange-100 text-orange-800 rounded-lg font-medium hover:bg-orange-200 transition"
            >
              Services
            </button>
            <button 
              onClick={() => onNavigate('home')} 
              className="block w-full text-left py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition"
            >
              Work
            </button>
            <button 
              onClick={() => onNavigate('home')} 
              className="block w-full text-left py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium hover:bg-yellow-200 transition"
            >
              About
            </button>
            <button 
              className="block w-full text-left py-2 text-black font-semibold"
            >
              Contact
            </button>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="block w-full text-left py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
            >
              Launch App
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Got an idea? 
              <span className="block text-orange-600">Let's talk!</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your workforce management? We're here to help you streamline operations, 
              reduce costs, and improve team satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-black mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-semibold text-black mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition"
                    placeholder="Tell us about your workforce management challenges and goals..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 mr-2 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    By clicking this button you accept Terms of Service and Privacy Policy
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-red-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <a href="mailto:hello@staffflow.com" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition font-medium">
                    <Mail className="w-5 h-5" />
                    hello@staffflow.com
                  </a>
                  <a href="mailto:support@staffflow.com" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition font-medium">
                    <Mail className="w-5 h-5" />
                    support@staffflow.com
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition font-medium">
                    <Phone className="w-5 h-5" />
                    +1 (234) 567-890
                  </a>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <MapPin className="w-5 h-5" />
                    San Francisco, CA & Remote
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-black mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium">
                    LinkedIn
                  </a>
                  <a href="#" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition font-medium">
                    Twitter
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Book a Call</h3>
                <p className="text-white/90 mb-6">
                  Schedule a 30-minute consultation to discuss how StaffFlow can transform your workforce management.
                </p>
                <button className="w-full bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold">
                  Schedule 30min Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Industries We Serve
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Key Industries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in transforming workforce management across various sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{industry.title.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black">{industry.title}</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Common Challenges:
                  </h4>
                  <ul className="space-y-2">
                    {industry.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-orange-500 mt-1">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Our Solutions:
                  </h4>
                  <ul className="space-y-2">
                    {industry.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Client Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              5.0 is our average rating
            </h2>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-black">5.0</div>
                <div className="text-sm text-gray-600">Clutch</div>
              </div>
              <div className="text-center bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-black">4.9</div>
                <div className="text-sm text-gray-600">DesignRush</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
