import { BarChart3, CreditCard, Users, Store, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function ManagePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Manage Your Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Comprehensive management tools to track, analyze, and optimize your retail operations.
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

      {/* Analytics Section */}
      <section id="analytics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <BarChart3 className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Analytics
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Get deep insights into your business performance with comprehensive analytics. 
                Track sales trends, customer behavior, and identify growth opportunities.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Real-time sales dashboards</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Customer behavior analysis</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Product performance metrics</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Custom report builder</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Explore Analytics
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <BarChart3 className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <section id="transactions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <CreditCard className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Transactions
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Monitor and manage all your transactions in one place. Track payments, 
                refunds, and get detailed transaction histories for accounting and reconciliation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Complete transaction history</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Payment status tracking</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Refund management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Reconciliation tools</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                View Transactions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section id="users" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Users className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Users
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Manage your team with comprehensive user management tools. Set permissions, 
                track performance, and ensure secure access to your retail system.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Role-based permissions</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Staff performance tracking</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Time clock integration</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Secure authentication</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Manage Users
              </Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                <Users className="h-24 w-24 text-[#f08e80]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section id="stores" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                  <Store className="h-24 w-24 text-[#f08e80]" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Store className="h-12 w-12 text-[#f08e80] mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Stores
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Manage multiple store locations from a single dashboard. Track performance 
                across locations, manage inventory, and maintain consistent operations.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Multi-location management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Location-specific analytics</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Inventory synchronization</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#f08e80] mr-3" />
                  <span>Centralized reporting</span>
                </div>
              </div>
              <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
                Manage Stores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f08e80] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Control of Your Business
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start managing your retail operations more effectively with our comprehensive management tools.
          </p>
          <Button size="lg" className="bg-white text-[#f08e80] hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ManagePage

