import React, { useState, useEffect } from 'react';

const HardwareCartModal = ({ isOpen, onClose }) => {
  const [hardwareItems, setHardwareItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedTerminals, setSelectedTerminals] = useState({});
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  // Fetch products from API
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://imrchnt.netlify.app/.netlify/functions/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.products) {
        setHardwareItems(data.products);
        console.log('Products loaded:', data.products);
      } else {
        throw new Error(data.message || 'Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setHardwareItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Quantity management functions
  const updateQuantity = (itemId, quantity) => {
    const newQuantity = Math.max(1, Math.min(99, quantity));
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const getQuantity = (itemId) => {
    return quantities[itemId] || 1;
  };

  // Handle terminal selection
  const handleTerminalSelection = (terminalId, isSelected) => {
    if (isSelected) {
      setSelectedTerminals(prev => ({
        ...prev,
        [terminalId]: true
      }));
      
      if (!quantities[terminalId]) {
        setQuantities(prev => ({
          ...prev,
          [terminalId]: 1
        }));
      }
    } else {
      setSelectedTerminals(prev => {
        const newSelected = { ...prev };
        delete newSelected[terminalId];
        return newSelected;
      });
    }
  };

  // Handle accessory selection
  const handleAccessorySelection = (accessoryId, isSelected) => {
    if (isSelected) {
      setSelectedItems(prev => ({
        ...prev,
        [accessoryId]: true
      }));
      
      if (!quantities[accessoryId]) {
        setQuantities(prev => ({
          ...prev,
          [accessoryId]: 1
        }));
      }
    } else {
      setSelectedItems(prev => {
        const newSelected = { ...prev };
        delete newSelected[accessoryId];
        return newSelected;
      });
    }
  };

  // Handle contact form changes
  const handleContactChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  // Group products by terminal family
  const getGroupedProducts = () => {
    const groups = {};
    
    hardwareItems.forEach(product => {
      if (!product.sku) return;
      
      const skuParts = product.sku.toUpperCase().split('-');
      if (skuParts.length < 2) return;
      
      const [terminalFamily, type, option] = skuParts;
      
      if (!groups[terminalFamily]) {
        groups[terminalFamily] = {
          name: terminalFamily,
          terminals: { buy: null, rent: null },
          accessories: []
        };
      }
      
      if (type === 'T') {
        if (option === 'B') {
          groups[terminalFamily].terminals.buy = product;
        } else if (option === 'R') {
          groups[terminalFamily].terminals.rent = product;
        }
      } else if (type === 'A') {
        groups[terminalFamily].accessories.push(product);
      }
    });
    
    return groups;
  };

  // Product Image Component
  const ProductImage = ({ product, className = "" }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    
    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };
    
    const handleImageLoad = () => {
      setImageLoading(false);
    };
    
    const shouldUseFallback = !product.imageUrl || imageError || !product.hasImage;
    
    return (
      <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
        {imageLoading && !shouldUseFallback && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {shouldUseFallback ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <p className="text-xs text-gray-500 font-medium">{product.sku}</p>
            </div>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
      </div>
    );
  };

  // Quantity Controls Component
  const QuantityControls = ({ itemId, className = "" }) => {
    const quantity = getQuantity(itemId);
    
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(itemId, quantity - 1);
          }}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div className="w-12 text-center">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              e.stopPropagation();
              updateQuantity(itemId, parseInt(e.target.value) || 1);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full text-center font-semibold bg-transparent border-none outline-none"
            min="1"
            max="99"
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(itemId, quantity + 1);
          }}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
          disabled={quantity >= 99}
        >
          +
        </button>
      </div>
    );
  };

  // Terminal Selection Component
  const TerminalSelector = ({ terminalFamily, terminals }) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
            {terminalFamily}
          </span>
          Terminal Options
          <span className="text-sm text-gray-500 ml-2">(Select purchase, rental, or both)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Purchase Option */}
          {terminals.buy && (
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedTerminals[terminals.buy.id] 
                ? 'border-green-500 bg-green-50 shadow-md' 
                : 'border-gray-200 hover:border-green-300'
            }`}>
              <div 
                onClick={() => handleTerminalSelection(terminals.buy.id, !selectedTerminals[terminals.buy.id])}
                className="cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <ProductImage 
                    product={terminals.buy} 
                    className="w-20 h-20 rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{terminals.buy.name}</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        PURCHASE
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{terminals.buy.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-green-600">
                        ${terminals.buy.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500">SKU: {terminals.buy.sku}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={selectedTerminals[terminals.buy.id] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleTerminalSelection(terminals.buy.id, e.target.checked);
                        }}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Select for purchase</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedTerminals[terminals.buy.id] && (
                <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityControls itemId={terminals.buy.id} />
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Subtotal: <span className="font-semibold text-green-600">
                      ${(terminals.buy.price * getQuantity(terminals.buy.id)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Rental Option */}
          {terminals.rent && (
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedTerminals[terminals.rent.id] 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300'
            }`}>
              <div 
                onClick={() => handleTerminalSelection(terminals.rent.id, !selectedTerminals[terminals.rent.id])}
                className="cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <ProductImage 
                    product={terminals.rent} 
                    className="w-20 h-20 rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{terminals.rent.name}</h4>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        RENTAL
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{terminals.rent.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        ${terminals.rent.price.toFixed(2)}/mo
                      </span>
                      <span className="text-xs text-gray-500">SKU: {terminals.rent.sku}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={selectedTerminals[terminals.rent.id] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleTerminalSelection(terminals.rent.id, e.target.checked);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Select for rental</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedTerminals[terminals.rent.id] && (
                <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityControls itemId={terminals.rent.id} />
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Subtotal: <span className="font-semibold text-blue-600">
                      ${(terminals.rent.price * getQuantity(terminals.rent.id)).toFixed(2)}/mo
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Accessory Grid Component
  const AccessoryGrid = ({ terminalFamily, accessories }) => {
    if (accessories.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {terminalFamily} Accessories
          <span className="text-sm text-gray-500 ml-2">(Select multiple)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessories.map((accessory) => (
            <div
              key={accessory.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedItems[accessory.id]
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div 
                onClick={() => handleAccessorySelection(accessory.id, !selectedItems[accessory.id])}
                className="cursor-pointer"
              >
                <div className="text-center">
                  <ProductImage 
                    product={accessory} 
                    className="w-full h-32 rounded-lg mb-3"
                  />
                  
                  <h5 className="font-semibold text-gray-800 mb-2">{accessory.name}</h5>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems[accessory.id] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleAccessorySelection(accessory.id, e.target.checked);
                        }}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Select</span>
                    </label>
                    
                    <span className="text-lg font-bold text-orange-600">
                      ${accessory.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">SKU: {accessory.sku}</span>
                  </div>
                </div>
              </div>
              
              {selectedItems[accessory.id] && (
                <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityControls itemId={accessory.id} />
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Subtotal: <span className="font-semibold text-orange-600">
                      ${(accessory.price * getQuantity(accessory.id)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Customer Information Form Component
  const CustomerForm = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
        
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={contactInfo.company}
            onChange={handleContactChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your Company"
          />
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Any specific requirements or questions about your hardware needs..."
          />
        </div>
      </div>
    );
  };

  // Handle form submission with detailed debugging
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setDebugInfo('Starting quote submission...');

    try {
      // Generate a unique quote ID
      const quoteId = `HW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare selected items in the format expected by the API
      const selectedItemsArray = [];
      
      // Add selected terminals
      Object.entries(selectedTerminals).forEach(([terminalId, isSelected]) => {
        if (isSelected) {
          const terminal = hardwareItems.find(item => item.id === terminalId);
          if (terminal) {
            const quantity = getQuantity(terminalId);
            const isRental = terminal.sku.includes('-T-R');
            selectedItemsArray.push({
              itemId: terminalId,
              itemName: terminal.name,
              itemCategory: 'Terminal',
              sku: terminal.sku,
              unitPrice: terminal.price,
              quantity: quantity,
              lineTotal: terminal.price * quantity,
              purchaseOption: isRental ? 'rent' : 'buy'
            });
          }
        }
      });
      
      // Add selected accessories
      Object.entries(selectedItems).forEach(([itemId, isSelected]) => {
        if (isSelected) {
          const item = hardwareItems.find(item => item.id === itemId);
          if (item) {
            const quantity = getQuantity(itemId);
            selectedItemsArray.push({
              itemId: itemId,
              itemName: item.name,
              itemCategory: 'Accessory',
              sku: item.sku,
              unitPrice: item.price,
              quantity: quantity,
              lineTotal: item.price * quantity,
              purchaseOption: 'buy'
            });
          }
        }
      });

      const quoteData = {
        quoteId: quoteId,
        contactInfo: contactInfo,
        selectedItems: selectedItemsArray,
        quoteTotalAmount: calculateTotal(),
        totalItems: getTotalItemCount(),
        timestamp: new Date().toISOString()
      };

      setDebugInfo(`Prepared quote data: ${JSON.stringify(quoteData, null, 2)}`);
      console.log('Submitting quote to HubSpot:', quoteData);

      // Try different API endpoints to debug
      const endpoints = [
        '/api/create-quote',
        '/.netlify/functions/create-quote',
        'https://imrchnt.netlify.app/.netlify/functions/create-quote'
      ];

      let response;
      let lastError;

      for (const endpoint of endpoints) {
        try {
          setDebugInfo(prev => prev + `\\n\\nTrying endpoint: ${endpoint}`);
          
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(quoteData)
          });

          setDebugInfo(prev => prev + `\\nResponse status: ${response.status}`);
          
          if (response.ok) {
            break; // Success, exit the loop
          } else {
            const errorText = await response.text();
            setDebugInfo(prev => prev + `\\nError response: ${errorText}`);
            lastError = new Error(`HTTP ${response.status}: ${errorText}`);
          }
        } catch (error) {
          setDebugInfo(prev => prev + `\\nEndpoint ${endpoint} failed: ${error.message}`);
          lastError = error;
          continue; // Try next endpoint
        }
      }

      if (!response || !response.ok) {
        throw lastError || new Error('All endpoints failed');
      }

      const result = await response.json();
      setDebugInfo(prev => prev + `\\n\\nSuccess response: ${JSON.stringify(result, null, 2)}`);

      if (result.success) {
        console.log('✅ Quote submitted successfully to HubSpot');
        setSubmitStatus('success');
        
        // Reset form
        setSelectedItems({});
        setSelectedTerminals({});
        setQuantities({});
        setContactInfo({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setShowContactForm(false);
        }, 3000);
      } else {
        console.error('❌ Quote submission failed:', result.message);
        setSubmitStatus('error');
        setDebugInfo(prev => prev + `\\n\\nAPI returned success: false - ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setSubmitStatus('error');
      setDebugInfo(prev => prev + `\\n\\nCatch block error: ${error.message}\\nStack: ${error.stack}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate totals
  const calculateTotal = () => {
    let total = 0;
    
    Object.entries(selectedTerminals).forEach(([terminalId, isSelected]) => {
      if (isSelected) {
        const terminal = hardwareItems.find(item => item.id === terminalId);
        if (terminal) {
          const quantity = getQuantity(terminalId);
          total += terminal.price * quantity;
        }
      }
    });
    
    Object.entries(selectedItems).forEach(([itemId, isSelected]) => {
      if (isSelected) {
        const item = hardwareItems.find(item => item.id === itemId);
        const quantity = getQuantity(itemId);
        if (item) {
          total += item.price * quantity;
        }
      }
    });
    
    return total;
  };

  // Get total item count
  const getTotalItemCount = () => {
    let count = 0;
    
    Object.entries(selectedTerminals).forEach(([terminalId, isSelected]) => {
      if (isSelected) {
        count += getQuantity(terminalId);
      }
    });
    
    Object.entries(selectedItems).forEach(([itemId, isSelected]) => {
      if (isSelected) {
        count += getQuantity(itemId);
      }
    });
    
    return count;
  };

  if (!isOpen) return null;

  const groupedProducts = getGroupedProducts();
  const totalAmount = calculateTotal();
  const totalItems = getTotalItemCount();
  const hasSelections = Object.keys(selectedTerminals).some(key => selectedTerminals[key]) || Object.keys(selectedItems).some(key => selectedItems[key]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {showContactForm ? 'Contact Information' : 'Select Hardware Items'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {showContactForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <CustomerForm />
              
              {/* Debug Information */}
              {debugInfo && (
                <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Debug Information:</h4>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {debugInfo}
                  </pre>
                </div>
              )}
              
              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-green-800 text-sm">✅ Quote request submitted successfully! Our sales team will contact you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-800 text-sm">❌ Something went wrong. Please check the debug information above.</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Back to Selection
                </button>
                <button
                  type="submit"
                  disabled={submitting || !contactInfo.firstName || !contactInfo.lastName || !contactInfo.email}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Quote...
                    </>
                  ) : (
                    'Submit Quote Request'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading products...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold">Error Loading Products</h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                  </div>
                  <button
                    onClick={fetchProducts}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : Object.keys(groupedProducts).length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-600">No Products Found</h3>
                  <p className="text-gray-500 mt-2">Please check your HubSpot product catalog or contact support.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedProducts).map(([family, group]) => (
                    <div key={family} className="border border-gray-200 rounded-lg p-6">
                      <TerminalSelector 
                        terminalFamily={family} 
                        terminals={group.terminals} 
                      />
                      <AccessoryGrid 
                        terminalFamily={family} 
                        accessories={group.accessories} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && hasSelections && !showContactForm && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-lg">
                <div className="text-gray-600 text-sm mb-1">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                </div>
                <div>
                  <span className="text-gray-600">Total: </span>
                  <span className="font-bold text-2xl text-green-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareCartModal;
