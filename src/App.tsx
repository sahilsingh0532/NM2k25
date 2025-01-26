import React, { useEffect, useRef, useState } from 'react';
import { Play, ChevronRight, ArrowRight } from 'lucide-react';

function App() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

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
    handleScroll(); // Initial check
    
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

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[150vh] flex items-start justify-center overflow-hidden">
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
          Creating a sustainable future with optimized food production and resource management.          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-on-scroll delay-500">
            <button 
              onClick={handlePlayVideo}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-all group"
            >
              <Play size={20} className="group-hover:scale-110 transition-transform" /> Watch Demo
            </button>
            <button className="text-white border border-white/30 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all group">
              RCOP <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

            {/* Objectives Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        <h2 className="text-5xl font-bold text-center mb-16 animate-on-scroll">
          Key Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            {
              title: 'Enhance Production',
              description:
                'Leverage data-driven insights and automation to boost agricultural output.',
              icon: '🌾',
            },
            {
              title: 'Efficient Distribution',
              description:
                'Minimize waste and ensure timely delivery with optimized channels.',
              icon: '🚚',
            },
            {
              title: 'Sustainable Consumption',
              description:
                'Educate consumers on food storage and promote sustainable practices.',
              icon: '♻️',
            },
            {
              title: 'Renewable Energy',
              description:
                'Integrate solar and other renewable solutions for food storage.',
              icon: '🔋',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 bg-gray-800 rounded-lg shadow-lg animate-on-scroll"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology-Driven Solutions */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        <h2 className="text-5xl font-bold text-center mb-16 animate-on-scroll">
          Technology-Driven Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            {
              title: 'Smart Agriculture System',
              description:
                'IoT sensors, machine learning, and automated irrigation systems optimize crop production.',
              icon: '📡',
            },
            {
              title: 'Intelligent Distribution Network',
              description:
                'Route optimization and cold chain monitoring ensure fresh and timely delivery.',
              icon: '📦',
            },
            {
              title: 'Consumer Engagement Platform',
              description:
                'Personalized recommendations, recipe suggestions, and sustainability tips empower consumers.',
              icon: '🛒',
            },
            {
              title: 'Renewable Energy Integration',
              description:
                'Solar-powered cold storage and energy-efficient refrigeration systems.',
              icon: '☀️',
            },
          ].map((solution, index) => (
            <div
              key={index}
              className="solution-card p-6 bg-gray-800 rounded-lg shadow-lg animate-on-scroll"
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-4">
                <span className="text-2xl">{solution.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{solution.title}</h3>
              <p className="text-gray-300 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Call to Action */}
      <div className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-on-scroll">
          Join the Movement
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto animate-on-scroll delay-200">
          Collaborate with us to revolutionize the future of food security and sustainability.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-all group animate-on-scroll delay-400">
            Get Started <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
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