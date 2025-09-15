import { 
  ArrowLeft,
  Wifi, 
  CreditCard,
  Undo,
  Plus,
  Smartphone, 
  Zap, 
  Shield, 
  Printer, 
  Trash2, 
  PlusCircle, 
  Search, 
  Grid, 
  Home, 
  DollarSign, 
  Monitor, 
  Tablet, 
  Layers, 
  Battery, 
  Cloud, 
  Users, 
  BarChart3, 
  Package, 
  Percent, 
  Shredder, 
  Calculator,
  BookPlus,
  Flag,
  Wallet,
  Tag,
  Book,
  Eye,
  Pencil,
  Lock,
  Store} from 'lucide-react';
import { useState } from 'react';
import cards from '../assets/cards.png';
import settings from '../assets/settings.png';
import stores from '../assets/stores.png';
import users from '../assets/users.png';

// A reusable Button component, matching the new aesthetic.
const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm';
  
  const variants = {
    primary: 'bg-[#f08e80] text-white hover:bg-[#e07d70]',
    secondary: 'bg-white text-[#f08e80] border border-[#f08e80] hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Main component for the Admin Page
function AdminPage({ onNavigateBack }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState('users');

  // Device type configurations for Admin sections
  const deviceTypes = [
    {
      id: 'users',
      name: 'Users',
      icon: <Users className="h-5 w-5" />,
      title: 'Manage Users',
      subtitle: 'Full user management console',
      description: 'Add / Update / Delete Users. Manage Store assignments and Security Roles. Implement Two Factor Authentication (2FA) for Admin and Manager accounts',
      imageSrc: users
    },
    {
      id: 'stores',
      name: 'Stores',
      icon: <Store className="h-5 w-5" />,
      title: 'Manage Multiple Stores',
      subtitle: 'Centralized store management system',
      description: 'Configure multiple store locations with centralized control. Manage store-specific settings, permissions, and performance tracking across all your retail locations.',
      imageSrc: stores 
    },
    {
      id: 'cards',
      name: 'Card Processing',
      icon: <CreditCard className="h-5 w-5" />,
      title: 'In App access to Card Processing tools',
      subtitle: 'Unparalleled in app access to the back end of card processing',
      description: 'Manage Payout automation or transfer money instantly. View Payout history. Manage card readers. Add bank accounts. Export in depth payout reports. Challenge Chargeback disputes',
      imageSrc: cards 
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Layers className="h-5 w-5" />,
      title: 'Manage Settings',
      subtitle: 'Manage Registers and Simple Tenders',
      description: 'Add / Update / Delete registers and simple tenders. Configure system-wide settings and preferences.',
      imageSrc: settings
    }
  ];

  // Features for different admin sections
  const deviceFeatures = {
    'users': [
      {
        id: 1,
        title: "Add New Users",
        description: "Create new user accounts with appropriate permissions and store assignments.",
        icon: <Users size={20} />,
        position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Update User Info",
        description: "Modify existing user details, contact information, and profile settings.",
        icon: <Pencil size={20} />,
        position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "Delete Users",
        description: "Remove user accounts and revoke system access when needed.",
        icon: <Trash2 size={20} />,
        position: { top: '95%', left: '50%' }
      },
      {
        id: 4,
        title: "Store Assignments",
        description: "Assign users to specific store locations and manage multi-store access.",
        icon: <Store size={20} />,
        position: { top: '41%', left: '75%' }
      },
      {
        id: 5,
        title: "Security Roles",
        description: "Configure user permissions and access levels based on job responsibilities.",
        icon: <Lock size={20} />,
        position: { top: '60%', left: '38%' }
      },
      {
        id: 6,
        title: "Two Factor Authentication",
        description: "Enable 2FA for Admin and Manager accounts for enhanced security.",
        icon: <Shield size={20} />,
        position: { top: '95%', left: '70%' }
      }
    ],
    'stores': [
      {
        id: 1,
        title: "Add Stores",
        description: "Configure and manage multiple store locations from one dashboard.",
        icon: <Plus size={20} />,
         position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Store Configuration",
        description: "Set up store-specific settings, tax rates, and operational parameters.",
        icon: <Store size={20} />,
       position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "Inventory",
        description: "Manage Inventory by Store with location-specific stock levels.",
        icon: <Book size={20} />,
       position: { top: '41%', left: '95%' }
      },
      {
        id: 4,
        title: "Users",
        description: "Manage which employees can work at which locations and set up cross-store permissions for managers and administrators.",
        icon: <Users size={20} />,
       position: { top: '41%', left: '69%' }
      }
    ],
    'cards': [
      {
        id: 1,
        title: "Payout Automation",
        description: "Configure daily, weekly, or custom payout schedules to automatically transfer funds to your bank accounts.",
        icon: <Zap size={20} />,
         position: { top: '37%', left: '25%' }
      },
      {
        id: 2,
        title: "Instant Transfers",
        description: "Access your funds same day with instant transfer capabilities for improved cash flow management.",
        icon: <Wallet size={20} />,
        position: { top: '37%', left: '88%' }
      },
      {
        id: 3,
        title: "Terminals",
        description: "Manage Card Readers, activate and customize tips on individual units.",
        icon: <Smartphone size={20} />,
        position: { top: '17%', left: '43%' }
      },
      {
        id: 4,
        title: "Reporting",
        description: "Export Payout Details Reports to reconcile Payouts to Payments.",
        icon: <BarChart3 size={20} />,
        position: { top: '17%', left: '75%' }
      },
      {
        id: 5,
        title: "Bank Account Setup",
        description: "Add and manage bank accounts for payout destinations. Secured by 2FA.",
        icon: <DollarSign size={20} />,
         position: { top: '17%', left: '58%' }
      },
      {
        id: 6,
        title: "Chargeback Disputes",
        description: "Challenge chargeback disputes and manage dispute resolution process. Upload evidence, track dispute status.",
        icon: <Undo size={20} />,
         position: { top: '17%', left: '91%' }
      }
    ],
    'settings': [
      {
        id: 1,
        title: "Simple Tenders",
        description: "Create Simple Tenders for sales made outside of the platform.",
        icon: <DollarSign size={20} />,
        position: { top: '18%', left: '75%' }
      },
      {
        id: 2,
        title: "Registers",
        description: "Manage and track Registers across all locations.",
        icon: <Calculator size={20} />,
       position: { top: '18%', left: '30%' }
      }
    ]
  };

  const currentDevice = deviceTypes.find(device => device.id === selectedDeviceType);
  const currentFeatures = deviceFeatures[selectedDeviceType] || [];

  // Function to get appropriate tooltip width based on content
  const getTooltipWidth = (feature) => {
    // For admin features, use consistent medium sizing since they're mostly text
    return 'w-72 sm:w-80 md:w-96';
  };

return (
  <div className="min-h-screen bg-white">

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Hero Section */}
      <section className="py-10 mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Admin Control Center
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Comprehensive administrative tools to manage users, stores, payments, and system settings from one centralized dashboard.
        </p>
      </section>

      {/* Admin Section Selection Buttons */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-2">
          {deviceTypes.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDeviceType(device.id)}
              className={`inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[180px] justify-center ${
                selectedDeviceType === device.id
                  ? 'bg-[#f08e80] text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="mr-3 text-xl">{device.icon}</span>
              {device.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Section Details */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {currentDevice?.title}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {currentDevice?.description}
        </p>
      </div>

      {/* Interactive Feature Display */}
      <div className="space-y-16">
        <div className="flex justify-center relative max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm w-full">
            {/* Display current section image if available */}
            {currentDevice?.imageSrc && (
              <img 
                src={currentDevice.imageSrc} 
                alt={currentDevice.title}
                className="w-full h-auto object-contain mx-auto max-h-[600px]"
              />
            )}
          </div>
          
          {/* Interactive Feature Points - Using same style as inventory page */}
          {currentFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${hoveredFeature === feature.id ? 'z-30' : 'z-10'}`}
              style={{ top: feature.position.top, left: feature.position.left }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="w-4 h-4 bg-[#f08e80] rounded-full transition-transform duration-300 group-hover:scale-150" />
              <div className="absolute w-8 h-8 bg-[#f08e80]/20 rounded-full -top-2 -left-2 animate-ping-slow group-hover:animate-none" />

              {/* Tooltip - Auto-sizing with stable positioning */}
              {hoveredFeature === feature.id && (
                <div 
                  className={`absolute z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl ${getTooltipWidth(feature)} max-w-[90vw]`} 
                  style={{ 
                    bottom: '150%', 
                    left: '50%', 
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="flex items-center mb-3">
                    <div className="text-[#f08e80] mr-2 flex-shrink-0">{feature.icon}</div>
                    <h4 className="font-bold text-sm sm:text-base">{feature.title}</h4>
                  </div>
                  
                  {feature.description && (
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                  
                  {/* Tooltip arrow */}
                  <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Core Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-xl mr-4">{currentDevice?.icon}</div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800">Core Features</h2>
                <p className="text-gray-500 mt-2 text-lg">{currentDevice?.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentFeatures.map(feature => (
                <div key={feature.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-lg">{feature.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-20 text-center">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Get Started with {currentDevice?.name}?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Experience the power of our administrative tools. Access comprehensive management features designed for efficiency and control.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-3 text-base">Access {currentDevice?.name} Management</Button>
            <Button variant="secondary" className="px-8 py-3 text-base">View Documentation</Button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

}

export default AdminPage;
