import { useState } from 'react'
import { X, ShoppingCart, Plus, Minus, Mail, User, Building, Phone, Calculator, CreditCard, DollarSign } from 'lucide-react'

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

  // Hardware items with pricing and accessories
  const hardwareItems = [
    // Terminals with rent/buy options and accessories
    {
      id: 'ams1',
      name: 'AMS1',
      description: 'All-in-one Android terminal',
      rentPrice: 29.99,
      buyPrice: 299.00,
      category: 'Terminals',
      type: 'terminal',
      accessories: [
        { id: 'ams1-dock', name: 'Charging Dock', price: 28.80, description: 'Desktop charging station' },
        { id: 'ams1-4bay', name: '4 Bay Charging Station', price: 168.00, description: 'Charge up to 4 terminals' },
        { id: 'ams1-base', name: 'Charging Base', price: 60.00, description: 'Single terminal charging base' },
        { id: 'ams1-case', name: 'Protective Case', price: 35.00, description: 'Durable protective case' }
      ]
    },
    {
      id: 's1f2',
      name: 'S1F2',
      description: 'Compact payment terminal',
      rentPrice: 19.99,
      buyPrice: 199.00,
      category: 'Terminals',
      type: 'terminal',
      accessories: [
        { id: 's1f2-dock', name: 'Desktop Dock', price: 45.00, description: 'Countertop charging dock' },
        { id: 's1f2-mount', name: 'Wall Mount', price: 25.00, description: 'Secure wall mounting bracket' },
        { id: 's1f2-cable', name: 'USB-C Cable (3ft)', price: 15.00, description: 'Extra charging cable' },
        { id: 's1f2-stand', name: 'Adjustable Stand', price: 32.00, description: 'Tilting display stand' }
      ]
    },
    {
      id: 'sfo1',
      name: 'SFO1',
      description: 'Mobile payment solution',
      rentPrice: 15.99,
      buyPrice: 149.00,
      category: 'Terminals',
      type: 'terminal',
      accessories: [
        { id: 'sfo1-holster', name: 'Belt Holster', price: 22.00, description: 'Secure belt-mounted holster' },
        { id: 'sfo1-lanyard', name: 'Security Lanyard', price: 12.00, description: 'Anti-theft security lanyard' },
        { id: 'sfo1-charger', name: 'Car Charger', price: 18.00, description: 'Vehicle charging adapter' },
        { id: 'sfo1-pouch', name: 'Carrying Pouch', price: 28.00, description: 'Padded carrying pouch' }
      ]
    },
    // Standalone accessories
    {
      id: 'receipt-printer',
      name: 'Receipt Printer',
      description: 'Thermal receipt printer',
      price: 89.00,
      category: 'Printers',
      type: 'accessory'
    },
    {
      id: 'label-printer',
      name: 'Label Printer',
      description: 'Thermal label printer',
      price: 129.00,
      category: 'Printers',
      type: 'accessory'
    },
    {
      id: 'cash-drawer',
      name: 'Cash Drawer',
      description: 'Heavy-duty cash drawer',
      price: 79.00,
      category: 'Accessories',
      type: 'accessory'
    },
    {
      id: 'socket-scanner',
      name: 'Socket Scan Scanner',
      description: 'Bluetooth barcode scanner',
      price: 159.00,
      category: 'Accessories',
      type: 'accessory'
    }
  ]

  const handleItemToggle = (itemId, option = null) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      const itemKey = option ? `${itemId}-${option}` : itemId
      
      if (newItems[itemKey]) {
        delete newItems[itemKey]
      } else {
        newItems[itemKey] = { 
          quantity: 1, 
          itemId, 
          option: option || 'buy',
          type: hardwareItems.find(h => h.id === itemId)?.type || 'accessory'
        }
      }
      return newItems
    })
  }

  const handleAccessoryToggle = (accessoryId, parentTerminalId) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      const accessoryKey = `${parentTerminalId}-${accessoryId}`
      
      if (newItems[accessoryKey]) {
        delete newItems[accessoryKey]
      } else {
        // Find the accessory details
        const terminal = hardwareItems.find(h => h.id === parentTerminalId)
        const accessory = terminal?.accessories?.find(a => a.id === accessoryId)
        
        if (accessory) {
          newItems[accessoryKey] = { 
            quantity: 1, 
            itemId: accessoryId,
            parentTerminal: parentTerminalId,
            type: 'accessory',
            name: accessory.name,
            price: accessory.price,
            description: accessory.description
          }
        }
      }
      return newItems
    })
  }

  const handleQuantityChange = (itemKey, change) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (newItems[itemKey]) {
        const newQuantity = Math.max(1, newItems[itemKey].quantity + change)
        newItems[itemKey] = { ...newItems[itemKey], quantity: newQuantity }
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

  const getItemPrice = (itemKey, itemData) => {
    if (itemData.type === 'accessory' && itemData.price) {
      return itemData.price
    }
    
    const item = hardwareItems.find(h => h.id === itemData.itemId)
    if (!item) return 0
    
    if (item.type === 'terminal') {
      return itemData.option === 'rent' ? item.rentPrice : item.buyPrice
    }
    
    return item.price || 0
  }

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemKey, itemData]) => {
      const price = getItemPrice(itemKey, itemData)
      return total + (price * itemData.quantity)
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
    const orderSummary = Object.entries(selectedItems).map(([itemKey, itemData]) => {
      const price = getItemPrice(itemKey, itemData)
      const totalPrice = price * itemData.quantity
      
      if (itemData.type === 'accessory' && itemData.parentTerminal) {
        return `${itemData.name} (${itemData.quantity}x) for ${itemData.parentTerminal.toUpperCase()} - $${totalPrice.toFixed(2)}`
      }
      
      const item = hardwareItems.find(h => h.id === itemData.itemId)
      const optionText = item?.type === 'terminal' ? ` (${itemData.option})` : ''
      return `${item?.name || itemData.name}${optionText} (${itemData.quantity}x) - $${totalPrice.toFixed(2)}`
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
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
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
              <div key={category} className="mb-8">
                <h4 className="text-md font-medium text-[#f08e80] mb-4">{category}</h4>
                
                {items.map((item) => (
                  <div key={item.id} className="mb-6 border border-gray-200 rounded-lg p-4">
                    {/* Main Item */}
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 text-lg mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      
                      {item.type === 'terminal' ? (
                        // Terminal with rent/buy options
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Rent Option */}
                          <div className={`border rounded-lg p-4 transition-all duration-200 ${
                            selectedItems[`${item.id}-rent`] 
                              ? 'border-[#f08e80] bg-[#f08e80]/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <input
                                type="radio"
                                id={`${item.id}-rent`}
                                name={`item-${item.id}`}
                                checked={!!selectedItems[`${item.id}-rent`]}
                                onChange={() => handleItemToggle(item.id, 'rent')}
                                className="mt-1 h-4 w-4 text-[#f08e80] focus:ring-[#f08e80] border-gray-300"
                              />
                              <div className="flex-1">
                                <label htmlFor={`${item.id}-rent`} className="cursor-pointer">
                                  <div className="flex items-center mb-2">
                                    <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
                                    <span className="font-medium text-gray-900">Rent</span>
                                  </div>
                                  <p className="text-2xl font-bold text-blue-600 mb-1">${item.rentPrice.toFixed(2)}/month</p>
                                  <p className="text-xs text-gray-500">Monthly rental with support included</p>
                                </label>
                                
                                {selectedItems[`${item.id}-rent`] && (
                                  <div className="flex items-center space-x-2 mt-3">
                                    <span className="text-sm text-gray-600">Quantity:</span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(`${item.id}-rent`, -1)}
                                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                      {selectedItems[`${item.id}-rent`].quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(`${item.id}-rent`, 1)}
                                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Buy Option */}
                          <div className={`border rounded-lg p-4 transition-all duration-200 ${
                            selectedItems[`${item.id}-buy`] 
                              ? 'border-[#f08e80] bg-[#f08e80]/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <input
                                type="radio"
                                id={`${item.id}-buy`}
                                name={`item-${item.id}`}
                                checked={!!selectedItems[`${item.id}-buy`]}
                                onChange={() => handleItemToggle(item.id, 'buy')}
                                className="mt-1 h-4 w-4 text-[#f08e80] focus:ring-[#f08e80] border-gray-300"
                              />
                              <div className="flex-1">
                                <label htmlFor={`${item.id}-buy`} className="cursor-pointer">
                                  <div className="flex items-center mb-2">
                                    <DollarSign className="h-4 w-4 text-[#f08e80] mr-2" />
                                    <span className="font-medium text-gray-900">Buy</span>
                                  </div>
                                  <p className="text-2xl font-bold text-[#f08e80] mb-1">${item.buyPrice.toFixed(2)}</p>
                                  <p className="text-xs text-gray-500">One-time purchase, own forever</p>
                                </label>
                                
                                {selectedItems[`${item.id}-buy`] && (
                                  <div className="flex items-center space-x-2 mt-3">
                                    <span className="text-sm text-gray-600">Quantity:</span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(`${item.id}-buy`, -1)}
                                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                      {selectedItems[`${item.id}-buy`].quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(`${item.id}-buy`, 1)}
                                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Regular accessory item
                        <div className={`border rounded-lg p-4 transition-all duration-200 ${
                          selectedItems[item.id] 
                            ? 'border-[#f08e80] bg-[#f08e80]/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
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
                                <p className="text-2xl font-bold text-[#f08e80] mb-1">${item.price.toFixed(2)}</p>
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
                      )}
                    </div>

                    {/* Terminal Accessories */}
                    {item.type === 'terminal' && item.accessories && (selectedItems[`${item.id}-rent`] || selectedItems[`${item.id}-buy`]) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h6 className="font-medium text-gray-700 mb-3">Available Accessories for {item.name}</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.accessories.map((accessory) => (
                            <div 
                              key={accessory.id}
                              className={`border rounded-lg p-3 transition-all duration-200 ${
                                selectedItems[`${item.id}-${accessory.id}`] 
                                  ? 'border-green-400 bg-green-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <input
                                  type="checkbox"
                                  id={`${item.id}-${accessory.id}`}
                                  checked={!!selectedItems[`${item.id}-${accessory.id}`]}
                                  onChange={() => handleAccessoryToggle(accessory.id, item.id)}
                                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <div className="flex-1">
                                  <label htmlFor={`${item.id}-${accessory.id}`} className="cursor-pointer">
                                    <h7 className="font-medium text-gray-900 text-sm">{accessory.name}</h7>
                                    <p className="text-xs text-gray-600 mb-1">{accessory.description}</p>
                                    <p className="text-sm font-bold text-green-600">${accessory.price.toFixed(2)}</p>
                                  </label>
                                  
                                  {selectedItems[`${item.id}-${accessory.id}`] && (
                                    <div className="flex items-center space-x-2 mt-2">
                                      <span className="text-xs text-gray-600">Qty:</span>
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(`${item.id}-${accessory.id}`, -1)}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="w-6 text-center text-sm font-medium">
                                        {selectedItems[`${item.id}-${accessory.id}`].quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(`${item.id}-${accessory.id}`, 1)}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                {Object.entries(selectedItems).map(([itemKey, itemData]) => {
                  const price = getItemPrice(itemKey, itemData)
                  const totalPrice = price * itemData.quantity
                  
                  let displayName = ''
                  if (itemData.type === 'accessory' && itemData.parentTerminal) {
                    displayName = `${itemData.name} (for ${itemData.parentTerminal.toUpperCase()})`
                  } else {
                    const item = hardwareItems.find(h => h.id === itemData.itemId)
                    const optionText = item?.type === 'terminal' ? ` (${itemData.option})` : ''
                    displayName = `${item?.name || itemData.name}${optionText}`
                  }
                  
                  return (
                    <div key={itemKey} className="flex justify-between text-sm">
                      <span>{displayName} × {itemData.quantity}</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
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
