import { ChevronDown, Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingCart, BarChart3, Users, Zap, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import PricingPage from './components/PricingPage.jsx'
import MegaMenu from './components/MegaMenu.jsx'
import HardwareMegaMenu from './components/HardwareMegaMenu.jsx'
import SupportMegaMenu from './components/SupportMegaMenu.jsx'
import InStorePage from './components/InStorePage.jsx'
import OffsitePage from './components/OffsitePage.jsx'
import CreditCardProcessingPage from './components/CreditCardProcessingPage.jsx'
import S1f2Page from './components/S1f2Page.jsx'
import Ams1Page from './components/Ams1Page.jsx'
import Sfo1Page from './components/Sfo1Page.jsx'
import SignupModal from './components/SignupModal.jsx'
import FeatureRequestModal from './components/FeatureRequestModal.jsx'
import POSDiagramPage from './components/POSDiagramPage.jsx'
import SystemPage from './components/SystemPage.jsx'
import AdminPage from './components/AdminPage.jsx'
import ReportsPage from './components/Reports.jsx'
import InventoryPage from './components/inventory.jsx'
import CustomerPage from './components/Customers.jsx'
import SingleDevicePage from './components/singledevice.jsx'
import RoadMapPage from './components/RoadmapPage.jsx'
import InterconnectedEcosystemHero from './components/InterconnectedEcosystemHero.jsx'
import './App.css'

// Button component
const Button = ({ children, className = '', size = 'default', onClick, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-houschka-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [megaMenuVisible, setMegaMenuVisible] = useState(false)
  const [hardwareMegaMenuVisible, setHardwareMegaMenuVisible] = useState(false)
  const [supportMegaMenuVisible, setSupportMegaMenuVisible] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [featureRequestModalOpen, setFeatureRequestModalOpen] = useState(false)
  
  // Mobile menu states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileHardwareOpen, setMobileHardwareOpen] = useState(false)
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false)

  // Set up global function for opening feature request modal
  useEffect(() => {
    window.openFeatureRequestModal = () => {
      setFeatureRequestModalOpen(true)
      setSupportMegaMenuVisible(false)
    }
    
    return () => {
      delete window.openFeatureRequestModal
    }
  }, [])

  const handleHardwareNavigation = (page) => {
    setCurrentPage(page)
    setHardwareMegaMenuVisible(false)
    setMobileMenuOpen(false)
  }

  const handleNavigation = (page, section = null) => {
    setCurrentPage(page)
    setMegaMenuVisible(false)
    setMobileMenuOpen(false)
    // Scroll to section after page loads
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const handleSignupClick = () => {
    setSignupModalOpen(true)
  }

  const handleFeatureRequestClick = () => {
    setFeatureRequestModalOpen(true)
  }

  // A generic function to switch between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Mobile menu data
  const mobileSolutionsData = [
    {
      title: "System",
      items: [
        { name: "POS", page: "system", section: "pos" },
        { name: "Admin", page: "system", section: "admin" },
        { name: "Reports", page: "system", section: "reports" },
        { name: "Products", page: "system", section: "products" },
        { name: "Customers", page: "system", section: "customers" }
      ]
    },
    {
      title: "InStore",
      items: [
        { name: "POS", page: "instore", section: "pos" },
        { name: "Customers", page: "instore", section: "customers" },
        { name: "On Floor Assistance", page: "instore", section: "on-floor-assistance" }
      ]
    },
    {
      title: "Offsite",
      items: [
        { name: "Single Device", page: "offsite", section: "single-device" },
        { name: "Multi Device", page: "offsite", section: "multi-device" },
        { name: "Credit Card Processing", page: "offsite", section: "credit-card-processing" }
      ]
    }
  ];

  const mobileHardwareData = [
    { name: "S1F2", page: "s1f2" },
    { name: "AMS1", page: "ams1" },
    { name: "SFO1", page: "sfo1" }
  ];

  const mobileSupportData = [
    { name: "Help Center", href: "#" },
    { name: "Contact Support", href: "#" },
    { name: "Feature Requests", onClick: handleFeatureRequestClick },
    { name: "API Documentation", href: "#" },
    { name: "System Status", href: "#" }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            {/* Interconnected Ecosystem Hero Section */}
            <InterconnectedEcosystemHero onSignupClick={handleSignupClick} onNavigate={navigateTo} />

            {/* Platform Overview */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Cross platform point of sale
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                   Web, Client, PC, Mac, Android or iOS.  
 Sell on desktop, mobile, tablet, or card reader. 
                </p>
                
             <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="text-center">
                    <div className="bg-[#f08e80]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-[#f08e80]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Start fast</h3>
                    <p className="text-gray-600">
                      Instant KYC and Tap to Pay on smartphone gets you selling rapidly. 
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Go big</h3>
                    <p className="text-gray-600">
                      A single platform that scales seamlessly from Pop Up to Multistore.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Go home</h3>
                    <p className="text-gray-600">
                      Track sales in real time from any device at home or anywhere you might be.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                  There's no better place for your store
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-[#f08e80] mb-2">34</div>
                    <div className="text-gray-600">stores</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">$200k</div>
                    <div className="text-gray-600">dollars processed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">2k</div>
                    <div className="text-gray-600">transactions</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#f08e80] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Start selling in no time
                </h2>
                <div className="grid md:grid-cols-3 gap-3 mb-12">
                  <div className="flex items-center justify-center">
                    <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <span>Get approved</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <span>Add items</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <span>Start selling</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={handleSignupClick}
                >
                  Request access
                </Button>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <img src={logo} alt="Implus Offsite POS Logo" className="h-8" />
                    <p className="text-gray-400">
                      Designed by Computac LLC in Hanover, NH <br/> Developed by Codemask in Gorlice, Poland.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">About</a></li>
                      <li><a href="#" className="hover:text-white">Careers</a></li>
                      <li><a href="#" className="hover:text-white">Press</a></li>
                      <li><a href="#" className="hover:text-white">News</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">Blog</a></li>
                      <li><a href="#" className="hover:text-white">Help Center</a></li>
                      <li><a href="#" className="hover:text-white">API Docs</a></li>
                      <li><a href="#" className="hover:text-white">Community</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">Contact</a></li>
                      <li><a href="#" className="hover:text-white">Status</a></li>
                      <li><a href="#" className="hover:text-white">Privacy</a></li>
                      <li><a href="#" className="hover:text-white">Terms</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                  <p>&copy; 2025 Computac LLC. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        );
      case 'pricing':
        return <PricingPage />;
      case 'system':
        return <SystemPage onNavigate={navigateTo} handleSignupClick={handleSignupClick} />;
      case 'admin':
        return <AdminPage onNavigateBack={() => navigateTo('system')} />;
      case 'reports':
        return <ReportsPage onNavigateBack={() => navigateTo('system')} />;
      case 'inventory':
        return <InventoryPage onNavigateBack={() => navigateTo('system')} />;
      case 'customer':
        return <CustomerPage onNavigateBack={() => navigateTo('instore')} />;
      case 'single':
        return <SingleDevicePage onNavigateBack={() => navigateTo('offsite')} />;
      case 'instore':
        return <InStorePage onSignupClick={handleSignupClick} onNavigate={navigateTo} />;
      case 'offsite':
        return <OffsitePage onNavigate={navigateTo} handleSignupClick={handleSignupClick} />;
      case 'credit-cards':
        return <CreditCardProcessingPage onNavigate={navigateTo} handleSignupClick={handleSignupClick} />;
      case 'pos-diagram':
        return <POSDiagramPage onNavigateBack={() => navigateTo('system')} />;
      case 's1f2':
        return <S1f2Page onNavigateBack={() => navigateTo('home')} />;
      case 'ams1':
        return <Ams1Page onNavigateBack={() => navigateTo('home')} />;
      case 'sfo1':
        return <Sfo1Page onNavigateBack={() => navigateTo('home')} />;
      case 'roadmap':
        return <RoadMapPage onSignupClick={handleSignupClick} onNavigate={navigateTo} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden form for Netlify Forms detection */}
      <form name="feature-request" netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="featureRequest"></textarea>
      </form>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')}>
                <img src={logo} alt="Implus Offsite POS Logo" className="h-16" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <button 
                  onClick={() => setMegaMenuVisible(!megaMenuVisible)}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <MegaMenu 
                  isVisible={megaMenuVisible}
                  onMouseEnter={() => setMegaMenuVisible(true)}
                  onMouseLeave={() => setMegaMenuVisible(false)}
                  onNavigate={handleNavigation}
                />
              </div>
              <button 
                onClick={() => setCurrentPage('pricing')}
                className="text-gray-700 hover:text-gray-900"
              >
                Pricing
              </button>
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  onClick={() => setHardwareMegaMenuVisible(!hardwareMegaMenuVisible)}
                >
                  Hardware <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <HardwareMegaMenu 
                  isVisible={hardwareMegaMenuVisible}
                  onMouseEnter={() => setHardwareMegaMenuVisible(true)}
                  onMouseLeave={() => setHardwareMegaMenuVisible(false)}
                  onNavigate={handleHardwareNavigation}
                />
              </div>
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  onClick={() => setSupportMegaMenuVisible(!supportMegaMenuVisible)}
                >
                  Support <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <SupportMegaMenu 
                  isVisible={supportMegaMenuVisible}
                  onMouseEnter={() => setSupportMegaMenuVisible(true)}
                  onMouseLeave={() => setSupportMegaMenuVisible(false)}
                  onNavigate={handleNavigation}
                  onClose={() => setSupportMegaMenuVisible(false)}
                />
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://pos.imrchnt.com/auth/sign-in" 
                className="text-gray-700 hover:text-gray-900"
                target="_blank" 
                rel="noopener noreferrer"
              >
              Log in
              </a>
              <Button 
                className="bg-[#f08e80] hover:bg-violet-400 text-white"
                onClick={handleSignupClick}
              >
              Request Access
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 max-h-screen overflow-y-auto">
              
              {/* Home */}
              <button 
                onClick={() => {
                  setCurrentPage('home')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Home
              </button>

              {/* Solutions Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileSolutionsData.map((section) => (
                      <div key={section.title} className="py-2">
                        <div className="text-sm font-semibold text-[#f08e80] px-3 py-1">
                          {section.title}
                        </div>
                        {section.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleNavigation(item.page, item.section)}
                            className="block w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <button 
                onClick={() => {
                  setCurrentPage('pricing')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Pricing
              </button>

              {/* Hardware Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileHardwareOpen(!mobileHardwareOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <span>Hardware</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileHardwareOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileHardwareOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileHardwareData.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleHardwareNavigation(item.page)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Support Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <span>Support</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSupportOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileSupportOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileSupportData.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick()
                          } else if (item.href && item.href !== '#') {
                            window.open(item.href, '_blank')
                          }
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Login */}
              <a 
                href="https://pos.imrchnt.com/auth/sign-in"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Log in
              </a>

              {/* Request Access Button */}
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-[#f08e80] hover:bg-violet-400 text-white"
                  onClick={() => {
                    handleSignupClick()
                    setMobileMenuOpen(false)
                  }}
                >
                  Request Access
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      {renderContent()}

      {/* Signup Modal */}
      {signupModalOpen && (
        <SignupModal 
          isOpen={signupModalOpen}
          onClose={() => setSignupModalOpen(false)}
        />
      )}

      {/* Feature Request Modal */}
      {featureRequestModalOpen && (
        <FeatureRequestModal 
          isOpen={featureRequestModalOpen}
          onClose={() => setFeatureRequestModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
