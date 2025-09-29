import { Printer, Wifi, Smartphone, Zap, Shield, ArrowLeft, Bluetooth, Usb, Settings, DollarSign } from 'lucide-react'
import epsonT88Image from '../assets/epsont88.png'

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

function EpsonT88Page({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">0
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Printer className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Epson TM-T88V</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Professional POS Receipt Printer</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Epson's mPOS-friendly TM-T88V is the industry's leading POS thermal printer. Fast, reliable, easy to configure and supports all the leading mobile operating systems including iOS, Android and Windows.
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
                <img src={epsonT88Image} alt="Epson T88" className="max-w-full h-auto" />
                <span className="sr-only">Epson TM-T88V Receipt Printer</span>    
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
              <p className="text-gray-600">Fast printing up to 300mm/second for both text and graphics, ensuring quick receipt generation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Wifi className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Connectivity</h3>
              <p className="text-gray-600">Supports WiFi 802.11a/b/g/n, Bluetooth 2.1 + EDR, USB, Serial, and Ethernet connections.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Settings className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Configuration</h3>
              <p className="text-gray-600">DHCP enabled and printer class model available for easy IP/network configuration and discovery.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry-Leading Reliability</h3>
              <p className="text-gray-600">MTBF of 360,000 hours and MCBF of 70,000,000 lines with 4-year limited warranty.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Smartphone className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Compatible</h3>
              <p className="text-gray-600">mPOS-friendly printer compatible with iOS, Android and Windows mobile devices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paper Saving</h3>
              <p className="text-gray-600">Special print options reduce paper usage up to 30% while maintaining print quality.</p>
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
                  <span className="text-gray-900">Thermal line printing</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Print Speed</span>
                  <span className="text-gray-900">Max. 11.8"/sec (300mm)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Print Width</span>
                  <span className="text-gray-900">80mm / 58mm models</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Column Capacity</span>
                  <span className="text-gray-900">80mm: 42/56 columns, 58mm: 30/40</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Barcode Support</span>
                  <span className="text-gray-900">CODABAR, PDF417, QR-CODE, MaxiCode</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Auto Cutter</span>
                  <span className="text-gray-900">2 million cuts reliability</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hardware & Connectivity</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">5.71" x 7.68" x 5.83"</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">3.5 lbs (1.6 kg)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Power Supply</span>
                  <span className="text-gray-900">24VDC ± 7%, 1.8A</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Connectivity</span>
                  <span className="text-gray-900">USB, Serial, Parallel, Ethernet</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Wireless</span>
                  <span className="text-gray-900">WiFi 802.11a/b/g/n, Bluetooth 2.1</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Operating Systems</span>
                  <span className="text-gray-900">Windows, Mac OS X, Linux</span>
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
              <Printer className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">TM-T88V Printer</h3>
              <p className="text-gray-600">Main thermal receipt printer unit</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Zap className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Power Adapter</h3>
              <p className="text-gray-600">AC adapter with AC cord and power switch cover</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Settings className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Setup Materials</h3>
              <p className="text-gray-600">Setup guide, drivers, utilities, and starter paper roll</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Industry-Leading Reliability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#f08e80] mb-2">360,000</div>
              <div className="text-gray-600">Hours MTBF (Mean Time Between Failures)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">70M</div>
              <div className="text-gray-600">Lines MCBF (Mean Characters Between Failures)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">2M</div>
              <div className="text-gray-600">Auto Cutter Cuts Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Systems */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compatible Operating Systems</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-2">Windows</div>
              <p className="text-sm text-gray-600">7, Vista, XP, 2000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-2">Mac OS X</div>
              <p className="text-sm text-gray-600">v10.4, v10.5, v10.6</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-2">Linux</div>
              <p className="text-sm text-gray-600">Full support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-2">Mobile</div>
              <p className="text-sm text-gray-600">iOS, Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to upgrade your receipt printing?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about the Epson TM-T88V and get pricing for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button 
                  size="lg" 
                  className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4 !text-[#f08e80]"
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

export default EpsonT88Page
