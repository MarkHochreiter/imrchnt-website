import { useState } from 'react'
import { X, ShoppingCart, Plus, Minus, Mail, User, Building, Phone, Calculator } from 'lucide-react'

const HardwareCartModal = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState({})
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Hardware items with pricing
  const hardwareItems = [
    {
      id: 'ams1',
      name: 'AMS1',
      description: 'All-in-one Android terminal',
      price: 299.00,
      category: 'Terminals'
    },
    {
      id: 's1f2',
      name: 'S1F2',
      description: 'Compact payment terminal',
      price: 199.00,
      category: 'Terminals'
    },
    {
      id: 'sfo1',
      name: 'SFO1',
      description: 'Mobile payment solution',
      price: 149.00,
      category: 'Terminals'
    },
    {
      id: 'receipt-printer',
      name: 'Receipt Printer',
      description: 'Thermal receipt printer',
      price: 89.00,
      category: 'Printers'
    },
    {
      id: 'label-printer',
      name: 'Label Printer',
      description: 'Thermal label printer',
      price: 129.00,
      category: 'Printers'
    },
    {
      id: 'cash-drawer',
      name: 'Cash Drawer',
      description: 'Heavy-duty cash drawer',
      price: 79.00,
      category: 'Accessories'
    },
    {
      id: 'socket-scanner',
      name: 'Socket Scan Scanner',
      description: 'Bluetooth barcode scanner',
      price: 159.00,
      category: 'Accessories'
    }
  ]

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (newItems[itemId]) {
        delete newItems[itemId]
      } else {
        newItems[itemId] = { quantity: 1 }
      }
      return newItems
    })
  }

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (newItems[itemId]) {
        const newQuantity = Math.max(1, newItems[itemId].quantity + change)
        newItems[itemId] = { quantity: newQuantity }
      }
      return newItems
    })
  }

  const handleContactChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    })
  }

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, { quantity }]) => {
      const item = hardwareItems.find(h => h.id === itemId)
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getSelectedItemsCount = () => {
    return Object.values(selectedItems).reduce((total, { quantity }) => total + quantity, 0)
  }

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Format selected items for submission
    const orderSummary = Object.entries(selectedItems).map(([itemId, { quantity }]) => {
      const item = hardwareItems.find(h => h.id === itemId)
      return `${item.name} (${quantity}x) - $${(item.price * quantity).toFixed(2)}`
    }).join('\n')

    const submissionData = {
      ...contactInfo,
      orderSummary,
      totalAmount: `$${calculateTotal().toFixed(2)}`,
      itemCount: getSelectedItemsCount(),
      timestamp: new Date().toISOString()
    }

    try {
      console.log('Submitting hardware quote to Netlify Forms...')
      console.log('Form data:', submissionData)
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "hardware-quote",
          ...submissionData
        })
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        console.log('✅ Hardware quote submitted successfully to Netlify')
        setSubmitStatus('success')
        
        // Reset form
        setSelectedItems({})
        setContactInfo({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 3000)
      } else {
        console.error('❌ Hardware quote submission failed:', response.status)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const groupedItems = hardwareItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="h-6 w-6 text-[#f08e80] mr-2" />
              Hardware Quote Request
            </h2>
            <p className="text-gray-600 mt-1">Select hardware items and get a custom quote</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Hidden field for Netlify Forms */}
          <input type="hidden" name="form-name" value="hardware-quote" />
          
          {/* Hardware Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Hardware Items</h3>
            
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h4 className="text-md font-medium text-[#f08e80] mb-3">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`border rounded-lg p-4 transition-all duration-200 ${
                        selectedItems[item.id] 
                          ? 'border-[#f08e80] bg-[#f08e80]/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id={item.id}
                          name={`item-${item.id}`}
                          checked={!!selectedItems[item.id]}
                          onChange={() => handleItemToggle(item.id)}
                          className="mt-1 h-4 w-4 text-[#f08e80] focus:ring-[#f08e80] border-gray-300"
                        />
                        <div className="flex-1">
                          <label htmlFor={item.id} className="cursor-pointer">
                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <p className="text-lg font-bold text-[#f08e80]">${item.price.toFixed(2)}</p>
                          </label>
                          
                          {selectedItems[item.id] && (
                            <div className="flex items-center space-x-2 mt-3">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {selectedItems[item.id].quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {Object.keys(selectedItems).length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Order Summary
              </h3>
              <div className="space-y-2">
                {Object.entries(selectedItems).map(([itemId, { quantity }]) => {
                  const item = hardwareItems.find(h => h.id === itemId)
                  return (
                    <div key={itemId} className="flex justify-between text-sm">
                      <span>{item.name} × {quantity}</span>
                      <span className="font-medium">${(item.price * quantity).toFixed(2)}</span>
                    </div>
                  )
                })}
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total ({getSelectedItemsCount()} items)</span>
                    <span className="text-[#f08e80]">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={contactInfo.firstName}
                    onChange={handleContactChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                    placeholder="John"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={contactInfo.lastName}
                    onChange={handleContactChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={contactInfo.email}
                    onChange={handleContactChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={contactInfo.company}
                  onChange={handleContactChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={contactInfo.message}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent resize-none"
                placeholder="Any specific requirements or questions about your hardware needs..."
              />
            </div>
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
              <p className="text-green-800 text-sm">✅ Quote request submitted successfully! Our sales team will contact you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-red-800 text-sm">❌ Something went wrong. Please try again.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(selectedItems).length === 0}
              className="flex-1 bg-[#f08e80] hover:bg-[#e07d70] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Quote...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Request Quote ({getSelectedItemsCount()} items)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HardwareCartModal
