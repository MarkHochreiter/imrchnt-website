import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

// Move CustomerForm outside the main component to prevent re-creation and input focus loss
const CustomerForm = ({ contactInfo, handleContactChange }) => {
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

function HardwareCartModal({ isOpen, onClose }) {
  const [hardwareItems, setHardwareItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedTerminals, setSelectedTerminals] = useState({});
  const [quantities, setQuantities] = useState({});
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

  // Load hardware data
  useEffect(() => {
    if (isOpen) {
      loadHardwareData();
    }
  }, [isOpen]);

  const loadHardwareData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulated hardware data - replace with actual API call
      const mockData = [
        {
          id: 's1f2',
          name: 'S1F2 Terminal',
          category: 'terminals',
          description: 'Compact POS terminal with built-in payment processing',
          price: { rent: 49, buy: 299 },
          image: '/api/placeholder/300/200',
          accessories: [
            { id: 'receipt-printer', name: 'Receipt Printer', price: { rent: 15, buy: 89 } },
            { id: 'cash-drawer', name: 'Cash Drawer', price: { rent: 10, buy: 59 } }
          ]
        },
        {
          id: 'ams1',
          name: 'AMS1 Terminal',
          category: 'terminals',
          description: 'Advanced multi-station terminal for high-volume businesses',
          price: { rent: 79, buy: 499 },
          image: '/api/placeholder/300/200',
          accessories: [
            { id: 'receipt-printer', name: 'Receipt Printer', price: { rent: 15, buy: 89 } },
            { id: 'label-printer', name: 'Label Printer', price: { rent: 20, buy: 129 } },
            { id: 'cash-drawer', name: 'Cash Drawer', price: { rent: 10, buy: 59 } },
            { id: 'barcode-scanner', name: 'Barcode Scanner', price: { rent: 12, buy: 79 } }
          ]
        },
        {
          id: 'sfo1',
          name: 'SFO1 Terminal',
          category: 'terminals',
          description: 'Portable terminal perfect for mobile sales and events',
          price: { rent: 39, buy: 249 },
          image: '/api/placeholder/300/200',
          accessories: [
            { id: 'receipt-printer', name: 'Portable Receipt Printer', price: { rent: 18, buy: 99 } },
            { id: 'card-reader', name: 'Mobile Card Reader', price: { rent: 8, buy: 49 } }
          ]
        }
      ];

      setHardwareItems(mockData);
    } catch (err) {
      setError('Failed to load hardware data. Please try again.');
      console.error('Error loading hardware data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact form changes
  const handleContactChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle item selection
  const handleItemSelect = (itemId, accessoryId = null) => {
    const key = accessoryId ? `${itemId}-${accessoryId}` : itemId;
    setSelectedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // Initialize quantity if selecting
    if (!selectedItems[key]) {
      setQuantities(prev => ({
        ...prev,
        [key]: 1
      }));
    }
  };

  // Handle terminal selection for accessories
  const handleTerminalSelect = (accessoryId, terminalId) => {
    setSelectedTerminals(prev => ({
      ...prev,
      [accessoryId]: terminalId
    }));
  };

  // Handle quantity changes
  const handleQuantityChange = (key, change) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) + change)
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    let rentTotal = 0;
    let buyTotal = 0;
    let itemCount = 0;

    Object.entries(selectedItems).forEach(([key, isSelected]) => {
      if (!isSelected) return;

      const quantity = quantities[key] || 1;
      itemCount += quantity;

      if (key.includes('-')) {
        // Accessory
        const [terminalId, accessoryId] = key.split('-');
        const terminal = hardwareItems.find(item => item.id === terminalId);
        const accessory = terminal?.accessories.find(acc => acc.id === accessoryId);
        if (accessory) {
          rentTotal += accessory.price.rent * quantity;
          buyTotal += accessory.price.buy * quantity;
        }
      } else {
        // Terminal
        const terminal = hardwareItems.find(item => item.id === key);
        if (terminal) {
          rentTotal += terminal.price.rent * quantity;
          buyTotal += terminal.price.buy * quantity;
        }
      }
    });

    return { rentTotal, buyTotal, itemCount };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const { rentTotal, buyTotal, itemCount } = calculateTotals();
      const quoteId = `QUOTE-${Date.now()}`;
      
      // Prepare line items for submission
      const lineItems = [];
      let lineNumber = 1;

      Object.entries(selectedItems).forEach(([key, isSelected]) => {
        if (!isSelected) return;

        const quantity = quantities[key] || 1;
        let itemName, category, unitPrice, parentTerminal = '';

        if (key.includes('-')) {
          // Accessory
          const [terminalId, accessoryId] = key.split('-');
          const terminal = hardwareItems.find(item => item.id === terminalId);
          const accessory = terminal?.accessories.find(acc => acc.id === accessoryId);
          if (accessory) {
            itemName = accessory.name;
            category = 'accessory';
            unitPrice = `Rent: $${accessory.price.rent}/mo, Buy: $${accessory.price.buy}`;
            parentTerminal = terminal.name;
          }
        } else {
          // Terminal
          const terminal = hardwareItems.find(item => item.id === key);
          if (terminal) {
            itemName = terminal.name;
            category = 'terminal';
            unitPrice = `Rent: $${terminal.price.rent}/mo, Buy: $${terminal.price.buy}`;
          }
        }

        lineItems.push({
          quoteId,
          lineNumber: lineNumber++,
          itemName,
          itemCategory: category,
          parentTerminal,
          purchaseOption: 'rent/buy',
          quantity,
          unitPrice,
          lineTotal: `Rent: $${quantity * (itemName.includes('Terminal') ? 
            hardwareItems.find(t => t.name === itemName)?.price.rent || 0 : 
            hardwareItems.find(t => t.accessories?.find(a => a.name === itemName))?.accessories.find(a => a.name === itemName)?.price.rent || 0
          )}/mo, Buy: $${quantity * (itemName.includes('Terminal') ? 
            hardwareItems.find(t => t.name === itemName)?.price.buy || 0 : 
            hardwareItems.find(t => t.accessories?.find(a => a.name === itemName))?.accessories.find(a => a.name === itemName)?.price.buy || 0
          )}`,
          customerFirstName: contactInfo.firstName,
          customerLastName: contactInfo.lastName,
          customerEmail: contactInfo.email,
          customerCompany: contactInfo.company || '',
          customerPhone: contactInfo.phone || '',
          customerMessage: contactInfo.message || '',
          quoteTotalItems: itemCount,
          quoteTotalAmount: `Rent: $${rentTotal}/mo, Buy: $${buyTotal}`,
          timestamp: new Date().toISOString()
        });
      });

      // Submit each line item
      for (const lineItem of lineItems) {
        const formData = new FormData();
        Object.entries(lineItem).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
          throw new Error(`Failed to submit line item ${lineItem.lineNumber}`);
        }
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setSelectedItems({});
        setQuantities({});
        setContactInfo({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        setShowContactForm(false);
        setSubmitStatus(null);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle proceed to contact form
  const handleProceedToContact = () => {
    const hasSelectedItems = Object.values(selectedItems).some(selected => selected);
    if (hasSelectedItems) {
      setShowContactForm(true);
    }
  };

  if (!isOpen) return null;

  const { rentTotal, buyTotal, itemCount } = calculateTotals();
  const hasSelectedItems = Object.values(selectedItems).some(selected => selected);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              {showContactForm ? 'Contact Information' : 'Hardware Quote Builder'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading hardware options...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={loadHardwareData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : showContactForm ? (
            <form onSubmit={handleSubmit} className="p-6">
              <CustomerForm 
                contactInfo={contactInfo} 
                handleContactChange={handleContactChange} 
              />
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  Quote request submitted successfully! We'll contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  There was an error submitting your quote. Please try again.
                </div>
              )}
              
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors"
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
            <div className="p-6">
              {/* Hardware Selection Content */}
              <div className="space-y-8">
                {hardwareItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedItems[item.id] || false}
                                onChange={() => handleItemSelect(item.id)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium">
                                Rent: ${item.price.rent}/mo | Buy: ${item.price.buy}
                              </span>
                            </label>
                            {selectedItems[item.id] && (
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">{quantities[item.id] || 1}</span>
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        
                        {/* Accessories */}
                        {item.accessories && item.accessories.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Available Accessories</h4>
                            <div className="space-y-2">
                              {item.accessories.map((accessory) => {
                                const accessoryKey = `${item.id}-${accessory.id}`;
                                return (
                                  <div key={accessory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedItems[accessoryKey] || false}
                                        onChange={() => handleItemSelect(item.id, accessory.id)}
                                        className="mr-3"
                                      />
                                      <span className="font-medium">{accessory.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                      <span className="text-sm">
                                        Rent: ${accessory.price.rent}/mo | Buy: ${accessory.price.buy}
                                      </span>
                                      {selectedItems[accessoryKey] && (
                                        <div className="flex items-center space-x-2">
                                          <button
                                            type="button"
                                            onClick={() => handleQuantityChange(accessoryKey, -1)}
                                            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                          >
                                            <Minus className="h-3 w-3" />
                                          </button>
                                          <span className="w-6 text-center text-sm">{quantities[accessoryKey] || 1}</span>
                                          <button
                                            type="button"
                                            onClick={() => handleQuantityChange(accessoryKey, 1)}
                                            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                          >
                                            <Plus className="h-3 w-3" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
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

        {/* Footer */}
        {!loading && !error && !showContactForm && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {itemCount > 0 ? (
                  <>
                    {itemCount} item{itemCount !== 1 ? 's' : ''} selected
                    <div className="mt-1">
                      <span className="font-medium">Total: Rent ${rentTotal}/mo | Buy ${buyTotal}</span>
                    </div>
                  </>
                ) : (
                  'Select hardware items to get started'
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToContact}
                  disabled={!hasSelectedItems}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Continue to Contact Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HardwareCartModal;
