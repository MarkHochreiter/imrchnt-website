import { useState, useEffect } from 'react';

// Button component matching your design system
const Button = ({ children, className = '', size = 'default', onClick, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Animated SVG component for the interconnected rings
const InterconnectedRings = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 600 400" 
        className="w-full h-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#f9fafb" stopOpacity="1"/>
          </radialGradient>
          
          {/* Ring gradients */}
          <linearGradient id="customerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f08e80" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#f08e80" stopOpacity="0.6"/>
          </linearGradient>
          
          <linearGradient id="storeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0.6"/>
          </linearGradient>
          
          <linearGradient id="vendorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#374151" stopOpacity="0.6"/>
          </linearGradient>
          
          <linearGradient id="supplierGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#1f2937" stopOpacity="0.7"/>
          </linearGradient>

          {/* Animated pulse filter */}
          <filter id="pulse">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="600" height="400" fill="url(#bgGradient)"/>

        {/* Outer Ring - Customers */}
        <circle 
          cx="300" 
          cy="200" 
          r="160" 
          fill="none" 
          stroke="url(#customerGradient)" 
          strokeWidth="35"
          className={`transition-all duration-1000 ${animationPhase === 0 ? 'opacity-100' : 'opacity-70'}`}
        />
        
        {/* Second Ring - Stores */}
        <circle 
          cx="300" 
          cy="200" 
          r="120" 
          fill="none" 
          stroke="url(#storeGradient)" 
          strokeWidth="30"
          className={`transition-all duration-1000 ${animationPhase === 1 ? 'opacity-100' : 'opacity-70'}`}
        />
        
        {/* Third Ring - Vendors */}
        <circle 
          cx="300" 
          cy="200" 
          r="85" 
          fill="none" 
          stroke="url(#vendorGradient)" 
          strokeWidth="25"
          className={`transition-all duration-1000 ${animationPhase === 2 ? 'opacity-100' : 'opacity-70'}`}
        />
        
        {/* Fourth Ring - Suppliers (Nucleus) */}
        <circle 
          cx="300" 
          cy="200" 
          r="55" 
          fill="none" 
          stroke="url(#supplierGradient)" 
          strokeWidth="20"
          className={`transition-all duration-1000 ${animationPhase === 3 ? 'opacity-100' : 'opacity-70'}`}
        />
        
        {/* Central Nucleus */}
        <circle 
          cx="300" 
          cy="200" 
          r="35" 
          fill="url(#supplierGradient)"
          className="opacity-90"
        />

        {/* Connection Lines */}
        <g className="opacity-60">
          {/* Horizontal connections */}
          <line x1="140" y1="200" x2="460" y2="200" stroke="#f08e80" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
          </line>
          
          {/* Vertical connections */}
          <line x1="300" y1="40" x2="300" y2="360" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite"/>
          </line>
          
          {/* Diagonal connections */}
          <line x1="187" y1="87" x2="413" y2="313" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" values="0;6" dur="3s" repeatCount="indefinite"/>
          </line>
          
          <line x1="413" y1="87" x2="187" y2="313" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" values="0;6" dur="3.5s" repeatCount="indefinite"/>
          </line>
        </g>

        {/* Connection Points */}
        <g>
          {/* Customer connection points */}
          <circle cx="300" cy="40" r="4" fill="#f08e80" className={`${animationPhase === 0 ? 'animate-pulse' : ''}`}/>
          <circle cx="460" cy="200" r="4" fill="#f08e80" className={`${animationPhase === 0 ? 'animate-pulse' : ''}`}/>
          <circle cx="300" cy="360" r="4" fill="#f08e80" className={`${animationPhase === 0 ? 'animate-pulse' : ''}`}/>
          <circle cx="140" cy="200" r="4" fill="#f08e80" className={`${animationPhase === 0 ? 'animate-pulse' : ''}`}/>
          
          {/* Store connection points */}
          <circle cx="187" cy="87" r="3" fill="#6b7280" className={`${animationPhase === 1 ? 'animate-pulse' : ''}`}/>
          <circle cx="413" cy="87" r="3" fill="#6b7280" className={`${animationPhase === 1 ? 'animate-pulse' : ''}`}/>
          <circle cx="413" cy="313" r="3" fill="#6b7280" className={`${animationPhase === 1 ? 'animate-pulse' : ''}`}/>
          <circle cx="187" cy="313" r="3" fill="#6b7280" className={`${animationPhase === 1 ? 'animate-pulse' : ''}`}/>
        </g>

        {/* Labels */}
        <g className="text-white font-bold">
          <text x="300" y="70" textAnchor="middle" className="text-lg fill-white" style={{fontSize: '18px', fontWeight: 'bold'}}>
            CUSTOMERS
          </text>
          <text x="300" y="130" textAnchor="middle" className="text-base fill-white" style={{fontSize: '16px', fontWeight: 'bold'}}>
            STORES
          </text>
          <text x="300" y="170" textAnchor="middle" className="text-sm fill-white" style={{fontSize: '14px', fontWeight: 'bold'}}>
            VENDORS
          </text>
          <text x="300" y="205" textAnchor="middle" className="text-xs fill-white" style={{fontSize: '12px', fontWeight: 'bold'}}>
            SUPPLIERS
          </text>
        </g>
      </svg>
    </div>
  );
};

// Main Hero Component
const InterconnectedEcosystemHero = ({ onSignupClick, onNavigate }) => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Connected Commerce Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Seamlessly connecting customers, stores, vendors, and suppliers in one unified platform. 
              Experience the power of interconnected retail technology.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#f08e80] rounded-full mr-4"></div>
                <span className="text-lg">Real-time communication across all stakeholders</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#6b7280] rounded-full mr-4"></div>
                <span className="text-lg">Unified data flow and inventory management</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#374151] rounded-full mr-4"></div>
                <span className="text-lg">Streamlined operations from source to sale</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#1f2937] rounded-full mr-4"></div>
                <span className="text-lg">Enhanced visibility and control at every level</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[#f08e80] hover:bg-[#e07d70] text-white"
                size="lg"
                onClick={onSignupClick}
              >
                Join the Ecosystem
              </Button>
              <Button 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900"
                size="lg"
                onClick={() => onNavigate && onNavigate('system')}
              >
                Explore Platform
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <InterconnectedRings />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#f08e80] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#6b7280] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-[#374151] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterconnectedEcosystemHero;
