import { Scan, Wifi, Smartphone, Zap, Shield, ArrowLeft, Bluetooth, Battery, QrCode, Package } from 'lucide-react'
import socketScanImage from '../assets/socketscan-700.png'

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

function SocketScanS720Page({ onNavigateBack, onContactSales }) {
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
                  <h1 className="text-4xl font-bold text-gray-900">SocketScan S720</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Bluetooth Barcode Scanner</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                The SocketScan S720 is a versatile Bluetooth barcode scanner that reads both 1D and 2D barcodes on paper and screen. Lightweight, ergonomically designed, and equipped with long-lasting batteries, it's perfect for everyday general-purpose scanning in budget-conscious businesses.
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
                <img src={socketScanImage} alt="SocketScan S720" className="max-w-full h-auto" />
                <span className="sr-only">SocketScan S720 Bluetooth Barcode Scanner</span>    
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1D & 2D Barcode Reading</h3>
              <p className="text-gray-600">Scans popular 2D barcodes including PDF417, QR Codes, and Data Matrix, plus all standard 1D linear barcodes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Bluetooth className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wireless Bluetooth</h3>
              <p className="text-gray-600">Bluetooth connectivity provides increased mobility and productivity while helping reduce human error.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Smartphone className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Screen Scanning</h3>
              <p className="text-gray-600">Reads barcodes from both paper and digital screens, including mobile wallets and digital IDs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Battery className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Long-Lasting Battery</h3>
              <p className="text-gray-600">Extended battery life with intuitive notifications for battery level, Bluetooth connection, and scanning status.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ergonomic Design</h3>
              <p className="text-gray-600">Lightweight and ergonomically designed for comfortable extended use and reduced operator fatigue.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Exceptionally easy to use with intuitive notifications and simple setup process.</p>
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
                  <span className="text-gray-900">PDF417, QR Codes, Data Matrix</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Scan Surface</span>
                  <span className="text-gray-900">Paper & Digital Screens</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Use Case</span>
                  <span className="text-gray-900">Entry-Level & Low-Volume</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Scanning Mode</span>
                  <span className="text-gray-900">Trigger & Auto-scan capable</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Connectivity & Power</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Connectivity</span>
                  <span className="text-gray-900">Bluetooth Wireless</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Battery Type</span>
                  <span className="text-gray-900">Long-lasting rechargeable</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Notifications</span>
                  <span className="text-gray-900">Battery, Bluetooth, Scan status</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Design</span>
                  <span className="text-gray-900">Lightweight & Ergonomic</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">SKU</span>
                  <span className="text-gray-900">CX4067-3130</span>
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
                The SocketScan S720 is natively integrated with imrchnt, ensuring seamless operation without additional software requirements.
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
                    <p className="text-gray-600">Windows computers and other Bluetooth-enabled devices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bluetooth className="h-6 w-6 text-[#f08e80] mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Bluetooth Standard</h4>
                    <p className="text-gray-600">Compatible with standard Bluetooth protocols</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Colors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Available Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">Green</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">Orange</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">Black</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">Red</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">White</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700">Blue</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Available Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">S720 + Charging Dock</h3>
              <p className="text-gray-600 mb-4">
                Charge your reader while keeping it available for active use. Perfect for high-traffic environments where the scanner needs to be always ready.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Continuous charging capability</li>
                <li>• Always available for use</li>
                <li>• Professional presentation</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">S720 + Charging Stand</h3>
              <p className="text-gray-600 mb-4">
                Designed for flexible use with protective features to safeguard your data reader. Great for hands-free auto scan applications.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Hands-free auto scanning</li>
                <li>• Protective design features</li>
                <li>• Flexible positioning options</li>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
              <p className="text-gray-600">Track inventory and assets with accurate 2D barcode scanning</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Payments</h3>
              <p className="text-gray-600">Scan digital IDs and credentials from mobile wallets</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Scanning</h3>
              <p className="text-gray-600">Scan products with 1D and 2D barcodes for retail operations</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Purpose</h3>
              <p className="text-gray-600">Everyday scanning needs for budget-conscious businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to streamline your scanning operations?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about the SocketScan S720 and get pricing for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>
    </div>
  )
}

export default SocketScanS720Page
