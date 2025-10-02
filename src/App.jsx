import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
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
import EpsonT88Page from './components/EpsonT88Page.jsx'
import HoneywellPC43dPage from './components/HoneywellPC43dPage.jsx'
import APGCashDrawerPage from './components/APGCashDrawerPage.jsx'
import SocketScanS720Page from './components/SocketScanS720Page.jsx'
import SignupModal from './components/SignupModal.jsx'
import FeatureRequestModal from './components/FeatureRequestModal.jsx'
import HardwareCartModal from './components/HardwareCartModal.jsx'
import POSDiagramPage from './components/POSDiagramPage.jsx'
import SystemPage from './components/SystemPage.jsx'
import AdminPage from './components/AdminPage.jsx'
import ReportsPage from './components/Reports.jsx'
import InventoryPage from './components/inventory.jsx'
import CustomerPage from './components/Customers.jsx'
import SingleDevicePage from './components/singledevice.jsx'
import RoadMapPage from './components/RoadmapPage.jsx'
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

// Home Page Component
function HomePage() {
  const navigate = useNavigate()
  
  const handleSignupClick = () => {
    // Trigger global signup modal
    window.dispatchEvent(new CustomEvent('openSignupModal'))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-houschka-extrabold leading-tight mb-6">
              Seamless POS <br />
              Intuitive Design <br />
              Built for Bookstores
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              In store, Pop up, Off site. Network connection or not.  
              Sell anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#f08e80] hover:bg-violet-400 text-white"
                onClick={handleSignupClick}
              >
                Request Access
              </Button>
              <Button 
                size="lg" 
                className="border border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-houschka-extrabold text-gray-900 mb-4">
              Everything you need to run your bookstore
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From inventory management to customer relationships, our platform handles it all
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f08e80] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-houschka-bold mb-2">Mobile First</h3>
              <p className="text-gray-600">Designed for tablets and mobile devices, perfect for any retail environment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f08e80] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-houschka-bold mb-2">Works Offline</h3>
              <p className="text-gray-600">Continue selling even when the internet goes down. Sync when reconnected</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f08e80] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-houschka-bold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Track sales, inventory, and customer data in real-time across all locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="Implus Logo" className="h-8 mb-4" />
              <p className="text-gray-400">
                The modern POS system built specifically for independent bookstores.
              </p>
            </div>
            <div>
              <h4 className="font-houschka-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/system" className="hover:text-white">System</Link></li>
                <li><Link to="/instore" className="hover:text-white">In-Store</Link></li>
                <li><Link to="/offsite" className="hover:text-white">Offsite</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-houschka-bold mb-4">Hardware</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/s1f2" className="hover:text-white">S1F2 Terminal</Link></li>
                <li><Link to="/ams1" className="hover:text-white">AMS1 Terminal</Link></li>
                <li><Link to="/epson-t88" className="hover:text-white">Receipt Printer</Link></li>
                <li><Link to="/apg-cash-drawer" className="hover:text-white">Cash Drawer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-houschka-bold mb-4">Support</h4>
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
  )
}

// Navigation component that uses React Router
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuVisible, setMegaMenuVisible] = useState(false)
  const [hardwareMegaMenuVisible, setHardwareMegaMenuVisible] = useState(false)
  const [supportMegaMenuVisible, setSupportMegaMenuVisible] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [featureRequestModalOpen, setFeatureRequestModalOpen] = useState(false)
  const [hardwareCartModalOpen, setHardwareCartModalOpen] = useState(false)
  
  // Mobile menu states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileHardwareOpen, setMobileHardwareOpen] = useState(false)
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // Listen for global events to open modals
  useEffect(() => {
    const handleOpenSignupModal = () => setSignupModalOpen(true)
    const handleOpenFeatureRequestModal = () => setFeatureRequestModalOpen(true)
    
    window.addEventListener('openSignupModal', handleOpenSignupModal)
    window.addEventListener('openFeatureRequestModal', handleOpenFeatureRequestModal)
    
    // Set up global function for opening feature request modal
    window.openFeatureRequestModal = () => {
      setFeatureRequestModalOpen(true)
      setSupportMegaMenuVisible(false)
    }
    
    return () => {
      window.removeEventListener('openSignupModal', handleOpenSignupModal)
      window.removeEventListener('openFeatureRequestModal', handleOpenFeatureRequestModal)
      delete window.openFeatureRequestModal
    }
  }, [])

  const handleSolutionsMenuClick = () => {
    setMegaMenuVisible(!megaMenuVisible)
    setHardwareMegaMenuVisible(false)
    setSupportMegaMenuVisible(false)
  }

  const handleHardwareMenuClick = () => {
    setHardwareMegaMenuVisible(!hardwareMegaMenuVisible)
    setMegaMenuVisible(false)
    setSupportMegaMenuVisible(false)
  }

  const handleSupportMenuClick = () => {
    setSupportMegaMenuVisible(!supportMegaMenuVisible)
    setMegaMenuVisible(false)
    setHardwareMegaMenuVisible(false)
  }

  const handleHardwareNavigation = (page) => {
    navigate(`/${page}`)
    setHardwareMegaMenuVisible(false)
    setMobileMenuOpen(false)
  }

  const handleNavigation = (page, section = null) => {
    navigate(`/${page}`)
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

  const handleContactSalesClick = () => {
    setHardwareCartModalOpen(true)
  }

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
    { name: "SFO1", page: "sfo1" },
    { name: "Receipt Printer", page: "epson-t88" },
    { name: "Label Printer", page: "honeywell-pc43d" },
    { name: "Cash Drawer", page: "apg-cash-drawer" },
    { name: "Socket Scan", page: "socket-scan-s720" }
  ];
  
  const mobileSupportData = [
    { name: "Submit Ticket", onClick: () => window.open('https://imrchnt-243943054.hs-sites-na2.com/tickets-view', '_blank') },
    { name: "User Guides", onClick: () => window.open('https://imrchnt.screenstepslive.com/s/17626/a/1988030-welcome-to-im', '_blank') },
    { name: "Feature Requests", onClick: handleFeatureRequestClick },
    { name: "Road Map", page: "roadmap" }
  ];

  return (
    <>
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Implus Offsite POS Logo" className="h-8" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button
                  onClick={handleSolutionsMenuClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <MegaMenu 
                  isVisible={megaMenuVisible}
                  onMouseEnter={() => setMegaMenuVisible(true)}
                  onMouseLeave={() => setMegaMenuVisible(false)}
                  onNavigate={handleNavigation}
                />
              </div>
              
              <Link 
                to="/pricing"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Pricing
              </Link>
              
              <div className="relative">
                <button
                  onClick={handleHardwareMenuClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Hardware
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <HardwareMegaMenu 
                  isVisible={hardwareMegaMenuVisible}
                  onMouseEnter={() => setHardwareMegaMenuVisible(true)}
                  onMouseLeave={() => setHardwareMegaMenuVisible(false)}
                  onNavigate={handleHardwareNavigation}
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={handleSupportMenuClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Support
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <SupportMegaMenu 
                  isVisible={supportMegaMenuVisible}
                  onMouseEnter={() => setSupportMegaMenuVisible(true)}
                  onMouseLeave={() => setSupportMegaMenuVisible(false)}
                  onNavigate={handleNavigation}
                  onClose={() => setSupportMegaMenuVisible(false)}
                  onFeatureRequest={() => {
                    setFeatureRequestModalOpen(true)
                    setSupportMegaMenuVisible(false)
                  }}
                />
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://pos.imrchnt.com/auth/sign-in"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
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
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {/* Solutions */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileSolutionsData.map((category) => (
                      <div key={category.title}>
                        <div className="font-medium text-gray-900 px-3 py-1">{category.title}</div>
                        {category.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              navigate(`/${item.page}`)
                              setMobileMenuOpen(false)
                              if (item.section) {
                                setTimeout(() => {
                                  const element = document.getElementById(item.section)
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' })
                                  }
                                }, 100)
                              }
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
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
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Pricing
              </Link>

              {/* Hardware */}
              <div>
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
                      <Link
                        key={item.name}
                        to={`/${item.page}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Support */}
              <div>
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
                          } else if (item.page) {
                            navigate(`/${item.page}`)
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
      </nav>

      {/* Global Modals */}
      <SignupModal 
        isOpen={signupModalOpen} 
        onClose={() => setSignupModalOpen(false)} 
      />
      
      <FeatureRequestModal 
        isOpen={featureRequestModalOpen}
        onClose={() => setFeatureRequestModalOpen(false)}
      />
      
      <HardwareCartModal 
        isOpen={hardwareCartModalOpen}
        onClose={() => setHardwareCartModalOpen(false)}
      />
    </>
  )
}

// Main App component with Router
function App() {
  // A generic function to navigate between pages
  const navigateTo = (page) => {
    // This will be handled by React Router
    window.location.href = `/${page}`
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/system" element={<SystemPage onNavigate={navigateTo} handleSignupClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))} />} />
          <Route path="/admin" element={<AdminPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/reports" element={<ReportsPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/inventory" element={<InventoryPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/customer" element={<CustomerPage onNavigateBack={() => navigateTo('instore')} />} />
          <Route path="/single" element={<SingleDevicePage onNavigateBack={() => navigateTo('offsite')} />} />
          <Route path="/instore" element={<InStorePage onNavigate={navigateTo} handleSignupClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))} />} />
          <Route path="/offsite" element={<OffsitePage onNavigate={navigateTo} handleSignupClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))} />} />
          <Route path="/credit-cards" element={<CreditCardProcessingPage onNavigate={navigateTo} handleSignupClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))} />} />
          <Route path="/s1f2" element={<S1f2Page />} />
          <Route path="/ams1" element={<Ams1Page />} />
          <Route path="/sfo1" element={<Sfo1Page />} />
          <Route path="/epson-t88" element={<EpsonT88Page />} />
          <Route path="/honeywell-pc43d" element={<HoneywellPC43dPage />} />
          <Route path="/apg-cash-drawer" element={<APGCashDrawerPage />} />
          <Route path="/socket-scan-s720" element={<SocketScanS720Page />} />
          <Route path="/pos-diagram" element={<POSDiagramPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/roadmap" element={<RoadMapPage onSignupClick={() => window.dispatchEvent(new CustomEvent('openSignupModal'))} onNavigate={navigateTo} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
