import { Receipt, Wifi, Smartphone, Zap, Shield, ArrowLeft, Lock, Settings, Package, Printer } from 'lucide-react'
import apgCashDrawerImage from '../assets/cash_drawer.png'

// Button component to match your design system
const Button = ({ children, className = '', size = 'default', variant = 'default', onClick, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    default: 'bg-[#f08e80] hover:bg-[#e07d70] text-white',
    outline: 'border border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white bg-transparent'
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

function APGCashDrawerPage({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Receipt className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">APG VB320-1-BL1616</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Standard-Duty Cash Drawer</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                The APG Vasario Series standard-duty cash drawer is designed for low to medium-volume point of sale environments. Built with steel construction and featuring seamless receipt printer integration, it provides secure cash management for your business operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white"
                  onClick={onContactSales}
                >
                  Request Quote
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <img src={apgCashDrawerImage} alt="APG Cash Drawer" className="max-w-full h-auto" />
                <span className="sr-only">APG VB320-1-BL1616 Cash Drawer</span>    
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Printer className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Receipt Printer Integration</h3>
              <p className="text-gray-600">Seamlessly connects to 24V receipt printers via MultiPRO 320 interface with RJ45 connection for integrated POS systems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Lock className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Function Lock</h3>
              <p className="text-gray-600">Four-function lock system: lock closed, lock open, electronic opening via connected device, or manual opening.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Steel Construction</h3>
              <p className="text-gray-600">Durable steel construction with black powder-coated finish that resists wear and corrosion for long-lasting performance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organized Storage</h3>
              <p className="text-gray-600">Five bill compartments and five coin compartments with adjustable widths for organized money management by denomination.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Settings className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Roller Bearings</h3>
              <p className="text-gray-600">Smooth roller bearing system allows effortless drawer sliding with secure latch mechanism for reliable operation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Slots</h3>
              <p className="text-gray-600">Two convenient slots allow insertion of checks, credit card receipts, or transaction media without opening the drawer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Physical Dimensions</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Width</span>
                  <span className="text-gray-900">16.2 inches</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Depth</span>
                  <span className="text-gray-900">16.3 inches</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Height</span>
                  <span className="text-gray-900">4.3 inches (3.8" without feet)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Product Color</span>
                  <span className="text-gray-900">Black</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Construction</span>
                  <span className="text-gray-900">Steel with powder coating</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Till Material</span>
                  <span className="text-gray-900">Plastic with adjustable compartments</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Storage & Connectivity</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bill Compartments</span>
                  <span className="text-gray-900">5 compartments</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Coin Compartments</span>
                  <span className="text-gray-900">5 compartments (8 total)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Currency Support</span>
                  <span className="text-gray-900">USD</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interface</span>
                  <span className="text-gray-900">MultiPRO 320 with RJ45</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Release Type</span>
                  <span className="text-gray-900">Electronic</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Check Slots</span>
                  <span className="text-gray-900">2 slots for media insertion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the Box */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <DollarSign className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">VB320-1-BL1616 Cash Drawer</h3>
              <p className="text-gray-600">Main cash drawer unit with steel construction</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Package className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plastic Till Insert</h3>
              <p className="text-gray-600">Organized compartments with adjustable dividers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Settings className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation Hardware</h3>
              <p className="text-gray-600">Mounting brackets and connection cables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Built for Reliability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#f08e80] mb-2">1M+</div>
              <div className="text-gray-600">Operations Tested</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">-22°F to +122°F</div>
              <div className="text-gray-600">Storage Temperature Range</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">+32°F to +104°F</div>
              <div className="text-gray-600">Operating Temperature Range</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perfect Receipt Printer Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Seamless POS Integration</h3>
              <p className="text-lg text-gray-600 mb-6">
                The APG VB320-1-BL1616 is specifically designed to integrate perfectly with receipt printers, creating a complete point-of-sale solution. The MultiPRO 320 interface connects directly to 24V receipt printers via standard RJ45 connection.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Printer className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Direct Printer Connection</h4>
                    <p className="text-gray-600">Connects to receipt printers for automatic drawer opening on transaction completion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Electronic Release</h4>
                    <p className="text-gray-600">Drawer opens electronically when triggered by connected POS terminal or printer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Settings className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Setup</h4>
                    <p className="text-gray-600">Simple plug-and-play installation with standard RJ45 connectivity</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Compatible Printer Brands</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold text-gray-900">Epson</div>
                  <p className="text-sm text-gray-600">TM Series</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold text-gray-900">Star</div>
                  <p className="text-sm text-gray-600">TSP Series</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold text-gray-900">Citizen</div>
                  <p className="text-sm text-gray-600">CT-S Series</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold text-gray-900">Bixolon</div>
                  <p className="text-sm text-gray-600">SRP Series</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Flexible Installation Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Counter-Top Mounting</h3>
              <p className="text-gray-600 mb-4">
                Place directly on counter surface and support additional POS equipment on top including monitors, receipt printers, or terminals.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Easy access for staff</li>
                <li>• Supports additional equipment</li>
                <li>• No special installation required</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Under-Counter Mounting</h3>
              <p className="text-gray-600 mb-4">
                Mount under counter with optional brackets to save valuable counter space while maintaining easy access.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Saves counter space</li>
                <li>• Secure mounting brackets available</li>
                <li>• Clean, professional appearance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to secure your cash management?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about the APG VB320-1-BL1616 cash drawer and get pricing for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button 
                className="w-full bg-white text-[#f08e80] hover:bg-gray-100"
                onClick={onContactSales}
              >
                Generate Quote
              </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default APGCashDrawerPage
