import { Button } from '@/components/ui/button.jsx'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const plans = [
    {
      name: "Card present",
      description: "Tap / Dip / Swipe",
      monthlyPrice: 0.0255, // 2.55% as a decimal
      yearlyPrice: 0.15,    // 15 cents
      badge: null,
      features: [
        "Apple Pay",
        "Visa",
        "MasterCard",
        "American Express",
        "Discover",
        "Domestic cards"
      ]
    },
    {
      name: "MOTO",
      description: "Mail Order / Telephone Order",
      monthlyPrice: 0.0015, // 0.15%
      yearlyPrice: 0.15,    // 15 cents
      badge: null,
      features: [
        "variable rate",
        ".15% on top of Interchange++ fees",
        ".15c per transaction",
        "Domestic",
        "International"
      ]
    },
    {
      name: "MKE",
      description: "Manual key entry",
      monthlyPrice: 0.0015, // 0.15%
      yearlyPrice: 0.15,    // 15 cents
      badge: null,
      features: [
        "variable rate",
        ".15% on top of Interchange++ fees",
        ".15c per transaction",
        "Domestic",
        "International"
      ]
    },
    {
      name: "International",
      description: "Foreign Cards",
      monthlyPrice: 0.0015, // 0.15%
      yearlyPrice: 0.15,    // 15 cents
      badge: null,
      features: [
        "variable rate",
        ".15% on top of Interchange++ fees",
        ".15c per transaction",
        "International"
      ]
    }
  ]

  const faqs = [
    {
      category: "General questions",
      questions: [
        {
          question: "What is imrchnt and how does it work?",
          answer: "imrchnt is a multi platform application that helps stores sell Instore, offsite, with or without a network connection. Our platform provides everything you need to run pos, accept credit cards, print receipts from one device. Run on a PC, Apple, iOS / Android Tablet, iOS / Android smartphone, Android card reader."
        },
        {
          question: "How much does imrchnt cost?",
          answer: "We offer our application + credit card processing for one flat fee for card present transactions. 2.55% + .15c per transaction. Card Not Present transactions carry greater risk and therefore are charged a higher rate. For Card Not Present we use a variable rate of Interchange++ .15% + .15c per transaction. This means all Interchange fees are charged to your account and an additional .15% + .15c are collected by imrchnt."
        },
        {
          question: "How long are your contracts?",
          answer: "We don't do contracts, sign up to process credit cards and only get charged fees when credit cards are processed."
        },
        {
          question: "Can I cancel my account at any time?",
          answer: "Yes, you can cancel your account at any time. There are no cancellation fees or penalties."
        }
      ]
    },
    {
      category: "Payment questions",
      questions: [
        {
          question: "Can I accept contactless payments?",
          answer: "Absolutely. We can even turn your iOS or Android smartphone into a contacless credit card reader."
        },
        {
          question: "Can I negotiate my rate?",
          answer: "If your store is doing more than $50,000 per month in Credit Card processing and has an average sale over $35 we can work together in setting a negotiated rate."
        }
      ]
    }
  ]

    return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f08e80]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Plans & pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Start for free, then enjoy<br />
            <span className="text-[#f08e80] font-bold">$1/month for 3 months</span>
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Choose the best plan for your business. Change plans as you grow.
          </p>
          
          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#f08e80]"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-r-lg">
                Start free trial
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Try imrchnt free, no credit card required.
            </p>
          </div>

          {/* Monthly/Yearly Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md transition-colors ${
                  !isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Pay monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Pay yearly (save 25%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-lg p-8 relative ${
                  plan.badge ? 'ring-2 ring-[#f08e80]' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#f08e80] text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-1">USD/month</span>
                  </div>
                  
                  {isYearly && (
                    <p className="text-sm text-gray-500">billed once yearly</p>
                  )}
                </div>

                <Button 
                  className={`w-full mb-8 ${
                    plan.badge 
                      ? 'bg-[#f08e80] hover:bg-[#f08e80]/90 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Start free trial
                </Button>

                <div className="space-y-3">
                  {plan.features.slice(0, 5).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-[#f08e80] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <p className="text-sm text-gray-500 mt-4">
                      + {plan.features.length - 5} more features
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>   
    </div>
  )
}

export default PricingPage
