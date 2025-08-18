import { DollarSign, Monitor, MessageCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function CreditCardProcessingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Credit Cards
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Secure, fast, and reliable payment processing solutions for your business.
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

      {/* Payouts Section */}
      <section id="payouts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <DollarSign className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Payouts
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Get paid faster with our streamlined payout system. Track your earnings, 
                schedule transfers, and manage your cash flow with ease.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Daily automatic payouts</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Real-time balance tracking</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Detailed payout reports</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Multiple bank account support</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Manage Payouts
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <DollarSign className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminals Section */}
      <section id="terminals" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <Monitor className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Monitor className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Terminals
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Manage your payment terminals with our comprehensive terminal management system. 
                Monitor status, update software, and troubleshoot issues remotely.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Remote terminal management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Automatic software updates</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Real-time status monitoring</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>24/7 technical support</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Manage Terminals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chargebacks Section */}
      <section id="chargebacks" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <MessageCircle className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Chargebacks
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Protect your business from chargebacks with our comprehensive dispute management system. 
                Get alerts, manage responses, and track resolution progress.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Instant chargeback alerts</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Automated evidence collection</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Expert dispute assistance</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Chargeback prevention tools</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Handle Chargebacks
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <MessageCircle className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flat Fee Section */}
      <section id="flat-fee" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <DollarSign className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Flat Fee
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Transparent pricing with our simple flat fee structure. No hidden costs, 
                no surprises - just straightforward payment processing rates.
              </p>
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Card Present Transactions</h3>
                  <div className="text-2xl font-bold text-[#f08e80] mb-2">2.6% + $0.15</div>
                  <p className="text-gray-600">Per transaction when card is physically present</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Card Not Present (MOTO/MKE)</h3>
                  <div className="text-2xl font-bold text-[#f08e80] mb-2">Interchange++ + 0.15% + $0.15</div>
                  <p className="text-gray-600">Mail Order / Telephone Order or Manual Key Entry transactions</p>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Learn More About Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Payment Processing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading security, competitive rates, and comprehensive support for all your payment needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#f08e80]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-[#f08e80]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
              <p className="text-gray-600">
                Industry-leading processing rates with transparent pricing and no hidden fees.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-gray-600">
                PCI DSS compliant with end-to-end encryption and fraud protection.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support and technical assistance when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f08e80] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Processing Payments Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust our secure and reliable payment processing solutions.
          </p>
          <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

export default CreditCardProcessingPage

