import { ChevronDown, Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingCart, BarChart3, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import logo from './assets/logo.png'
import PricingPage from './components/PricingPage.jsx'
import MegaMenu from './components/MegaMenu.jsx'
import HardwareMegaMenu from './components/HardwareMegaMenu.jsx'
import SupportMegaMenu from './components/SupportMegaMenu.jsx'
import InStorePage from './components/InStorePage.jsx'
import OffsitePage from './components/OffsitePage.jsx'
import ManagePage from './components/ManagePage.jsx'
import CreditCardProcessingPage from './components/CreditCardProcessingPage.jsx'
import S1f2Page from './components/S1f2Page.jsx'
import Ams1Page from './components/Ams1Page.jsx'
import Sfo1Page from './components/Sfo1Page.jsx'
import SignupModal from './components/SignupModal.jsx'
import './App.css'

// Button component
const Button = ({ children, className = '', size = 'default', onClick, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
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

  const handleHardwareNavigation = (page) => {
    setCurrentPage(page)
    setHardwareMegaMenuVisible(false)
  }

  const handleNavigation = (page, section = null) => {
    setCurrentPage(page)
    setMegaMenuVisible(false)
    // Scroll to section after page loads
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleSignupClick = () => {
    setSignupModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')}>
                <img src={logo} alt="Implus Offsite POS Logo" className="h-8" />
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
              </div>
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  onClick={() => setSupportMegaMenuVisible(!supportMegaMenuVisible)}
                >
                  Support <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://pos.imrchnt.com" 
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 text-gray-700">Solutions</a>
              <a href="#" className="block py-2 text-gray-700">Pricing</a>
              <a href="#" className="block py-2 text-gray-700">Hardware</a>
              <a href="#" className="block py-2 text-gray-700">Support</a>
              <a href="#" className="block py-2 text-gray-700">Log in</a>
              <Button 
                className="w-full bg-[#f08e80] hover:bg-green-700 text-white mt-2"
                onClick={handleSignupClick}
              >
                Request access
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mega Menus */}
      <MegaMenu 
        isVisible={megaMenuVisible} 
        onMouseEnter={() => setMegaMenuVisible(true)}
        onMouseLeave={() => setMegaMenuVisible(false)}
        onNavigate={handleNavigation}
      />
      <HardwareMegaMenu 
        isVisible={hardwareMegaMenuVisible} 
        onMouseEnter={() => setHardwareMegaMenuVisible(true)}
        onMouseLeave={() => setHardwareMegaMenuVisible(false)}
        onNavigate={handleHardwareNavigation}
      />
      <SupportMegaMenu 
        isVisible={supportMegaMenuVisible} 
        onMouseEnter={() => setSupportMegaMenuVisible(true)}
        onMouseLeave={() => setSupportMegaMenuVisible(false)}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
      />

      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Seamless POS. Intuitive Design.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Pop up, Off site, In store. Network connection or not.<br /> Minimal training. Anyone, anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#f08e80] hover:bg-violet-400 text-white text-lg px-8 py-4"
                onClick={handleSignupClick}
              >
                Request access
              </Button>
              <p className="text-base md:text-right text-gray-300 mb-8 max-w-2xl ml-auto">
             "I've never had such a smooth time at a large offsite and I can't tell you how excited I am about it!"
              </p>
            </div>
            <p className="text-base md:text-right text-gray-300 mb-8 max-w-2xl ml-auto">
              H - Bookstore Manager<br />
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
             Web, Client, PC, Mac, Android or iOS.<br/> Sell on desktop, mobile, tablet, or card reader. 
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

    {/* Features Grid
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to sell
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From payment processing to inventory management, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Smartphone className="h-12 w-12 text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile POS</h3>
              <p className="text-gray-600">
                Turn any device into a point of sale with our mobile app.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ShoppingCart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-gray-600">
                Track stock levels, manage variants, and automate reordering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-gray-600">
                Get insights into sales, customers, and business performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
              <p className="text-gray-600">
                Build customer profiles and create targeted marketing campaigns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Globe className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Channel Selling</h3>
              <p className="text-gray-600">
                InStore, Offsite, Pop-Up, all on one platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Checkout</h3>
              <p className="text-gray-600">
                Lightning-fast transactions with multiple payment options.
              </p>
            </div>
          </div>
        </div>
      </section>
          */}

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
                The commerce platform trusted by millions of businesses worldwide.
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
            <p>&copy; 2024 Commerce Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </>
      ) : currentPage === 'pricing' ? (
        <PricingPage />
      ) : currentPage === 'instore' ? (
        <InStorePage />
      ) : currentPage === 'offsite' ? (
        <OffsitePage />
      ) : currentPage === 'manage' ? (
        <ManagePage />
      ) : currentPage === 'credit-cards' ? (
        <CreditCardProcessingPage />
      ) : currentPage === 's1f2' ? (
        <S1f2Page onNavigateBack={() => setCurrentPage('home')} />
      ) : currentPage === 'ams1' ? (
        <Ams1Page onNavigateBack={() => setCurrentPage('home')} />
      ) : currentPage === 'sfo1' ? (
        <Sfo1Page onNavigateBack={() => setCurrentPage('home')} />
      ) : null}
    </div>
  )
}

export default App

