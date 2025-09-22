import { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star, 
  Zap, 
  Book,
  Users, 
  CreditCard, 
  Smartphone, 
  Monitor, 
  Shield, 
  BarChart3, 
  Package, 
  Globe, 
  Layers,
  Rocket,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Lock, 
  DollarSign,
  WifiOff,
  Receipt,
  Database
} from 'lucide-react';

// Button component matching the styling from attached pages
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

function RoadmapPage({ onSignupClick, onNavigate }) {
  const [currentMilestone, setCurrentMilestone] = useState(0);

  // Auto-scroll through milestones
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % roadmapData.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Statuses = planned, completed, in-progress
  
  const roadmapData = [
    {
      id: 1,
      date: "May 14, 2025",
      title: "First Live Transaction on im+",
      description: "Historic milestone: Our first successful live transaction processed through the im+ platform.",
      status: "completed",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
        "Successfully processed first customer payment",
        "Validated core payment infrastructure",
        "Confirmed system reliability and security"
      ]
    },
        {
      id: 2,
      date: "June 4, 2025",
      title: "Tap to Pay on Smartphones",
      description: "No need for a Card Reader. Process contactless payments anywhere with your smartphone.",
      status: "completed",
      icon: <Smartphone className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "iOS and Android Smartphones with NFC capability"
      ]
    },
    
    {
      id: 3,
      date: "June 17, 2025",
      title: "Offline Mode",
      description: "Take payments with or without a network connection. Download DB to device and sell offline. Store and Foreward credit card transactions.",
      status: "completed",
      icon: <WifiOff className="h-6 w-6" />,
      category: "Product",
      details: [
        "Triple Redundancy",
        "Sales in any environment"
      ]
    },
    {
      id: 4,
      date: "June 25, 2025",
      title: "Custom Receipts",
      description: "Design custom receipts with Header logo and custom copy on header and footer.",
      status: "completed",
      icon: <Receipt className="h-6 w-6" />,
      category: "Transactions",
      details: [
        "Print to S1F2",
        "Reprint from Transactions",
        "Email / SMS / Print"
      ]
    },
    {
      id: 5,
      date: "July 7, 2025",
      title: "First Beta Test Event",
      description: "Still North Books and Bar holds their first event using im+ to process sales.",
      status: "completed",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
        "First Book = Blood Wolf Moon: Poems",
        "First Author = Elise Paschen",
        "First User = H Rooker"
      ]
    },


    {
      id: 6,
      date: "July 15, 2025",
      title: "In App Chargeback management",
      description: "Get notified, dispute, submit evidence, and track each individual Chargeback from within the application.",
      status: "completed",
      icon: <Zap className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "Industry First"
      ]
    },
    {
      id: 7,
      date: "July 22, 2025",
      title: "Tips",
      description: "For stores that combine a cafe or bar into their model we have provided the option to enable tips on individual card readers.",
      status: "completed",
      icon: <DollarSign className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "Biometric authentication",
        "Advanced fraud detection",
        "End-to-end encryption upgrades"
      ]
    },
    {
      id: 8,
      date: "July 30, 2025",
      title: "Two Factor Authentication",
      description: "2FA Security for Admin an Manager security roles.",
      status: "completed",
      icon: <Lock className="h-6 w-6" />,
      category: "Security",
      details: [
        "Secures Admin / Manager Log In",
        "Secures Bank Account Add / Delete",
        "Secures Payouts"
      ]
    },
    {
      id: 9,
      date: "August 13, 2025",
      title: "Item Meta Data",
      description: "Enriching item meta data, making products easier to find in app and in store with the addition of customizable data.",
      status: "completed",
      icon: <Book className="h-6 w-6" />,
      category: "Products",
      details: [
        "Attributes",
        "Categories",
        "Variants"
      ]
    },
    {
      id: 10,
      date: "August 21, 2025",
      title: "Move to Postgres",
      description: "As we increased the size of db's to be cabale of housing over 1 million items per store we decided that MariaDB was no longer the best soltution.",
      status: "planned",
      icon: <Database className="h-6 w-6" />,
      category: "Database",
      details: [
        "Search Results in Milliseconds",
        "Enables Vector search",
        "Open Source"
      ]
    },
    {
      id: 11,
      date: "September 12, 2025",
      title: "App on GooglePlay Store",
      description: "Our app was officially made available on the Google Play store.",
      status: "planned",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
      ]
    },
    {
      id: 12,
      date: "Q3 2026",
      title: "Augmented Reality Shopping",
      description: "Implementing AR technology for immersive shopping experiences, virtual product try-ons, and enhanced in-store navigation and product discovery.",
      status: "planned",
      icon: <Layers className="h-6 w-6" />,
      category: "AR/VR",
      details: [
        "Virtual product try-ons",
        "AR-powered navigation",
        "Immersive shopping experiences"
      ]
    },
    {
      id: 13,
      date: "Q4 2026",
      title: "Blockchain Payment Infrastructure",
      description: "Integrating blockchain technology for enhanced transaction transparency, reduced fees, and support for cryptocurrency payments and smart contracts.",
      status: "planned",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "Blockchain",
      details: [
        "Cryptocurrency support",
        "Smart contract integration",
        "Enhanced transparency"
      ]
    },
    {
      id: 14,
      date: "Q1 2027",
      title: "Autonomous Store Technology",
      description: "Launching fully autonomous store capabilities with AI-powered checkout, automated inventory management, and seamless customer experiences.",
      status: "planned",
      icon: <Rocket className="h-6 w-6" />,
      category: "Autonomous",
      details: [
        "AI-powered checkout",
        "Automated inventory",
        "Seamless customer flow"
      ]
    },
    {
      id: 15,
      date: "Q2 2027",
      title: "Global Platform Expansion",
      description: "Achieving worldwide platform availability with localized features, regional partnerships, and comprehensive support for diverse global markets.",
      status: "planned",
      icon: <Target className="h-6 w-6" />,
      category: "Global",
      details: [
        "Worldwide availability",
        "Localized features",
        "Regional partnerships"
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-[#f08e80]';
      case 'planned':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-white" />;
      case 'planned':
        return <Calendar className="h-4 w-4 text-white" />;
      default:
        return <Calendar className="h-4 w-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              The Future is Bright!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Someone has to start saying it. We are so excited for all of the development potential ahead of us that will differentiate the independent retail experience from the behemoths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[#f08e80] hover:bg-[#e07d70] text-white"
                onClick={onSignupClick}
              >
                Join Our Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Road Map Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Travel along with us as we celebrate our milestones and highlight our future direction and goals.
            </p>
          </div>

          {/* Featured Current Milestone */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#f08e80]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`${getStatusColor(roadmapData[currentMilestone].status)} rounded-full p-3 mr-4`}>
                    {roadmapData[currentMilestone].icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#f08e80] mb-1">
                      {roadmapData[currentMilestone].category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {roadmapData[currentMilestone].title}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {roadmapData[currentMilestone].date}
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(roadmapData[currentMilestone].status)} text-white`}>
                    {getStatusIcon(roadmapData[currentMilestone].status)}
                    <span className="ml-1 capitalize">{roadmapData[currentMilestone].status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {roadmapData[currentMilestone].description}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {roadmapData[currentMilestone].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-[#f08e80] mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {roadmapData.map((milestone, index) => (
                <div 
                  key={milestone.id} 
                  className={`relative flex items-start transition-all duration-500 ${
                    index === currentMilestone ? 'scale-105' : 'scale-100'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(milestone.status)} shadow-lg`}>
                    {milestone.icon}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-8 flex-1 bg-white rounded-lg shadow-md p-6 transition-all duration-500 ${
                    index === currentMilestone ? 'ring-2 ring-[#f08e80] shadow-xl' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-[#f08e80] bg-[#f08e80]/10 px-2 py-1 rounded">
                          {milestone.category}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">
                          {milestone.date}
                        </span>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)} text-white`}>
                        {getStatusIcon(milestone.status)}
                        <span className="ml-1 capitalize">{milestone.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {milestone.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-2">
                      {milestone.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-[#f08e80] mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Be Part of the Future
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already transforming their retail operations with im+. 
              Experience the future of commerce today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#f08e80] hover:bg-[#e07d70] text-white"
                size="lg"
                onClick={onSignupClick}
              >
                Start Your Journey
              </Button>
              <Button 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900"
                size="lg"
                onClick={() => onNavigate('pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoadmapPage;
