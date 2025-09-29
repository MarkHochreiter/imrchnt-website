import React, { useState, useEffect } from 'react';

const HardwareCartModal = ({ isOpen, onClose }) => {
  const [hardwareItems, setHardwareItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedTerminals, setSelectedTerminals] = useState({}); // Now stores individual terminal selections
  const [quantities, setQuantities] = useState({}); // Quantity state for all items
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
        console.log('Image stats:', data.imageStats);
      } else {
        throw new Error(data.message || 'Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      
      // Fallback to cached/default data if API fails
      setHardwareItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Quantity management functions
  const updateQuantity = (itemId, quantity) => {
    const newQuantity = Math.max(1, Math.min(99, quantity)); // Min 1, Max 99
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const getQuantity = (itemId) => {
    return quantities[itemId] || 1;
  };

  // UPDATED: Handle terminal selection - now allows both purchase AND rental
  const handleTerminalSelection = (terminalId, isSelected) => {
    if (isSelected) {
      setSelectedTerminals(prev => ({
        ...prev,
        [terminalId]: true
      }));
      
      // Initialize quantity to 1 when terminal is selected
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

  // UPDATED: Handle accessory selection (radio button style per family)
  const handleAccessorySelection = (accessoryId, terminalFamily) => {
    // For radio button behavior, unselect other accessories in the same family
    const newSelectedItems = { ...selectedItems };
    
    // Find all accessories in this family and unselect them
    const groups = getGroupedProducts();
    if (groups[terminalFamily]) {
      groups[terminalFamily].accessories.forEach(acc => {
        if (acc.id !== accessoryId) {
          delete newSelectedItems[acc.id];
        }
      });
    }
    
    // Toggle the selected accessory
    if (selectedItems[accessoryId]) {
      delete newSelectedItems[accessoryId];
    } else {
      newSelectedItems[accessoryId] = true;
      // Initialize quantity to 1 when accessory is selected
      if (!quantities[accessoryId]) {
        setQuantities(prev => ({
          ...prev,
          [accessoryId]: 1
        }));
      }
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Group products by terminal family with proper SKU parsing
  const getGroupedProducts = () => {
    const groups = {};
    
    hardwareItems.forEach(product => {
      if (!product.sku) return; // Skip products without SKUs
      
      const skuParts = product.sku.toUpperCase().split('-');
      if (skuParts.length < 2) return; // Skip malformed SKUs
      
      const [terminalFamily, type, option] = skuParts;
      
      // Initialize group if it doesn't exist
      if (!groups[terminalFamily]) {
        groups[terminalFamily] = {
          name: terminalFamily,
          terminals: { buy: null, rent: null },
          accessories: []
        };
      }
      
      if (type === 'T') {
        // Terminal: AMS1-T-B or AMS1-T-R
        if (option === 'B') {
          groups[terminalFamily].terminals.buy = product;
        } else if (option === 'R') {
          groups[terminalFamily].terminals.rent = product;
        }
      } else if (type === 'A') {
        // Accessory: AMS1-A-01, SFO1-A-VM, etc.
        groups[terminalFamily].accessories.push(product);
      }
    });
    
    return groups;
  };

  // Product Image Component with fallback handling
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
    
    // Use fallback if no image URL or if image failed to load
    const shouldUseFallback = !product.imageUrl || imageError || !product.hasImage;
    
    return (
      <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
        {imageLoading && !shouldUseFallback && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {shouldUseFallback ? (
          // Fallback: Icon or placeholder
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              {product.type === 'terminal' ? (
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )}
              <p className="text-xs text-gray-500 font-medium">{product.sku}</p>
            </div>
          </div>
        ) : (
          // Actual product image
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

  // FIXED: Quantity Controls Component with proper event handling
  const QuantityControls = ({ itemId, className = "" }) => {
    const quantity = getQuantity(itemId);
    
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
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
              e.stopPropagation(); // Prevent event bubbling
              updateQuantity(itemId, parseInt(e.target.value) || 1);
            }}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
            className="w-full text-center font-semibold bg-transparent border-none outline-none"
            min="1"
            max="99"
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
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

  // UPDATED: Terminal Selection Component - now allows both purchase AND rental
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
                    
                    {/* Selection Checkbox */}
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
              
              {/* Quantity Controls for Terminal */}
              {selectedTerminals[terminals.buy.id] && (
                <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityControls itemId={terminals.buy.id} />
                  </div>
                  
                  {/* Subtotal */}
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
                    
                    {/* Selection Checkbox */}
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
              
              {/* Quantity Controls for Terminal */}
              {selectedTerminals[terminals.rent.id] && (
                <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityControls itemId={terminals.rent.id} />
                  </div>
                  
                  {/* Subtotal */}
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

  // FIXED: Accessory Grid Component with proper event handling
  const AccessoryGrid = ({ terminalFamily, accessories }) => {
    if (accessories.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {terminalFamily} Accessories
          <span className="text-sm text-gray-500 ml-2">(Select one)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessories.map((accessory) => (
            <div
              key={accessory.id}
              className={`border rounded-lg p-4 transition-all ${
                selectedItems[accessory.id]
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="text-center">
                <ProductImage 
                  product={accessory} 
                  className="w-full h-32 rounded-lg mb-3"
                />
                
                <h5 className="font-semibold text-gray-800 mb-2">{accessory.name}</h5>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.description}</p>
                
                {/* Selection and Price Row */}
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`accessory-${terminalFamily}`}
                      checked={selectedItems[accessory.id] || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleAccessorySelection(accessory.id, terminalFamily);
                      }}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Select</span>
                  </label>
                  
                  <span className="text-lg font-bold text-orange-600">
                    ${accessory.price.toFixed(2)}
                  </span>
                </div>
                
                {/* Quantity Controls - Only show when selected */}
                {selectedItems[accessory.id] && (
                  <div className="border-t pt-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <QuantityControls itemId={accessory.id} />
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-2 text-sm text-gray-600">
                      Subtotal: <span className="font-semibold text-orange-600">
                        ${(accessory.price * getQuantity(accessory.id)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-2">
                  <span className="text-xs text-gray-500">SKU: {accessory.sku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation and submission logic here
    // (Same as your existing submission logic)
  };

  // UPDATED: Calculate totals with quantities for both terminals and accessories
  const calculateTotal = () => {
    let total = 0;
    
    // Add selected terminals with quantities
    Object.entries(selectedTerminals).forEach(([terminalId, isSelected]) => {
      if (isSelected) {
        const terminal = hardwareItems.find(item => item.id === terminalId);
        if (terminal) {
          const quantity = getQuantity(terminalId);
          total += terminal.price * quantity;
        }
      }
    });
    
    // Add selected accessories with quantities
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

  // Get total item count including quantities
  const getTotalItemCount = () => {
    let count = 0;
    
    // Count selected terminals with quantities
    Object.entries(selectedTerminals).forEach(([terminalId, isSelected]) => {
      if (isSelected) {
        count += getQuantity(terminalId);
      }
    });
    
    // Count selected accessories with quantities
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
          <h2 className="text-2xl font-bold text-gray-800">Select Hardware Items</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
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
        </div>

        {/* Footer with item count and total */}
        {!loading && !error && hasSelections && (
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
