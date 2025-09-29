import { Button } from '@/components/ui/button.jsx'
import { CreditCard, Smartphone, Printer, Wifi, Battery, Monitor, ShoppingCart, ArrowLeft } from 'lucide-react'
import s1f2Image from '../assets/s1f2_image.png'

function S1f2Page({ onNavigateBack, onContactSales }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-12 w-12 text-[#f08e80]" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">S1f2</h1>
                  <p className="text-xl text-[#f08e80] font-medium">All-in-one Android device with receipt printing power</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                A battery-powered Android card reader paired with our app makes this unit all you need to bring to run an Offsite or Pop Up. Featuring a large 5.5" touch display, built-in printer, and camera that acts as a scanner.
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
              <img src={s1f2Image} alt="S1f2 Terminal" className="max-w-full h-auto" />
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
              <Smartphone className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Android Platform</h3>
              <p className="text-gray-600">Runs on Android 10 with a quad-core processor. Plenty of power to run our Android POS app.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Printer className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Built-in Printer</h3>
              <p className="text-gray-600">Integrated thermal printer for receipts with 40mm paper roll support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CreditCard className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Ready</h3>
              <p className="text-gray-600">Contactless payments, EMV chip cards, and magnetic stripe support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Monitor className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.5" Touchscreen</h3>
              <p className="text-gray-600">High-resolution color touchscreen display for easy interaction.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Wifi className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dual Connectivity</h3>
              <p className="text-gray-600">Wi-Fi and 4g LTE cellular connectivity with automatic failover for uninterrupted service.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Battery className="h-8 w-8 text-[#f08e80] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Long Battery Life</h3>
              <p className="text-gray-600">USB-C charging with up to 15-hour battery life for all-day use.</p>
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
                  <span className="text-gray-600">Processor</span>
                  <span className="text-gray-900">ARM A53 Quad-Core 1.3GHz + Secure Processor</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Memory</span>
                  <span className="text-gray-900">16GB Flash / 2GB RAM + Micro-SD</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Operating System</span>
                  <span className="text-gray-900">Android 10</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">200 x 78 × 56 mm (7.9″ x 3.1″ x 2.2″)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Display</span>
                  <span className="text-gray-900">5.5" Color Touchscreen</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Connectivity & Features</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Connectivity</span>
                  <span className="text-gray-900">Wi-Fi, 4g LTE Cellular</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Failover</span>
                  <span className="text-gray-900">Offline capable</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Payment Methods</span>
                  <span className="text-gray-900">Contactless, EMV Chip, Magnetic Stripe</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Printer</span>
                  <span className="text-gray-900">Built-in Thermal Printer (40mm rolls)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Battery Life</span>
                  <span className="text-gray-900">Up to 15 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f08e80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started with S1f2?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our sales team to learn more about pricing, setup, and integration options.
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

export default S1f2Page

