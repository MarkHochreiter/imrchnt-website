import React, { useState, useEffect } from 'react'
import { X, ShoppingCart, Plus, Minus, Mail, User, Building, Phone, Calculator, CreditCard, DollarSign, Loader2 } from 'lucide-react'

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
  
  // New state for dynamic product loading
  const [hardwareItems, setHardwareItems] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [productLoadError, setProductLoadError] = useState(null)

  // Fetch products from HubSpot via backend API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!isOpen) return;
      
      setIsLoadingProducts(true)
      setProductLoadError(null)
      
      try {
        const response = await fetch('https://imrchnt.netlify.app/.netlify/functions/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success) {
          setHardwareItems(data.products || [])
        } else {
          throw new Error(data.message || 'Failed to fetch products')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProductLoadError(error.message)
        setHardwareItems([]) // Clear items on error
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [isOpen])

  // ======= SMART PRODUCT GROUPING =======
  
  const getGroupedProducts = () => {
    const groups = {}
    
    hardwareItems.forEach(product => {
      if (!product.sku) return
      
      const sku = product.sku.toUpperCase()
      
      // Parse SKU: TERMINAL-TYPE-OPTION (e.g., AMS1-T-B, SFO1-A-01)
      const skuParts = sku.split('-')
      if (skuParts.length < 3) return
      
      const [terminalFamily, type, option] = skuParts
      
      // Initialize terminal family group if it doesn't exist
      if (!groups[terminalFamily]) {
        groups[terminalFamily] = {
          name: terminalFamily,
          terminals: { buy: null, rent: null },
          accessories: []
        }
      }
      
      if (type === 'T') {
        // This is a terminal
        if (option === 'B') {
          groups[terminalFamily].terminals.buy = product
        } else if (option === 'R') {
          groups[terminalFamily].terminals.rent = product
        }
      } else if (type === 'A') {
        // This is an accessory
        groups[terminalFamily].accessories.push(product)
      }
    })
    
    // Sort accessories within each group
    Object.values(groups).forEach(group => {
      group.accessories.sort((a, b) => a.name.localeCompare(b.name))
    })
    
    return groups
  }

  // ======= EVENT HANDLERS =======

  const handleItemToggle = (itemId, option = null) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      const itemKey = option ? `${itemId}-${option}` : itemId
      
      if (newItems[itemKey]) {
        delete newItems[itemKey]
      } else {
        const item = hardwareItems.find(h => h.id === itemId)
        newItems[itemKey] = { 
          quantity: 1, 
          itemId, 
          option: option || 'buy',
          type: item?.type || 'accessory',
          name: item?.name || '',
          sku: item?.sku || ''
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

  // ======= PRICE CALCULATIONS =======

  const getItemPrice = (itemKey, itemData) => {
    const item = hardwareItems.find(h => h.id === itemData.itemId)
    if (!item) return 0
    
    if (item.type === 'terminal') {
      return itemData.option === 'rent' ? (item.rentPrice || 0) : (item.buyPrice || item.price || 0)
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

  const generateQuoteId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `HW-${timestamp}-${random}`
  }

  // ======= FORM SUBMISSION =======

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const quoteId = generateQuoteId()
    const timestamp = new Date().toISOString()

    try {
      const quoteData = {
        quoteId,
        timestamp,
        contactInfo,
        selectedItems: Object.entries(selectedItems).map(([itemKey, itemData]) => {
          const price = getItemPrice(itemKey, itemData)
          const totalPrice = price * itemData.quantity
          const item = hardwareItems.find(h => h.id === itemData.itemId)
          
          return {
            itemId: itemData.itemId,
            itemName: item?.name || itemData.name,
            itemCategory: item?.category || 'Hardware',
            purchaseOption: itemData.option || 'buy',
            quantity: itemData.quantity,
            unitPrice: price,
            lineTotal: totalPrice,
            sku: item?.sku || itemData.sku || ''
          }
        }),
        quoteTotalItems: getSelectedItemsCount(),
        quoteTotalAmount: calculateTotal()
      }

      const response = await fetch('https://imrchnt.netlify.app/.netlify/functions/create-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setSelectedItems({})
        setContactInfo({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
        
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const groupedProducts = getGroupedProducts()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="h-6 w-6 text-[#f08e80] mr-2" />
              Hardware Quote Request
            </h2>
            <p className="text-gray-600 mt-1">Select hardware items and get a custom quote</p>
            {productLoadError && (
              <p className="text-orange-600 text-sm mt-1">
                ⚠️ Using cached product data - {productLoadError}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Hardware Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              Select Hardware Items
              {isLoadingProducts && (
                <Loader2 className="h-4 w-4 ml-2 animate-spin text-[#f08e80]" />
              )}
            </h3>
            
            {isLoadingProducts ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-[#f08e80] mx-auto mb-4" />
                  <p className="text-gray-600">Loading products from HubSpot...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedProducts).map(([terminalFamily, group]) => (
                  <div key={terminalFamily} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Terminal Family Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-900">{terminalFamily} System</h4>
                      <p className="text-gray-600 text-sm mt-1">Choose your {terminalFamily} terminal and accessories</p>
                    </div>
                    
                    <div className="p-6">
                      {/* Terminal Options */}
                      {(group.terminals.buy || group.terminals.rent) && (
                        <div className="mb-8">
                          <h5 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <CreditCard className="h-5 w-5 text-[#f08e80] mr-2" />
                            {terminalFamily} Terminal Options
                          </h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Buy Option */}
                            {group.terminals.buy && (
                              <div className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                                selectedItems[group.terminals.buy.id] 
                                  ? 'border-[#f08e80] bg-[#f08e80]/5 shadow-lg' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}>
                                <div className="flex items-start space-x-3">
                                  <input
                                    type="radio"
                                    id={group.terminals.buy.id}
                                    name={`terminal-${terminalFamily}`}
                                    checked={!!selectedItems[group.terminals.buy.id]}
                                    onChange={() => handleItemToggle(group.terminals.buy.id)}
                                    className="mt-1 h-5 w-5 text-[#f08e80] focus:ring-[#f08e80] border-gray-300"
                                  />
                                  <div className="flex-1">
                                    <label htmlFor={group.terminals.buy.id} className="cursor-pointer">
                                      <div className="flex items-center mb-3">
                                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                                        <span className="font-semibold text-gray-900">Purchase</span>
                                      </div>
                                      
                                      <h6 className="font-medium text-lg text-gray-900 mb-2">{group.terminals.buy.name}</h6>
                                      <p className="text-sm text-gray-600 mb-4">{group.terminals.buy.description}</p>
                                      
                                      <div className="mb-4">
                                        <p className="text-3xl font-bold text-green-600">${(group.terminals.buy.buyPrice || group.terminals.buy.price || 0).toFixed(2)}</p>
                                        <p className="text-sm text-green-700">One-time purchase</p>
                                      </div>
                                      
                                      {group.terminals.buy.sku && (
                                        <p className="text-xs text-gray-500">SKU: {group.terminals.buy.sku}</p>
                                      )}
                                    </label>
                                    
                                    {selectedItems[group.terminals.buy.id] && (
                                      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
                                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(group.terminals.buy.id, -1)}
                                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center font-semibold text-lg">
                                          {selectedItems[group.terminals.buy.id].quantity}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(group.terminals.buy.id, 1)}
                                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Rent Option */}
                            {group.terminals.rent && (
                              <div className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                                selectedItems[group.terminals.rent.id] 
                                  ? 'border-[#f08e80] bg-[#f08e80]/5 shadow-lg' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}>
                                <div className="flex items-start space-x-3">
                                  <input
                                    type="radio"
                                    id={group.terminals.rent.id}
                                    name={`terminal-${terminalFamily}`}
                                    checked={!!selectedItems[group.terminals.rent.id]}
                                    onChange={() => handleItemToggle(group.terminals.rent.id)}
                                    className="mt-1 h-5 w-5 text-[#f08e80] focus:ring-[#f08e80] border-gray-300"
                                  />
                                  <div className="flex-1">
                                    <label htmlFor={group.terminals.rent.id} className="cursor-pointer">
                                      <div className="flex items-center mb-3">
                                        <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                                        <span className="font-semibold text-gray-900">Monthly Rental</span>
                                      </div>
                                      
                                      <h6 className="font-medium text-lg text-gray-900 mb-2">{group.terminals.rent.name}</h6>
                                      <p className="text-sm text-gray-600 mb-4">{group.terminals.rent.description}</p>
                                      
                                      <div className="mb-4">
                                        <p className="text-3xl font-bold text-blue-600">${(group.terminals.rent.rentPrice || group.terminals.rent.price || 0).toFixed(2)}/month</p>
                                        <p className="text-sm text-blue-700">Monthly rental with support</p>
                                      </div>
                                      
                                      {group.terminals.rent.sku && (
                                        <p className="text-xs text-gray-500">SKU: {group.terminals.rent.sku}</p>
                                      )}
                                    </label>
                                    
                                    {selectedItems[group.terminals.rent.id] && (
                                      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
                                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(group.terminals.rent.id, -1)}
                                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center font-semibold text-lg">
                                          {selectedItems[group.terminals.rent.id].quantity}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(group.terminals.rent.id, 1)}
                                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
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
                        </div>
                      )}

                      {/* Accessories */}
                      {group.accessories.length > 0 && (
                        <div>
                          <h5 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <Plus className="h-5 w-5 text-[#f08e80] mr-2" />
                            {terminalFamily} Accessories
                          </h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.accessories.map((accessory) => (
                              <div key={accessory.id} className={`border rounded-lg p-4 transition-all duration-200 ${
                                selectedItems[accessory.id] 
                                  ? 'border-[#f08e80] bg-[#f08e80]/5 shadow-md' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}>
                                <div className="flex items-start space-x-3">
                                  <input
                                    type="checkbox"
                                    id={accessory.id}
                                    checked={!!selectedItems[accessory.id]}
                                    onChange={() => handleItemToggle(accessory.id)}
                                    className="mt-1 h-4 w-4 text-[#f08e80] focus:ring-[#f08e80] border-gray-300 rounded"
                                  />
                                  <div className="flex-1">
                                    <label htmlFor={accessory.id} className="cursor-pointer">
                                      <h6 className="font-medium text-gray-900 mb-1">{accessory.name}</h6>
                                      <p className="text-sm text-gray-600 mb-2">{accessory.description}</p>
                                      <p className="text-lg font-semibold text-[#f08e80]">${(accessory.price || 0).toFixed(2)}</p>
                                      {accessory.sku && (
                                        <p className="text-xs text-gray-500 mt-1">SKU: {accessory.sku}</p>
                                      )}
                                    </label>
                                    
                                    {selectedItems[accessory.id] && (
                                      <div className="flex items-center space-x-2 mt-3">
                                        <span className="text-sm text-gray-600">Qty:</span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(accessory.id, -1)}
                                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                        >
                                          <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-6 text-center font-medium text-sm">
                                          {selectedItems[accessory.id].quantity}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleQuantityChange(accessory.id, 1)}
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
                  </div>
                ))}

                {/* No Products Message */}
                {Object.keys(groupedProducts).length === 0 && !isLoadingProducts && (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h4>
                    <p className="text-gray-600">Please check your HubSpot product catalog or contact support.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quote Summary */}
          {Object.keys(selectedItems).length > 0 && (
            <div className="mb-8 bg-[#f08e80]/5 border border-[#f08e80]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="h-5 w-5 text-[#f08e80] mr-2" />
                Quote Summary
              </h3>
              
              <div className="space-y-3">
                {Object.entries(selectedItems).map(([itemKey, itemData]) => {
                  const item = hardwareItems.find(h => h.id === itemData.itemId)
                  const price = getItemPrice(itemKey, itemData)
                  const total = price * itemData.quantity
                  
                  return (
                    <div key={itemKey} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <span className="font-medium text-gray-900">
                          {item?.name || itemData.name}
                        </span>
                        <div className="text-sm text-gray-600">
                          Qty: {itemData.quantity} × ${price.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${total.toFixed(2)}</div>
                      </div>
                    </div>
                  )
                })}
                
                <div className="flex justify-between items-center pt-4 border-t-2 border-[#f08e80]">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-[#f08e80]">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 text-[#f08e80] mr-2" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={contactInfo.firstName}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={contactInfo.lastName}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={contactInfo.company}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Requirements or Questions
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={contactInfo.message}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                  placeholder="Tell us about your specific needs, timeline, or any questions you have..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(selectedItems).length === 0}
              className="px-8 py-3 bg-[#f08e80] text-white rounded-md hover:bg-[#e07a6c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Quote...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Request Quote
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">✅ Quote submitted successfully!</p>
              <p className="text-green-700 text-sm mt-1">We'll review your request and get back to you within 24 hours.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-medium">❌ Failed to submit quote</p>
              <p className="text-red-700 text-sm mt-1">Please try again or contact support if the problem persists.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default HardwareCartModal
