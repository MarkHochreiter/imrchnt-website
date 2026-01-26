import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingCart, BarChart3, Users, Zap, ChevronRight } from 'lucide-react'
import logo from './assets/logo.png'
import allinone from './assets/allinone.png'
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
import SocketScanS840Page from './components/SocketScanS840Page.jsx'
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
import SPIConverterPage from './components/SPIConverterPage.jsx'
import StatementAnalyzerPage from './components/StatementAnalyzerPage.jsx'
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
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-houschka-extrabold leading-tight mb-6">
                Seamless POS <br />
                Intuitive Design <br />
                Built for Bookstores
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                In store, Pop up, Off site. Network connection or not.  
                Sell anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-[#f08e80] hover:bg-violet-400 text-white text-lg px-8 py-4"
                  onClick={handleSignupClick}
                >
                  Request access
                </Button>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <p className="text-base text-gray-300 font-houschka-medium mb-2 italic">
                  "I've never had such a smooth time at a large offsite and I can't tell you how excited I am about it!"
                </p>
                <p className="text-sm text-gray-400 font-houschka-medium">
                  H - Bookstore Manager<br />
                  Still North Books & Bar, Hanover, NH
                </p>
              </div>
            </div>
            
            {/* Right side - Payment terminal image */}
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 lg:h-full flex items-center justify-center lg:justify-end lg:pr-8">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img 
                  src={allinone} 
                  alt="Payment Terminal" 
                  className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                {/* Subtle glow effect behind the image */}
                <div className="absolute inset-0 bg-[#f08e80]/20 blur-3xl -z-10 scale-110"></div>
              </div>
            </div>
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
                   Web, Client, PC, Mac, Android or iOS. <br /> 
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

// Main App Component
function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isFeatureRequestModalOpen, setIsFeatureRequestModalOpen] = useState(false)
  const [isHardwareCartOpen, setIsHardwareCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const [hardwareCart, setHardwareCart] = useState([])

  useEffect(() => {
    const handleOpenSignupModal = () => setIsSignupModalOpen(true)
    const handleOpenFeatureRequestModal = () => setIsFeatureRequestModalOpen(true)
    const handleOpenHardwareCart = () => setIsHardwareCartOpen(true)
    
    window.addEventListener('openSignupModal', handleOpenSignupModal)
    window.addEventListener('openFeatureRequestModal', handleOpenFeatureRequestModal)
    window.addEventListener('openHardwareCart', handleOpenHardwareCart)
    
    return () => {
      window.removeEventListener('openSignupModal', handleOpenSignupModal)
      window.removeEventListener('openFeatureRequestModal', handleOpenFeatureRequestModal)
      window.removeEventListener('openHardwareCart', handleOpenHardwareCart)
    }
  }, [])

  const addToCart = (item) => {
    setHardwareCart(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
      }
      return [...prev, {...item, quantity: 1}]
    })
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setHardwareCart(prev => prev.filter(item => item.id !== id))
    } else {
      setHardwareCart(prev => prev.map(item => 
        item.id === id ? {...item, quantity} : item
      ))
    }
  }

  const removeFromCart = (id) => {
    setHardwareCart(prev => prev.filter(item => item.id !== id))
  }

  const getTotalItems = () => {
    return hardwareCart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeMegaMenu={activeMegaMenu}
          setActiveMegaMenu={setActiveMegaMenu}
          hardwareCartCount={getTotalItems()}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/instore" element={<InStorePage />} />
            <Route path="/offsite" element={<OffsitePage />} />
            <Route path="/credit-card-processing" element={<CreditCardProcessingPage />} />
            <Route path="/s1f2" element={<S1f2Page addToCart={addToCart} />} />
            <Route path="/ams1" element={<Ams1Page addToCart={addToCart} />} />
            <Route path="/sfo1" element={<Sfo1Page addToCart={addToCart} />} />
            <Route path="/epson-t88" element={<EpsonT88Page addToCart={addToCart} />} />
            <Route path="/honeywell-pc43d" element={<HoneywellPC43dPage addToCart={addToCart} />} />
            <Route path="/apg-cash-drawer" element={<APGCashDrawerPage addToCart={addToCart} />} />
            <Route path="/socketscan-s720" element={<SocketScanS720Page addToCart={addToCart} />} />
            <Route path="/socketscan-s840" element={<SocketScanS840Page addToCart={addToCart} />} />
            <Route path="/pos-diagram" element={<POSDiagramPage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/singledevice" element={<SingleDevicePage />} />
            <Route path="/roadmap" element={<RoadMapPage />} />
            <Route path="/spi-converter" element={<SPIConverterPage />} />
            <Route path="/statement-analyzer" element={<StatementAnalyzerPage />} />
          </Routes>
        </main>

        <SignupModal 
          isOpen={isSignupModalOpen} 
          onClose={() => setIsSignupModalOpen(false)} 
        />
        
        <FeatureRequestModal 
          isOpen={isFeatureRequestModalOpen} 
          onClose={() => setIsFeatureRequestModalOpen(false)} 
        />

        <HardwareCartModal
          isOpen={isHardwareCartOpen}
          onClose={() => setIsHardwareCartOpen(false)}
          cartItems={hardwareCart}
          updateQuantity={updateCartQuantity}
          removeItem={removeFromCart}
        />
      </div>
    </Router>
  )
}

// Navigation Component
function Navigation({ isMobileMenuOpen, setIsMobileMenuOpen, activeMegaMenu, setActiveMegaMenu, hardwareCartCount }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignupClick = () => {
    window.dispatchEvent(new CustomEvent('openSignupModal'))
  }

  const handleHardwareCartClick = () => {
    window.dispatchEvent(new CustomEvent('openHardwareCart'))
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Implus Logo" className="h-8" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div 
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('product')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-houschka-medium">
                Product <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeMegaMenu === 'product' && <MegaMenu />}
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('hardware')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-houschka-medium">
                Hardware <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeMegaMenu === 'hardware' && <HardwareMegaMenu />}
            </div>

            <Link to="/pricing" className="text-gray-700 hover:text-gray-900 font-houschka-medium">
              Pricing
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('support')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-houschka-medium">
                Support <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeMegaMenu === 'support' && <SupportMegaMenu />}
            </div>

            <button
              onClick={handleHardwareCartClick}
              className="relative text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              {hardwareCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f08e80] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {hardwareCartCount}
                </span>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              className="bg-[#f08e80] hover:bg-violet-400 text-white"
              onClick={handleSignupClick}
            >
              Request access
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link to="/system" className="block text-gray-700 hover:text-gray-900 font-houschka-medium">
              Product
            </Link>
            <Link to="/s1f2" className="block text-gray-700 hover:text-gray-900 font-houschka-medium">
              Hardware
            </Link>
            <Link to="/pricing" className="block text-gray-700 hover:text-gray-900 font-houschka-medium">
              Pricing
            </Link>
            <Link to="/roadmap" className="block text-gray-700 hover:text-gray-900 font-houschka-medium">
              Support
            </Link>
            <Button 
              className="w-full bg-[#f08e80] hover:bg-violet-400 text-white"
              onClick={handleSignupClick}
            >
              Request access
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default App
