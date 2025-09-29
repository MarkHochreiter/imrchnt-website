import { Printer, Wifi, Zap, Shield, ArrowLeft, Bluetooth, Usb, Settings, Clock, Package, Scan } from 'lucide-react'
import honeywellPC43d from '../assets/43d.png'

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

function HoneywellPC43dPage({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Package className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Honeywell PC43d</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Desktop Direct Thermal Label Printer</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Simple to install and easy to use, the PC43d is perfect for space-constrained settings. Designed for transportation, healthcare, retail and hospitality markets, as well as small and medium businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white"
                  onClick={onContactSales}
                >
                  Generate Quote
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <img src={honeywellPC43d} alt="HoneyWell 43d" className="max-w-full h-auto" />
                <span className="sr-only">Honeywell PC43d Label Printer</span>
              </div>
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
              <Zap className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Speed Printing</h3>
              <p className="text-gray-600">Print speeds up to 8.0 inches per second (203mm/sec) for efficient label production.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Settings className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Media Loading</h3>
              <p className="text-gray-600">Simple one-handed media reloading and drop-in media loading makes resupply a breeze.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Scan className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Printer Technology</h3>
              <p className="text-gray-600">Runs apps right inside the printer with support for keyboards, scanners, and USB peripherals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Language Support</h3>
              <p className="text-gray-600">ZSim2 printer command language support makes upgrading from other printers easy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Usb className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Connectivity</h3>
              <p className="text-gray-600">User-installable connectivity upgrades and accessories for maximum flexibility.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Language Interface</h3>
              <p className="text-gray-600">Ten-language LCD or intuitive icon graphical user interface for easy operation.</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Print Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Print Technology</span>
                  <span className="text-gray-900">Direct Thermal</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Print Speed</span>
                  <span className="text-gray-900">Up to 8.0 in/sec (203mm/sec)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Print Resolution</span>
                  <span className="text-gray-900">203 dpi or 300 dpi</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Maximum Print Width</span>
                  <span className="text-gray-900">4.6 inches (118mm)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Maximum Label Length</span>
                  <span className="text-gray-900">68 inches</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Media Types</span>
                  <span className="text-gray-900">Labels, Tags, Continuous Paper</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hardware & Connectivity</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">11.1" x 4.9" x 8.5"</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">7.5 lbs (3.4 kg)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Standard Connectivity</span>
                  <span className="text-gray-900">USB, Serial</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Optional Connectivity</span>
                  <span className="text-gray-900">Ethernet, WiFi, Bluetooth</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">User Interface</span>
                  <span className="text-gray-900">10-language LCD or Icon display</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Power Options</span>
                  <span className="text-gray-900">AC adapter or battery power</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Handling */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Media Handling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Package className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Adhesive Labels</h3>
              <p className="text-gray-600">Standard label stock support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Scan className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Adhesive Tags</h3>
              <p className="text-gray-600">Tag and ticket printing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Printer className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuous Paper</h3>
              <p className="text-gray-600">Roll paper support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Settings className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Linerless Labels</h3>
              <p className="text-gray-600">Advanced media handling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-[#f08e80] mb-2">Transportation</div>
              <p className="text-sm text-gray-600">Shipping labels and logistics</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">Healthcare</div>
              <p className="text-sm text-gray-600">Patient wristbands and labels</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">Retail</div>
              <p className="text-sm text-gray-600">Price tags and inventory labels</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Hospitality</div>
              <p className="text-sm text-gray-600">Guest services and identification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Smart Printer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Usb className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">USB Host Port</h3>
              <p className="text-gray-600">Configure and update printer without a computer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Scan className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Peripheral Support</h3>
              <p className="text-gray-600">Add keyboards, scanners, or other USB devices</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Settings className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wall Mount Ready</h3>
              <p className="text-gray-600">Flexible placement options including wall mounting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to streamline your labeling?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about the Honeywell PC43d and get pricing for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
                  size="lg" 
                  className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={onContactSales}
              >
                Request Quote
              </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HoneywellPC43dPage
