import { useState } from 'react'
import { ArrowLeft, Wifi, CreditCard, Smartphone, Zap, Shield, Clock } from 'lucide-react'

const S1f2DiagramPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      id: 1,
      title: "Contactless Payment Zone",
      description: "Tap, insert, or swipe cards and mobile wallets",
      icon: <Wifi className="h-4 w-4" />,
      position: { top: '15%', left: '50%' },
      color: '#ff6b6b'
    },
    {
      id: 2,
      title: "HD Display Screen",
      description: "Clear transaction details and customer interface",
      icon: <Smartphone className="h-4 w-4" />,
      position: { top: '45%', left: '50%' },
      color: '#4ecdc4'
    },
    {
      id: 3,
      title: "Payment Button",
      description: "Secure payment processing with one touch",
      icon: <CreditCard className="h-4 w-4" />,
      position: { top: '85%', left: '50%' },
      color: '#45b7d1'
    },
    {
      id: 4,
      title: "Fast Processing",
      description: "Lightning-quick transaction completion",
      icon: <Zap className="h-4 w-4" />,
      position: { top: '30%', left: '85%' },
      color: '#f9ca24'
    },
    {
      id: 5,
      title: "Secure Connection",
      description: "Bank-level encryption and security",
      icon: <Shield className="h-4 w-4" />,
      position: { top: '60%', left: '15%' },
      color: '#6c5ce7'
    },
    {
      id: 6,
      title: "24/7 Operation",
      description: "Always ready for business",
      icon: <Clock className="h-4 w-4" />,
      position: { top: '70%', left: '85%' },
      color: '#fd79a8'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8">
      {/* Retro Header */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-600 text-white p-4 rounded-t-lg border-4 border-black shadow-lg">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-white hover:text-yellow-200 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hardware
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-wider">IMRCHNT</h1>
              <p className="text-sm">Payment System Manual</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Model: S1f2</p>
              <p className="text-xs">Rev. 2024</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-yellow-100 border-4 border-black border-t-0 shadow-lg">
          {/* Title Section */}
          <div className="bg-blue-600 text-white p-4 border-b-4 border-black">
            <h2 className="text-3xl font-bold text-center tracking-wider">S1f2 PAYMENT TERMINAL</h2>
            <p className="text-center mt-2 text-blue-100">All-in-one Android device with printing power</p>
          </div>

          {/* Diagram Section */}
          <div className="p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Features */}
              <div className="space-y-6">
                <div className="bg-white border-4 border-black p-4 rounded-lg shadow-lg transform -rotate-1">
                  <h3 className="font-bold text-lg mb-2 text-red-600">KEY FEATURES</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Wifi className="h-4 w-4 mr-2 text-blue-500" />
                      Contactless Payments
                    </li>
                    <li className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-green-500" />
                      Android OS
                    </li>
                    <li className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                      Built-in Printer
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      Fast Processing
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-4 border-black p-4 rounded-lg shadow-lg transform rotate-1">
                  <h3 className="font-bold text-lg mb-2 text-green-600">SPECIFICATIONS</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Display:</strong> 5.5" HD Touchscreen</li>
                    <li><strong>Connectivity:</strong> WiFi, 4G, Bluetooth</li>
                    <li><strong>Printer:</strong> Thermal Receipt Printer</li>
                    <li><strong>Battery:</strong> All-day operation</li>
                    <li><strong>Security:</strong> PCI DSS compliant</li>
                  </ul>
                </div>
              </div>

              {/* Center Device Image */}
              <div className="relative flex justify-center">
                <div className="relative">
                  {/* Device Image Container */}
                  <div className="bg-white border-4 border-black rounded-lg p-6 shadow-2xl">
                    <img 
                      src="/home/ubuntu/upload/s1f2copy.png"
                      alt="S1f2 Payment Terminal"
                      className="max-w-full h-auto max-h-96 object-contain"
                    />
                  </div>

                  {/* Interactive Callouts */}
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ top: feature.position.top, left: feature.position.left }}
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      {/* Callout Dot */}
                      <div 
                        className="w-8 h-8 rounded-full border-4 border-black flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse"
                        style={{ backgroundColor: feature.color }}
                      >
                        {feature.id}
                      </div>
                      
                      {/* Callout Line */}
                      <div 
                        className="absolute w-12 h-1 border-t-4 border-black"
                        style={{ 
                          top: '50%', 
                          left: feature.id % 2 === 0 ? '-48px' : '32px',
                          transform: 'translateY(-50%)'
                        }}
                      />

                      {/* Hover Tooltip */}
                      {hoveredFeature === feature.id && (
                        <div 
                          className="absolute z-10 bg-black text-white p-3 rounded-lg shadow-xl border-2 border-white min-w-48"
                          style={{
                            top: '-60px',
                            left: feature.id % 2 === 0 ? '-200px' : '40px'
                          }}
                        >
                          <div className="flex items-center mb-1">
                            {feature.icon}
                            <h4 className="font-bold ml-2">{feature.title}</h4>
                          </div>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Features */}
              <div className="space-y-6">
                <div className="bg-white border-4 border-black p-4 rounded-lg shadow-lg transform rotate-1">
                  <h3 className="font-bold text-lg mb-2 text-purple-600">PAYMENT METHODS</h3>
                  <ul className="space-y-2 text-sm">
                    <li>💳 Chip & PIN Cards</li>
                    <li>📱 Apple Pay / Google Pay</li>
                    <li>💫 Contactless Cards</li>
                    <li>🏦 Bank Transfers</li>
                    <li>💰 Digital Wallets</li>
                  </ul>
                </div>

                <div className="bg-white border-4 border-black p-4 rounded-lg shadow-lg transform -rotate-1">
                  <h3 className="font-bold text-lg mb-2 text-orange-600">PERFECT FOR</h3>
                  <ul className="space-y-1 text-sm">
                    <li>🏪 Retail Stores</li>
                    <li>🍕 Restaurants</li>
                    <li>🚚 Food Trucks</li>
                    <li>🎪 Pop-up Shops</li>
                    <li>🏥 Service Businesses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature Legend */}
            <div className="mt-8 bg-white border-4 border-black rounded-lg p-6 shadow-lg">
              <h3 className="font-bold text-xl mb-4 text-center text-red-600">FEATURE GUIDE</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center p-3 bg-gray-50 rounded border-2 border-gray-300">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-white font-bold text-xs mr-3"
                      style={{ backgroundColor: feature.color }}
                    >
                      {feature.id}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-red-600 text-white p-4 border-t-4 border-black">
            <div className="text-center">
              <p className="font-bold">© 2024 IMRCHNT - Professional Payment Solutions</p>
              <p className="text-sm text-red-100 mt-1">For technical support, visit our support center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S1f2DiagramPage

