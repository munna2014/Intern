import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Calendar, Users, BarChart3, TrendingUp, Zap, CheckCircle, Globe, Target, Sparkles } from 'lucide-react';

function Home({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [servicesImageIndex, setServicesImageIndex] = useState(0);
  const [workImageIndex, setWorkImageIndex] = useState(0);
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [amazingSentence, setAmazingSentence] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = React.createRef();
  const workRef = React.createRef();
  const aboutRef = React.createRef();
  const ctaRef = React.createRef();
  const heroRef = React.createRef();

  const clientStories = [
    {
      content: "StaffFlow has transformed how we manage our team. Scheduling that used to take hours now takes minutes.",
      author: "Sarah Chen",
      role: "Restaurant Manager"
    },
    {
      content: "The AI-powered scheduling has reduced our labor costs by 15% while improving staff satisfaction.",
      author: "Michael Roberts",
      role: "Retail Operations Director"
    },
    {
      content: "Compliance and scheduling in healthcare is complex, but StaffFlow makes it seamless and secure.",
      author: "Dr. Emily Watson",
      role: "Clinic Administrator"
    }
  ];
  const amazingSentences = [
    'Empowering teams to schedule, scale, and succeed',
    'From MVP to market domination – your reliable partner in workforce scheduling and management',
    'Unlock the full potential of your team with StaffFlow',
    'Transform your workforce management with AI-powered scheduling',
    'Experience the future of workforce management today',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAmazingSentence(amazingSentences[Math.floor(Math.random() * amazingSentences.length)]);
    }, 4000); // Change sentence every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);





  const services = [
    {
      title: 'AI Scheduling',
      description: 'Intelligent shift allocation based on demand forecasting and staff preferences',
    },
    {
      title: 'Real-time Analytics',
      description: 'Monitor labor costs, utilization rates, and team performance in real-time',
    },
    {
      title: 'Compliance Management',
      description: 'Automatic labor law compliance with customizable rules and alerts',
    },
    {
      title: 'Team Communication',
      description: 'Instant roster updates via WhatsApp and in-app notifications',
    },
    {
      title: 'Attendance Tracking',
      description: 'GPS-enabled check-in/out with automated time tracking',
    },
    {
      title: 'Cost Optimization',
      description: 'Predict traffic patterns and optimize staffing levels automatically',
    },
  ];

  const caseStudies = [
    {
      title: 'Restaurant Chain Optimization',
      description: 'Reduced scheduling time by 80% and improved staff satisfaction',
      metrics: '6 hours saved per week',
      industry: 'Food & Beverage',
    },
    {
      title: 'Retail Staff Management',
      description: 'Automated shift allocation across 15 locations',
      metrics: '15% payroll reduction',
      industry: 'Retail',
    },
    {
      title: 'Hospitality Workforce',
      description: 'Fair roster system increased employee retention',
      metrics: '35% improvement',
      industry: 'Hospitality',
    },
  ];






  const backgroundImages = [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&h=1080&fit=crop&crop=center&auto=format'
  ];

  const servicesBackgroundImages = [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&h=1080&fit=crop&auto=format'
  ];

  const workBackgroundImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&h=1080&fit=crop&auto=format'
  ];

  const aboutBackgroundImages = [
    'https://images.unsplash.com/photo-1517248135467-4c5edcad316d?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&auto=format'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServicesImageIndex((prevIndex) => (prevIndex + 1) % servicesBackgroundImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkImageIndex((prevIndex) => (prevIndex + 1) % workBackgroundImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutImageIndex((prevIndex) => (prevIndex + 1) % aboutBackgroundImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Hours Saved Weekly', value: '6+' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Cost Reduction', value: '15%' },
    { label: 'Active Users', value: '500+' },
  ];

      return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl x-2 font-bold absolute left-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>StaffFlow</div>
            <div className="hidden md:flex gap-8 mx-auto">
              <button onClick={() => window.scrollTo({ top: document.getElementById('services').offsetTop - 64, behavior: 'smooth' })} className="text-gray-600 hover:text-black transition">Services</button>
              <button onClick={() => window.scrollTo({ top: document.getElementById('work').offsetTop - 64, behavior: 'smooth' })} className="text-gray-600 hover:text-black transition">Work</button>
              <button onClick={() => window.scrollTo({ top: document.getElementById('about').offsetTop - 64, behavior: 'smooth' })} className="text-gray-600 hover:text-black transition">About</button>
              <button onClick={() => onNavigate('contact')} className="text-gray-600 hover:text-black transition">Contact Us</button>
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
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 md:hidden">
          <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('services').offsetTop - 64, behavior: 'smooth' })} 
              className="block w-full text-left py-2 text-gray-600 hover:text-black transition"
            >
              Services
            </button>
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('work').offsetTop - 64, behavior: 'smooth' })} 
              className="block w-full text-left py-2 text-gray-600 hover:text-black transition"
            >
              Work
            </button>
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('about').offsetTop - 64, behavior: 'smooth' })} 
              className="block w-full text-left py-2 text-gray-600 hover:text-black transition"
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="block w-full text-left py-2 text-gray-600 hover:text-black transition"
            >
              Contact Us
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
      <section className="relative overflow-hidden pt-32 pb-24 min-h-screen">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Waiter serving background ${index + 1}`}
                className="w-full h-full object-cover blur-sm"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className={`space-y-6 transform transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                StaffFlow<br />
                <span className={`text-gray-200 inline-block min-h-[1.2em] transition-all duration-500 ease-in-out ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  {amazingSentence}
                </span>
              </h1>
              <div className={`text-2xl md:text-3xl font-bold text-white transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Build your product & gain market traction
              </div>
              <p className={`text-xl text-white max-w-2xl transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Transform your workforce management with intelligent scheduling and real-time analytics
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold flex items-center justify-center gap-2"
              >
                Launch App
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition font-semibold"
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-t border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-black">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="relative bg-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {servicesBackgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === servicesImageIndex ? 'opacity-10' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Restaurant service background ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Complete workforce management solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-0 group-hover:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={workRef} id="work" className="relative bg-gray-50 py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {workBackgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === workImageIndex ? 'opacity-10' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Restaurant work background ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-black mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600">
              Proven results across industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
                <p className="text-sm font-semibold text-gray-600 mb-3 group-hover:text-gray-300">{study.industry}</p>
                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-white">
                  {study.title}
                </h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-300">{study.description}</p>
                <p className="text-lg font-bold text-black group-hover:text-white">{study.metrics}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Client Wins */}
      <section ref={aboutRef} id="about" className="relative bg-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {aboutBackgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === aboutImageIndex ? 'opacity-10' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Restaurant success background ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-4">Featured Client Wins</h2>
            <p className="text-xl text-gray-600 mb-8">
              Trusted by leading companies worldwide
            </p>
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-black">98%</p>
                <p className="text-gray-600">Client satisfaction rate</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-black">+45%</p>
                <p className="text-gray-600">Boost in efficiency after implementation</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-black">500+</p>
                <p className="text-gray-600">Staff teams managed daily</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-black">$2.5M</p>
                <p className="text-gray-600">Labor costs saved by clients</p>
              </div>
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">Restaurant</div>
                <h3 className="text-2xl font-bold text-black group-hover:text-white">Restaurant Chain Optimization</h3>
              </div>
              <p className="text-gray-600 mb-4 group-hover:text-gray-300">Reduced scheduling time by 80% and improved staff satisfaction across 15 locations</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Time Saved</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">6 hours per week</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Staff Retention</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">+35%</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-300">Technology Stack</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Node.js</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">Retail</div>
                <h3 className="text-2xl font-bold text-black group-hover:text-white">Retail Staff Management</h3>
              </div>
              <p className="text-gray-600 mb-4 group-hover:text-gray-300">Automated shift allocation across 15 locations with real-time adjustments</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Payroll Reduction</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">15%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Coverage Rate</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">98%</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-300">Technology Stack</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Python</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">AWS</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">Hospitality</div>
                <h3 className="text-2xl font-bold text-black group-hover:text-white">Hospitality Workforce</h3>
              </div>
              <p className="text-gray-600 mb-4 group-hover:text-gray-300">Fair roster system increased employee retention and guest satisfaction</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Retention Improvement</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">35%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Guest Satisfaction</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">4.8/5</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-300">Technology Stack</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Next.js</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">TypeScript</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">MongoDB</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-8 border border-gray-200 hover:bg-black hover:border-black hover:scale-105 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">Healthcare</div>
                <h3 className="text-2xl font-bold text-black group-hover:text-white">Healthcare Staff Scheduling</h3>
              </div>
              <p className="text-gray-600 mb-4 group-hover:text-gray-300">HIPAA-compliant scheduling system for medical staff across multiple facilities</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Compliance Rate</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">100%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">Overtime Reduction</p>
                  <p className="text-xl font-bold text-black group-hover:text-white">25%</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-300">Technology Stack</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Python</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">AWS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Testimonials */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">What Our Clients Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clientStories.map((story, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-gray-600 mb-4 italic">"{story.content}"</p>
                  <p className="font-semibold text-black">{story.author}</p>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Need Staff?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's chat about how StaffFlow can transform your workforce management
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-black font-bold mb-4">StaffFlow</h3>
              <p className="text-sm text-gray-600">Workforce scheduling made simple</p>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#services" className="hover:text-black transition">Services</a></li>
                <li><a href="#work" className="hover:text-black transition">Work</a></li>
                <li><a href="#about" className="hover:text-black transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Blog</a></li>
                <li><a href="#" className="hover:text-black transition">Careers</a></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-black transition text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition">Terms</a></li>
                <li><a href="#" className="hover:text-black transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 - 2025 StaffFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
