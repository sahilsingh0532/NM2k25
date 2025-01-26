import React, { useEffect, useRef, useState } from 'react';
import { Play, ChevronRight, ArrowRight, Menu, X, Shield, Zap, Clock, Globe, Leaf, Cloud, Database, Cpu } from 'lucide-react';

function App() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Handle navigation background
      if (navRef.current) {
        if (scrolled > 50) {
          navRef.current.classList.add('nav-scrolled');
        } else {
          navRef.current.classList.remove('nav-scrolled');
        }
      }

      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-100px'
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handlePlayVideo = () => {
    setIsVideoVisible(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-xl font-light">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">RCOP</div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Objectives', 'Solutions', 'Features', 'Research', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg">
            <div className="p-4 space-y-4">
              {['Home', 'Objectives', 'Solutions', 'Features', 'Research', 'Impact', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-white/80 hover:text-white py-2 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <div id="home" className="relative min-h-[150vh] flex items-start justify-center overflow-hidden">
        <div 
          className="fixed inset-0 bg-center bg-cover bg-no-repeat opacity-50 transition-transform duration-1000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80")',
            transform: `scale(${1 + scrollProgress * 0.001})`,
          }}
        />
        <div className="relative z-10 text-center max-w-4xl px-4 pt-[30vh]">
          <h1 className="text-7xl md:text-9xl font-bold mb-8 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            RCOP Initiative
          </h1>
          <p className="text-2xl md:text-3xl mb-12 opacity-90 font-light tracking-wide animate-on-scroll delay-300">
            Creating a sustainable future with optimized food production and resource management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-on-scroll delay-500">
            <button
              onClick={() => {
                window.open("https://www.perplexity.ai/","_blank","noopener,noreferrer");
              }}
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 flex items-center gap-2"
            >
              <Zap className="group-hover:animate-pulse" size={20} />
              PERPLEXITY
            </button>
            <button
            onClick={() => {
              window.open("https://culturalxchange.jimdosite.com/");
            }} 
            className="text-white border border-white/30 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all group">
              RCOP <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      

      {/* Smart Agriculture System */}
      <div id="objectives" className="relative z-10 py-32 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-fade-in">Smart Agriculture System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Soil Health Monitoring",
                description: "IoT sensors collect data on soil moisture, pH levels, and nutrient content"
              },
              {
                icon: Cloud,
                title: "Weather Prediction",
                description: "Arduino-based weather forecasting for informed farming decisions"
              },
              {
                icon: Database,
                title: "Pest Detection",
                description: "ML models analyze images to detect early signs of pest infestations"
              },
              {
                icon: Cpu,
                title: "Automated Irrigation",
                description: "Smart water management based on real-time soil moisture data"
              }
            ].map((feature, index) => (
              
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover-lift "
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution Network */}
      <div id="solutions" className="relative z-10 py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Intelligent Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-slide-left">
              <h3 className="text-2xl font-semibold mb-6">Route Optimization</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Python-based algorithms analyze traffic patterns and delivery schedules to optimize distribution routes, reducing fuel consumption and delivery times.
              </p>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Real-time traffic analysis
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Fuel consumption optimization
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Dynamic route adjustment
                </li>
              </ul>
            </div>
            <div className="animate-slide-right">
              <h3 className="text-2xl font-semibold mb-6">Cold Chain Monitoring</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                IoT sensors monitor temperature and humidity levels during transportation, ensuring perishable goods remain fresh.
              </p>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Real-time temperature tracking
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Humidity control
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="text-purple-500" size={20} />
                  Alert system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Consumer Platform */}
      <div id="features" className="relative z-10 py-32 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Consumer Engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Food Storage Guide",
                description: "Personalized recommendations for optimal food storage and shelf life extension"
              },
              {
                title: "Smart Recipes",
                description: "AI-powered recipe suggestions based on available ingredients"
              },
              {
                title: "Sustainability Tips",
                description: "Practical advice for reducing food waste and sustainable consumption"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-purple-500/20 to-transparent p-8 rounded-2xl backdrop-blur-lg animate-scale"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div id="research" className="relative z-10 py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Implementation Plan</h2>
          <div className="space-y-16">
            {[
              {
                phase: "Phase 1",
                title: "Research and Development",
                items: [
                  "Needs assessment and challenge identification",
                  "Prototype development and testing",
                  "Controlled environment validation"
                ]
              },
              {
                phase: "Phase 2",
                title: "Pilot Testing",
                items: [
                  "Regional implementation",
                  "Stakeholder feedback collection",
                  "Performance metrics monitoring"
                ]
              },
              {
                phase: "Phase 3",
                title: "Full-Scale Deployment",
                items: [
                  "Multi-region rollout",
                  "Training and support programs",
                  "Continuous platform updates"
                ]
              }
            ].map((phase, index) => (
              <div 
                key={index}
                className="animate-on-scroll"
                style={{ animationDelay: `${index * 400}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-purple-500 text-xl font-bold">{phase.phase}</div>
                  <h3 className="text-2xl font-semibold">{phase.title}</h3>
                </div>
                <ul className="space-y-4 text-white/70">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="text-purple-500" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div id="contact" className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in">Join the Future of Agriculture</h2>
          <p className="text-xl md:text-2xl mb-12 text-white/80 animate-slide-left">
            Be part of the revolution in sustainable agriculture and resource optimization.
          </p>
          <button
            onClick={handlePlayVideo}
            className="group px-8 py-4 rounded-full bg-white text-black font-bold text-lg shadow-lg transform transition-all hover:scale-105 flex items-center gap-2 mx-auto "
          >
            <Play className="group-hover:animate-pulse" size={20} />
            Watch Demo
          </button>
        </div>
      </div>


      {isVideoVisible && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsVideoVisible(false)}
        >
          <div className="w-full max-w-6xl aspect-video p-4">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-2xl"
              controls
              src="https://example.com/demo-video.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;