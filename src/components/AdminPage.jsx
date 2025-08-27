import { 
  ArrowLeft,
  Users, 
  Settings, 
  CreditCard, 
  Store,
  Shield,
  Database,
  Monitor,
  BarChart3,
  Package,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

// Button component
const Button = ({ children, className = '', variant = 'primary', size = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#f08e80] text-white hover:bg-[#e07d70]',
    secondary: 'bg-white text-[#f08e80] border border-[#f08e80] hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  const sizes = {
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

function AdminPage({ onNavigateBack }) {
  const [selectedTab, setSelectedTab] = useState('users');

  const adminSections = [
    {
      id: 'users',
      name: 'Users',
      icon: <Users className="h-6 w-6" />,
      title: 'User Management',
      description: 'Manage user accounts, permissions, and access levels across your organization.',
      features: [
        'Add / Update / Delete Users',
        'Manage Store assignments',
        'Security Role management',
        'Two Factor Authentication (2FA)',
        'User activity monitoring',
        'Bulk user operations'
      ],
      image: '/assets/users.png'
    },
    {
      id: 'stores',
      name: 'Stores',
      icon: <Store className="h-6 w-6" />,
      title: 'Store Management',
      description: 'Configure and manage multiple store locations with centralized control.',
      features: [
        'Multi-location setup',
        'Store-specific settings',
        'Location-based permissions',
        'Store performance tracking',
        'Regional management',
        'Store hierarchy configuration'
      ],
      image: '/assets/stores.png'
    },
    {
      id: 'cards',
      name: 'Card Processing',
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Payment Processing',
      description: 'Comprehensive payment processing management with real-time monitoring.',
      features: [
        'Payout automation management',
        'Instant money transfers',
        'Payout history tracking',
        'Card reader management',
        'Bank account management',
        'Chargeback dispute handling'
      ],
      image: '/assets/cards.png'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="h-6 w-6" />,
      title: 'System Settings',
      description: 'Configure system-wide settings, registers, and payment methods.',
      features: [
        'Register management',
        'Simple tender configuration',
        'System preferences',
        'Security settings',
        'Backup configuration',
        'Integration settings'
      ],
      image: '/assets/settings.png'
    }
  ];

  const currentSection = adminSections.find(section => section.id === selectedTab);

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Admin Control Center
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive administrative tools to manage users, stores, payments, and system settings 
            from one centralized dashboard.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedTab(section.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  selectedTab === section.id
                    ? 'border-[#f08e80] text-[#f08e80]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#f08e80]/10 p-3 rounded-lg mr-4">
                  {currentSection?.icon && (
                    <div className="text-[#f08e80]">
                      {currentSection.icon}
                    </div>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {currentSection?.title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                {currentSection?.description}
              </p>

              <div className="space-y-4 mb-8">
                {currentSection?.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Access {currentSection?.name}
                </Button>
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                {selectedTab === 'users' && <Users className="h-24 w-24 text-[#f08e80]" />}
                {selectedTab === 'stores' && <Store className="h-24 w-24 text-[#f08e80]" />}
                {selectedTab === 'cards' && <CreditCard className="h-24 w-24 text-[#f08e80]" />}
                {selectedTab === 'settings' && <Settings className="h-24 w-24 text-[#f08e80]" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            System Overview
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">47</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Store className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-gray-600">Store Locations</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">$45.2k</div>
              <div className="text-gray-600">Today's Revenue</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Users className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Add New User</h3>
              <p className="text-gray-600 mb-4">Create a new user account with appropriate permissions and store assignments.</p>
              <Button>Add User</Button>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Store className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configure Store</h3>
              <p className="text-gray-600 mb-4">Set up a new store location or modify existing store settings and configurations.</p>
              <Button>Manage Stores</Button>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <BarChart3 className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold mb-2">View Reports</h3>
              <p className="text-gray-600 mb-4">Access comprehensive reports and analytics for system performance and usage.</p>
              <Button>View Reports</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f08e80] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help with Administration?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our support team is here to help you make the most of your admin tools and system configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100">
              Contact Support
            </Button>
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#f08e80]">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;

