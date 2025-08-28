import { 
  ArrowLeft,
  Wifi, 
  CreditCard,
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
      icon: <Monitor className="h-5 w-5" />,
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
        description: "Create new user accounts with appropriate permissions and store assignments",
        icon: <Users size={20} />,
        position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Update User Info",
        description: "Modify existing user details, contact information, and profile settings",
        icon: <Pencil size={20} />,
        position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "Delete Users",
        description: "Remove user accounts and revoke system access when needed",
        icon: <Trash2 size={20} />,
        position: { top: '95%', left: '50%' }
      },
      {
        id: 4,
        title: "Store Assignments",
        description: "Assign users to specific store locations and manage multi-store access",
        icon: <Store size={20} />,
        position: { top: '41%', left: '75%' }
      },
      {
        id: 5,
        title: "Security Roles",
        description: "Configure user permissions and access levels based on job responsibilities",
        icon: <Lock size={20} />,
        position: { top: '60%', left: '38%' }
      },
      {
        id: 6,
        title: "Two Factor Authentication",
        description: "Enable 2FA for Admin and Manager accounts for enhanced security",
        icon: <Shield size={20} />,
        position: { top: '95%', left: '70%' }
      }
    ],
    'stores': [
      {
        id: 1,
        title: "Add Stores",
        description: "Configure and manage multiple store locations from one dashboard",
        icon: <Plus size={20} />,
         position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Store Configuration",
        description: "Set up store-specific settings, tax rates, and operational parameters",
        icon: <Store size={20} />,
       position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "Inventory",
        description: "Manage Inventory by Store",
        icon: <Shield size={20} />,
       position: { top: '41%', left: '95%' }
      },
      {
        id: 4,
        title: "Users",
        description: "Assign users to one or many stores",
        icon: <Users size={20} />,
       position: { top: '41%', left: '65%' }
      }
    ],
    'cards': [
      {
        id: 1,
        title: "Payout Automation",
        description: "Set up automated payout schedules and manage transfer preferences",
        icon: <Zap size={20} />,
         position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Instant Transfers",
        description: "Transfer money instantly to your bank accounts with real-time processing",
        icon: <Wallet size={20} />,
        position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "Payout History",
        description: "View comprehensive history of all payouts and transaction details",
        icon: <BarChart3 size={20} />,
        position: { top: '95%', left: '50%' }
      },
      {
        id: 4,
        title: "Card Reader Management",
        description: "Manage and configure card readers across all store locations",
        icon: <CreditCard size={20} />,
        position: { top: '41%', left: '75%' }
      },
      {
        id: 5,
        title: "Bank Account Setup",
        description: "Add and manage bank accounts for payout destinations",
        icon: <DollarSign size={20} />,
         position: { top: '60%', left: '38%' }
      },
      {
        id: 6,
        title: "Chargeback Disputes",
        description: "Challenge chargeback disputes and manage dispute resolution process",
        icon: <Shield size={20} />,
         position: { top: '95%', left: '70%' }
      }
    ],
    'settings': [
      {
        id: 1,
        title: "Register Management",
        description: "Add, update, and delete POS registers across your store locations",
        icon: <Monitor size={20} />,
        position: { top: '20%', left: '85%' }
      },
      {
        id: 2,
        title: "Simple Tenders",
        description: "Configure payment methods and tender types for your POS system",
        icon: <DollarSign size={20} />,
       position: { top: '41%', left: '30%' }
      },
      {
        id: 3,
        title: "System Preferences",
        description: "Set global system preferences and default configurations",
        icon: <Layers size={20} />,
       position: { top: '95%', left: '50%' }
      },
      {
        id: 4,
        title: "Security Settings",
        description: "Configure security policies, password requirements, and access controls",
        icon: <Shield size={20} />,
       position: { top: '41%', left: '75%' }
      },
      {
        id: 5,
        title: "Backup Configuration",
        description: "Set up automated backups and data retention policies",
        icon: <Cloud size={20} />,
         position: { top: '60%', left: '38%' }
      },
      {
        id: 6,
        title: "Integration Settings",
        description: "Configure third-party integrations and API connections",
        icon: <Grid size={20} />,
        position: { top: '95%', left: '70%' }
      }
    ]
  };

  const currentDevice = deviceTypes.find(device => device.id === selectedDeviceType);
  const currentFeatures = deviceFeatures[selectedDeviceType] || [];

return (
  <div className="min-h-screen bg-white">
    {/* Header with Back Button */}
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onNavigateBack}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to System
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </div>
    </header>

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
      <div className="relative bg-gray-50 rounded-2xl p-8 mb-16">
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-4xl">
            {/* Admin Interface Content */}
            <div className="relative h-auto bg-gradient-to-br from-gray-50 to-white">
              {/* Display current section image if available */}
              {currentDevice?.imageSrc && (
                <img 
                  src={currentDevice.imageSrc} 
                  alt={currentDevice.title}
                  className="w-full object-cover"
                />
              )}
              
              {/* Interactive Feature Points */}
              {currentFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    top: feature.position.top,
                    left: feature.position.left,
                  }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    hoveredFeature === feature.id 
                      ? 'bg-[#f08e80] text-white scale-125 shadow-lg' 
                      : 'bg-white text-[#f08e80] border-2 border-[#f08e80] hover:bg-[#f08e80] hover:text-white'
                  }`}>
                    {feature.icon}
                  </div>
                  
                  {/* Feature Tooltip */}
                  {hoveredFeature === feature.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl z-10">
                      <div className="font-semibold mb-1">{feature.title}</div>
                      <div className="text-gray-300">{feature.description}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {currentFeatures.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#f08e80]/10 p-2 rounded-lg mr-3">
                <div className="text-[#f08e80]">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white px-8 py-3">
            Access {currentDevice?.name} Management
          </Button>
          <Button variant="secondary" className="px-8 py-3">
            View Documentation
          </Button>
        </div>
      </div>
    </main>
  </div>
);

}

export default AdminPage;

