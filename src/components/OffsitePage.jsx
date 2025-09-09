import { Smartphone, Layers, Package, BarChart3, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function OffsitePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Offsite Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Flexible retail solutions that work anywhere, anytime. Perfect for pop-ups, events, and mobile retail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#f08e80] hover:bg-[#e07d70] text-white text-lg px-8 py-4">
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Single Device Section */}
      <section id="single-device" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Smartphone className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Single Device
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Run your entire retail operation from a single device. Perfect for small businesses, 
                pop-up shops, and mobile vendors who need a complete solution on the go.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Complete POS on smartphone or Android card reader</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Low learning curve</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Connect over WiFi or 4G</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Offline mode capability</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Learn More About Single Device
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Smartphone className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Import Items Section */}
      <section id="import-items" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <Layers className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Layers className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Import Items
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Quickly upload your entire inventory with our bulk import tools. 
                Migration made seamless with column mapping on any .CSV file.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>CSV supported</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Import New</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Update existing</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Item variants</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Explore Import Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Items Section */}
      <section id="add-items" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Package className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Add Items
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Manually add products with our intuitive interface. Perfect for unique items, 
                custom products, or when you need precise control over product details.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Rich product descriptions</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Multiple image support</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Variant management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Category organization</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Start Adding Items
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Package className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Sales Section */}
      <section id="export-sales" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Export Sales
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Download and analyze your sales data with comprehensive export options. 
                Perfect for accounting, tax preparation, and business intelligence.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Multiple export formats</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Custom date ranges</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Detailed transaction data</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Automated reports</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Access Export Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f08e80] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Your Business Anywhere
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start selling offsite today with our flexible, mobile-first retail solutions.
          </p>
          <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

export default OffsitePage

