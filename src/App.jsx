import { Button } from '@/components/ui/button.jsx'
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
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [megaMenuVisible, setMegaMenuVisible] = useState(false)
  const [hardwareMegaMenuVisible, setHardwareMegaMenuVisible] = useState(false)
  const [supportMegaMenuVisible, setSupportMegaMenuVisible] = useState(false)

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
              <a href="#" className="text-gray-700 hover:text-gray-900">Log in</a>
              <Button className="bg-[#f08e80] hover:bg-green-700 text-white">
                Start for free
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
              <Button className="w-full bg-[#f08e80] hover:bg-green-700 text-white mt-2">
                Start for free
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

      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Seamless POS. Anywhere, anytime
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              In store, Pop up, Off site, on line or off. Intuitive design for minimal training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#f08e80] hover:bg-green-700 text-white text-lg px-8 py-4">
                Start for free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                Why we build Commerce
              </Button>
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
             Available as Web, Client, Android or iOS. Sell on desktop, mobile, tablet, or card reader. 
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-[#f08e80]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#f08e80]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start fast</h3>
              <p className="text-gray-600">
                Instant KYC option paired with Tap to Pay on smartphone gets you selling rapidly. 
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Go big</h3>
              <p className="text-gray-600">
                Seamlessly scale from Pop Up to Multistore.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Go home</h3>
              <p className="text-gray-600">
                Monitor your organization from home or anywhere else you might be, track sales in real time from any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sell here, there, and everywhere
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get a stunning store that's made to sell. Design fast with AI, choose a stylish theme, 
                or build completely custom for full control.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>In-person point of sale</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Publish across channels</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>World's best checkout</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f08e80]/10 p-4 rounded-lg text-center">
                  <ShoppingCart className="h-8 w-8 text-[#f08e80] mx-auto mb-2" />
                  <div className="text-sm font-medium">Online Store</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Mobile App</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Social Media</div>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Marketplaces</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#f08e80] mb-2">15%</div>
                  <div className="text-sm text-gray-600">Higher conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">150M+</div>
                  <div className="text-sm text-gray-600">High-intent shoppers</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The world's best-converting checkout
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our checkout converts 15% higher on average than other commerce platforms and 
                exposes your brand to 150 million buy-ready shoppers.
              </p>
              <p className="text-sm text-gray-500">
                Based on external study with a Big Three global consulting firm in April, 2023.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            There's no better place for you to build
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#f08e80] mb-2">$5B</div>
              <div className="text-gray-600">Loaned out so far</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M</div>
              <div className="text-gray-600">Loans up to</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">0%</div>
              <div className="text-gray-600">Equity taken</div>
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
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center">
              <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <span>Add your first product</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <span>Customize your store</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white text-[#f08e80] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <span>Set up payments</span>
            </div>
          </div>
          <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4">
            Start for free
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

