import { useEffect, useState } from 'react';
import gsap from 'gsap';

const PreLoader = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 8;
        return next > 100 ? 100 : next;
      });
    }, 150);

    // Create star field animation
    const starField = gsap.timeline({ repeat: -1 });
    starField.fromTo('.star-field', 
      { rotation: 0, scale: 1 },
      { rotation: 360, scale: 1.1, duration: 100, ease: "none" }
    );

    // Initial animation sequence
    tl.fromTo('.space-glow',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.5, duration: 1.5, ease: "power2.out" }
    ).fromTo('.constellation',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=1"
    ).fromTo('.stars',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
      "-=0.5"
    ).fromTo('.spaceship',
      { y: 50, opacity: 0, scale: 0 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    ).fromTo('.engine-glow',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 0.8, duration: 0.5, repeat: -1, yoyo: true }
    );

    // Floating animation
    gsap.to('.spaceship', {
      y: '-=15',
      x: '+=5',
      rotation: '+=3',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      clearInterval(interval);
      starField.kill();
    };
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            gsap.to('.preloader', {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => onLoadComplete?.()
            });
          }, 500);
        }
      });

      // Launch sequence
      tl.to('.spaceship', {
        y: -400,
        x: '+=50',
        rotation: -15,
        scale: 0.3,
        duration: 2,
        ease: "power3.in"
      }).to('.engine-glow', {
        scaleY: 3,
        opacity: 1,
        duration: 0.5
      }, "-=2"
      ).to('.space-glow', {
        scale: 1.5,
        opacity: 0,
        duration: 1.5
      }, "-=1.5"
      ).to('.loading-text', {
        opacity: 0,
        y: 20,
        duration: 0.5
      }, "-=1");
    }
  }, [loadingProgress, onLoadComplete]);

  return (
    <div className="preloader fixed inset-0 bg-gradient-to-br from-[#1a1c2c] to-[#4389A2] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Star field background */}
      <div className="star-field absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #1a1c2c 70%)' }}></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 2px #fff'
            }}
          />
        ))}
      </div>

      <div className="relative w-64 h-64">
        {/* Space glow effect */}
        <div className="space-glow absolute w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl"></div>

        {/* Constellation */}
        <div className="constellation absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                boxShadow: '0 0 15px #60A5FA'
              }}
            />
          ))}
        </div>

        {/* Spaceship */}
        <div className="spaceship absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <svg width="64" height="64" viewBox="0 0 24 24" className="filter drop-shadow-lg">
              <defs>
                <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#93C5FD', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path 
                d="M12 2L7 8V14L4 18H20L17 14V8L12 2Z" 
                fill="url(#shipGradient)"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="3" fill="#4389A2" className="glow-effect" />
              <path d="M9 16L7 20H17L15 16" fill="#4389A2" />
            </svg>

            {/* Engine glow */}
            <div className="engine-glow absolute left-1/2 -bottom-8 -translate-x-1/2 w-4 h-16 origin-top">
              <div className="w-full h-full bg-gradient-to-b from-blue-400 via-purple-400 to-transparent opacity-75 rounded-full blur-md"></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white via-blue-200 to-transparent opacity-50 rounded-full scale-75"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading text and progress */}
      <div className="loading-text mt-20 text-center">
        <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
          Initiating Launch Sequence
        </div>
        <div className="text-sm text-blue-200 mb-3 font-medium tracking-wider">
          SYSTEM CALIBRATION {Math.round(loadingProgress)}%
        </div>
        <div className="w-64 h-2 bg-white/10 rounded-full p-0.5 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${loadingProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
