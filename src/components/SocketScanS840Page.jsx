import { Scan, Wifi, Smartphone, Zap, Shield, ArrowLeft, Bluetooth, Battery, QrCode, Package } from 'lucide-react'
import socketScanImage from '../assets/socketscans840.png'

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

function SocketScanS840Page({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Scan className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">SocketScan S840</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Professional Bluetooth Barcode Scanner</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                The SocketScan S840 is a professional-grade Bluetooth barcode scanner designed for high-volume scanning operations. With enhanced durability, extended range, and superior scanning performance, it's the perfect choice for demanding retail, warehouse, and logistics environments.
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
                <img src={socketScanImage} alt="SocketScan S840" className="max-w-full h-auto" />
                <span className="sr-only">SocketScan S840 Professional Bluetooth Barcode Scanner</span>    
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
              <QrCode className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced 1D & 2D Scanning</h3>
              <p className="text-gray-600">High-performance scanning engine reads all popular 2D barcodes including PDF417, QR Codes, Data Matrix, and all standard 1D linear barcodes with exceptional speed and accuracy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Bluetooth className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Extended Bluetooth Range</h3>
              <p className="text-gray-600">Enhanced Bluetooth connectivity with extended range up to 100 meters (330 feet), providing maximum mobility and flexibility in large spaces.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Smartphone className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Superior Screen Scanning</h3>
              <p className="text-gray-600">Advanced imaging technology reads barcodes from both paper and digital screens with exceptional clarity, including mobile wallets, digital tickets, and IDs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Battery className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Extended Battery Life</h3>
              <p className="text-gray-600">High-capacity rechargeable battery provides up to 50,000 scans per charge with intelligent power management and real-time battery status notifications.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rugged & Durable</h3>
              <p className="text-gray-600">Built to withstand demanding environments with IP54 rating for dust and water resistance, plus drop resistance up to 6 feet (1.8m) to concrete.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Speed Performance</h3>
              <p className="text-gray-600">Lightning-fast scan speed with aggressive scanning capability for damaged or poorly printed barcodes, ensuring maximum productivity.</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Scanning Capabilities</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Barcode Types</span>
                  <span className="text-gray-900">1D & 2D Barcodes</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">2D Formats</span>
                  <span className="text-gray-900">PDF417, QR Codes, Data Matrix, Aztec</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Scan Surface</span>
                  <span className="text-gray-900">Paper & Digital Screens</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Use Case</span>
                  <span className="text-gray-900">Professional & High-Volume</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Scanning Mode</span>
                  <span className="text-gray-900">Trigger, Auto-scan, Presentation</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Scan Speed</span>
                  <span className="text-gray-900">Up to 60 scans per second</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Connectivity & Durability</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Connectivity</span>
                  <span className="text-gray-900">Bluetooth 5.0 Wireless</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bluetooth Range</span>
                  <span className="text-gray-900">Up to 100m (330 ft)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Battery Capacity</span>
                  <span className="text-gray-900">50,000+ scans per charge</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Durability</span>
                  <span className="text-gray-900">IP54, 6ft drop resistance</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Operating Temp</span>
                  <span className="text-gray-900">0°C to 50°C (32°F to 122°F)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">SKU</span>
                  <span className="text-gray-900">CX4067-3140</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Compatibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Platform Compatibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Native Support</h3>
              <p className="text-lg text-gray-600 mb-6">
                The SocketScan S840 is natively integrated with imrchnt, ensuring seamless operation without additional software requirements. Plug and play functionality means you can start scanning immediately.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Device Compatibility</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Smartphone className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile Devices</h4>
                    <p className="text-gray-600">iPhone, iPad, iPod, Android smartphones and tablets</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Desktop Systems</h4>
                    <p className="text-gray-600">Windows, macOS, and Linux computers with Bluetooth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bluetooth className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Bluetooth 5.0 Standard</h4>
                    <p className="text-gray-600">Enhanced connectivity with backward compatibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Available Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">S840 + Charging Dock</h3>
              <p className="text-gray-600 mb-4">
                Professional charging dock keeps your scanner powered and ready for continuous high-volume operations. Ideal for retail counters and warehouse stations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Fast charging capability</li>
                <li>• Always ready for use</li>
                <li>• Professional presentation</li>
                <li>• Secure positioning</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">S840 + Charging Stand</h3>
              <p className="text-gray-600 mb-4">
                Versatile charging stand with hands-free presentation mode for auto-scanning applications. Perfect for self-service kiosks and checkout counters.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Hands-free auto scanning</li>
                <li>• Adjustable angle positioning</li>
                <li>• Protective design features</li>
                <li>• Presentation mode support</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">S840 + Holster</h3>
              <p className="text-gray-600 mb-4">
                Durable belt holster for mobile scanning operations. Keeps your scanner secure and accessible while moving through warehouses or retail floors.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Secure belt attachment</li>
                <li>• Quick-release mechanism</li>
                <li>• Protective padding</li>
                <li>• Hands-free carrying</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#f08e80]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-[#f08e80]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Warehouse Operations</h3>
              <p className="text-gray-600">High-volume inventory management and asset tracking with extended range</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Retail Environments</h3>
              <p className="text-gray-600">Fast checkout processing and mobile POS operations</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics & Shipping</h3>
              <p className="text-gray-600">Package tracking and delivery verification with rugged durability</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-gray-600">Patient identification and medication tracking with reliable performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to upgrade your scanning operations?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about the SocketScan S840 and get pricing for your business needs.
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

export default SocketScanS840Page
