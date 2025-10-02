import { ChevronDown, Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingCart, BarChart3, Users, Zap, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
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
                {megaMenuVisible && (
                  <MegaMenu 
                    onNavigate={handleNavigation}
                    onClose={() => setMegaMenuVisible(false)}
                  />
                )}
              </div>

              <div className="relative">
                <button
                  onClick={handleHardwareMenuClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Hardware
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {hardwareMegaMenuVisible && (
                  <HardwareMegaMenu 
                    onNavigate={handleHardwareNavigation}
                    onClose={() => setHardwareMegaMenuVisible(false)}
                  />
                )}
              </div>

              <Link
                to="/pricing"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Pricing
              </Link>

              <div className="relative">
                <button
                  onClick={handleSupportMenuClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Support
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {supportMegaMenuVisible && (
                  <SupportMegaMenu 
                    onNavigate={handleNavigation}
                    onClose={() => setSupportMegaMenuVisible(false)}
                  />
                )}
              </div>

              <Button 
                onClick={handleContactSalesClick}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Contact Sales
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Solutions */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
                >
                  Solutions
                  <ChevronDown className={`h-4 w-4 transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileSolutionsData.map((category) => (
                      <div key={category.title}>
                        <div className="text-sm font-medium text-gray-500 px-3 py-1">{category.title}</div>
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            to={`/${item.page}`}
                            onClick={() => {
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
                            className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hardware */}
              <div>
                <button
                  onClick={() => setMobileHardwareOpen(!mobileHardwareOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
                >
                  Hardware
                  <ChevronDown className={`h-4 w-4 transform ${mobileHardwareOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileHardwareOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileHardwareData.map((item) => (
                      <Link
                        key={item.name}
                        to={`/${item.page}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
              >
                Pricing
              </Link>

              {/* Support */}
              <div>
                <button
                  onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
                >
                  Support
                  <ChevronDown className={`h-4 w-4 transform ${mobileSupportOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSupportOpen && (
                  <div className="pl-4 space-y-1">
                    {mobileSupportData.map((item) => (
                      item.page ? (
                        <Link
                          key={item.name}
                          to={`/${item.page}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.onClick()
                            setMobileMenuOpen(false)
                          }}
                          className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                        >
                          {item.name}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Sales */}
              <button
                onClick={() => {
                  handleContactSalesClick()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 text-base font-medium rounded-md mx-3 mt-4"
              >
                Contact Sales
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
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

// Home page component
function HomePage() {
  const navigate = useNavigate()

  const handleSignupClick = () => {
    // This will be handled by the parent component's modal state
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
                className="bg-[#f08e80] hover:bg-violet-400 text-white text-lg px-8 py-4"
                onClick={handleSignupClick}
              >
                Request access
              </Button>
              <p className="text-base md:text-right text-gray-300 font-houschka-medium mb-8 max-w-2xl ml-auto">
             "I've never had such a smooth time at a large offsite and I can't tell you how excited I am about it!"
              </p>
            </div>
            <p className="text-base md:text-right text-gray-300 font-houschka-medium mb-8 max-w-2xl ml-auto">
              H - Bookstore Manager  

              Still North Books & Bar Hanover, NH
            </p>
          </div>
        </div>
      </section>
      
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
  )
}

// Main App component with Router
function App() {
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  // Listen for custom events to open modals
  useEffect(() => {
    const handleOpenSignupModal = () => setSignupModalOpen(true)
    window.addEventListener('openSignupModal', handleOpenSignupModal)
    return () => window.removeEventListener('openSignupModal', handleOpenSignupModal)
  }, [])

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
          <Route path="/system" element={<SystemPage onNavigate={navigateTo} handleSignupClick={() => setSignupModalOpen(true)} />} />
          <Route path="/admin" element={<AdminPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/reports" element={<ReportsPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/inventory" element={<InventoryPage onNavigateBack={() => navigateTo('system')} />} />
          <Route path="/customer" element={<CustomerPage onNavigateBack={() => navigateTo('instore')} />} />
          <Route path="/single" element={<SingleDevicePage onNavigateBack={() => navigateTo('offsite')} />} />
          <Route path="/instore" element={<InStorePage onNavigate={navigateTo} handleSignupClick={() => setSignupModalOpen(true)} />} />
          <Route path="/offsite" element={<OffsitePage onNavigate={navigateTo} handleSignupClick={() => setSignupModalOpen(true)} />} />
          <Route path="/credit-card-processing" element={<CreditCardProcessingPage onNavigateBack={() => navigateTo('offsite')} />} />
          <Route path="/s1f2" element={<S1f2Page />} />
          <Route path="/ams1" element={<Ams1Page />} />
          <Route path="/sfo1" element={<Sfo1Page />} />
          <Route path="/epson-t88" element={<EpsonT88Page />} />
          <Route path="/honeywell-pc43d" element={<HoneywellPC43dPage />} />
          <Route path="/apg-cash-drawer" element={<APGCashDrawerPage />} />
          <Route path="/socket-scan-s720" element={<SocketScanS720Page />} />
          <Route path="/pos-diagram" element={<POSDiagramPage />} />
          <Route path="/roadmap" element={<RoadMapPage />} />
        </Routes>

        {/* Global Modals */}
        <SignupModal 
          isOpen={signupModalOpen} 
          onClose={() => setSignupModalOpen(false)} 
        />
      </div>
    </Router>
  )
}

export default App
