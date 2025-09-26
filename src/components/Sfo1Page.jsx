import { Button } from '@/components/ui/button.jsx'
import { CreditCard, Monitor, Wifi, Shield, ShoppingCart, ArrowLeft, Smartphone, Users } from 'lucide-react'
import sfo1Image from '../assets/sfo1_image.png'

function Sfo1Page({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">
     
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Monitor className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">SFO1</h1>
                  <p className="text-xl text-[#f08e80] font-medium">Payment, branding, and customer engagement — all in one terminal</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                A customer-facing 8-inch touchscreen terminal built to modernize the checkout experience. It enhances the payment experience by integrating functions of traditional terminals with customer-facing multimedia capabilities.
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
              <img src={sfo1Image} alt="SFO1 Terminal" className="max-w-full h-auto" />
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
              <Monitor className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">8" Touchscreen Display</h3>
              <p className="text-gray-600">Large 8-inch 1280x800 IPS capacitive touch display for enhanced customer interaction.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Engagement</h3>
              <p className="text-gray-600">Customer-facing design with branding and multimedia capabilities for enhanced engagement.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Smartphone className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Android 13</h3>
              <p className="text-gray-600">Runs on Android 13 with additional branding and customization capabilities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Security</h3>
              <p className="text-gray-600">Integrated security modules with AES, DES, 3DES, RSA, and ECC encryption.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Wifi className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wireless Connectivity</h3>
              <p className="text-gray-600">Wi-Fi and Bluetooth connectivity for seamless integration with your systems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CreditCard className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PCI Compliant</h3>
              <p className="text-gray-600">PCI valid until April 2030, ensuring secure payment processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hardware</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Display</span>
                  <span className="text-gray-900">8" 1280x800 IPS Capacitive Touch</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">203mm L / 144.4mm W / 18.25mm H</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">414 g</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Operating System</span>
                  <span className="text-gray-900">Android 13</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Printer</span>
                  <span className="text-gray-900">No built-in printer</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Security & Connectivity</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Connectivity</span>
                  <span className="text-gray-900">Wi-Fi, Bluetooth</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Security</span>
                  <span className="text-gray-900">AES, DES, 3DES, RSA, ECC</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">PCI Compliance</span>
                  <span className="text-gray-900">Valid until April 2030</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Mounting</span>
                  <span className="text-gray-900">Countertop, Wall, Pole options</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Customization</span>
                  <span className="text-gray-900">Branding & multimedia capabilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Pricing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rental</h3>
              <div className="text-4xl font-bold text-[#f08e80] mb-2">$23.99</div>
              <div className="text-gray-600 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  No upfront costs
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  Includes support and maintenance
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  Flexible terms
                </li>
              </ul>
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
              onClick={onContactSales}
            >
              Generate Quote
            </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-[#f08e80]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Purchase</h3>
              <div className="text-4xl font-bold text-[#f08e80] mb-2">$480</div>
              <div className="text-gray-600 mb-6">one-time payment</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  Own the device outright
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  PCI compliant until 2030
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#f08e80] rounded-full mr-3"></div>
                  Best long-term value
                </li>
              </ul>
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
              onClick={onContactSales}
            >
              Generate Quote
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <Monitor className="h-12 w-12 text-[#f08e80] mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Countertop Stand</h3>
              <p className="text-gray-600 text-center mb-4">Secure countertop mounting solution</p>
              <div className="text-2xl font-bold text-[#f08e80] text-center mb-4">$26.40</div>
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
              onClick={onContactSales}
            >
              Generate Quote
            </Button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <Monitor className="h-12 w-12 text-[#f08e80] mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">SpacePole Mount</h3>
              <p className="text-gray-600 text-center mb-4">Flexible pole mounting system</p>
              <div className="text-2xl font-bold text-[#f08e80] text-center mb-4">$10.80</div>
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
              onClick={onContactSales}
            >
              Generate Quote
            </Button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <Monitor className="h-12 w-12 text-[#f08e80] mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Verso Mount</h3>
              <p className="text-gray-600 text-center mb-4">Versatile mounting solution</p>
              <div className="text-2xl font-bold text-[#f08e80] text-center mb-4">$15.60</div>
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
              onClick={onContactSales}
            >
              Generate Quote
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Retail Stores</h3>
              <p className="text-gray-600">Enhance customer experience with interactive displays and branded checkout.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Monitor className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurants</h3>
              <p className="text-gray-600">Display menus, promotions, and collect customer feedback during payment.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Smartphone className="h-12 w-12 text-[#f08e80] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Businesses</h3>
              <p className="text-gray-600">Engage customers with multimedia content while processing payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started with SFO1?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about pricing, setup, and customization options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="w-full bg-[#f08e80] hover:bg-[#e07d70] text-white"
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

export default Sfo1Page

