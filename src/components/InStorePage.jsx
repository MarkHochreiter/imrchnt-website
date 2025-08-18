import { Monitor, Users, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function InStorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              InStore Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Complete point-of-sale solutions for your physical retail locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#f08e80] hover:bg-[#e07d70] text-white text-lg px-8 py-4">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* POS Section */}
      <section id="pos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Monitor className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Point of Sale (POS)
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Our advanced POS system streamlines your checkout process with intuitive interfaces, 
                real-time inventory tracking, and seamless payment processing.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Lightning-fast checkout process</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Real-time inventory management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Multiple payment method support</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Detailed sales reporting</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Learn More About POS
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Monitor className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTELING Section */}
      <section id="clienteling" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <Users className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Users className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Clienteling - Coming Soon
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
                Explore Clienteling
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ON FLOOR ASSISTANCE Section */}
      <section id="on-floor-assistance" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Zap className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  ON FLOOR ASSISTANCE
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Eliminate checkout queues and optimize customer experience. 
                Lookup inventory in real-time on the floor.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Add items manually or by scan</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Blazing fast inventory lookup</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Handsell assistant</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Attribute customization</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Discover On Floor Assistance
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Zap className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f08e80] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your InStore Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive InStore solutions today and see the difference in your retail operations.
          </p>
          <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

export default InStorePage

