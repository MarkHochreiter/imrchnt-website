import { ArrowLeft, Wifi, CreditCard, Smartphone, Zap, Shield, Printer, Trash2, PlusCircle, Search, Grid, Home } from 'lucide-react';
import { useState } from 'react';
import s1f2POS from '../assets/s1f2_pos.png';

// A reusable Button component, matching the new aesthetic.
const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm';
  
  const variants = {
    primary: 'bg-[#f08e80] text-white hover:bg-[#e07d70]',
    secondary: 'bg-white text-[#f08e80] border border-[#f08e80] hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Main component for the POS Diagram Page
function POSDiagramPage({ onNavigateBack }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    // Original Features with updated coordinates
    {
      id: 1, // DONE
      title: "Contactless Reader",
      description: "Accepts NFC cards and mobile payments like Apple Pay & Google Pay.",
      icon: <Wifi size={20} />,
      position: { top: '15%', left: '50%' }
    },
    {
      id: 2,
      title: "5.5\" HD Touchscreen",
      description: "Intuitive interface for you and your customers.",
      icon: <Smartphone size={20} />,
      position: { top: '70%', left: '50%' }
    },
    {
      id: 3, // DONE
      title: "Chip Card Slot",
      description: "Securely processes EMV chip cards.",
      icon: <CreditCard size={20} />,
      position: { top: '94%', left: '50%' }
    },
    {
      id: 4,
      title: "Built-in Printer",
      description: "Fast thermal receipt printing for customer convenience.",
      icon: <Printer size={20} />,
      position: { top: '30%', left: '78%' }
    },
    {
      id: 5,
      title: "Item Details",
      description: "Description, Product Number, Unit Price of item in Cart.",
      icon: <Shield size={20} />,
      position: { top: '53%', left: '18%' }
    },
    // New Features from our grid session
    {
      id: 6,
      title: "Barcode Scanner",
      description: "Scans product barcodes or customer QR codes.",
      icon: <Zap size={20} />,
      position: { top: '45%', left: '77%' }
    },
    {
      id: 7,
      title: "Delete Item",
      description: "Remove an item from the current order.",
      icon: <Trash2 size={20} />,
      position: { top: '51%', left: '80%' }
    },
    {
      id: 8,
      title: "Adjust Quantity",
      description: "Increase or decrease the quantity of the selected item.",
      icon: <PlusCircle size={20} />,
      position: { top: '56%', left: '50%' }
    },
    {
      id: 9,
      title: "Search Products",
      description: "Quickly find a product or item in your inventory.",
      icon: <Search size={20} />,
      position: { top: '45%', left: '51%' }
    },
    {
      id: 10,
      title: "POS Drawer",
      description: [
        "Access POS functions:",
        "Clear cart",
        "Close Day",
        "Transactions"
      ],
      icon: <Grid size={20} />,
      position: { top: '38%', left: '80%' }
    },
    {
      id: 11,
      title: "Home Screen",
      description: [
        "Access Home dashboard functions:",
        "Continue sale",
        "Manage offline settings",
        "Sign out"
      ],
      icon: <Home size={20} />,
      position: { top: '38%', left: '18%' }
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans animate-fade-in">
      {/* Sub-header with back navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button onClick={onNavigateBack} variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to InStore Solutions
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            S1f2 Terminal Anatomy
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            An interactive look at the key components of our all-in-one payment solution. 
            Hover over the points on the device to learn more.
          </p>
        </div>

        {/* Diagram Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side: Interactive Device Image */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                <img 
                  src={s1f2POS}
                  alt="S1f2 Payment Terminal"
                  className="max-w-full h-auto max-h-[500px] object-contain"
                />
              </div>

              {/* Interactive Feature Points */}
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: feature.position.top, left: feature.position.left }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="w-4 h-4 bg-[#f08e80] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  <div className="absolute w-8 h-8 bg-[#f08e80]/20 rounded-full -top-2 -left-2 animate-ping-slow group-hover:animate-none" />
                  
                  {/* Tooltip */}
                  {hoveredFeature === feature.id && (
                    <div 
                      className="absolute z-10 bg-gray-900 text-white p-3 rounded-lg shadow-xl w-64"
                      style={{
                        bottom: '150%', 
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="text-[#f08e80] mr-2">{feature.icon}</div>
                        <h4 className="font-bold">{feature.title}</h4>
                      </div>
                      {/* UPDATED DESCRIPTION LOGIC */}
                      <div className="text-sm text-gray-300">
                        {Array.isArray(feature.description) ? (
                          <>
                            <p>{feature.description[0]}</p>
                            <ul className="list-disc list-inside mt-2 pl-2 space-y-1">
                              {feature.description.slice(1).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <p>{feature.description}</p>
                        )}
                      </div>
                      <div className="absolute w-4 h-4 bg-gray-900 transform rotate-45 -bottom-2 left-1/2 -translate-x-1/2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Feature List */}
          <div className="space-y-6">
            <div className="flex items-start">
              <img src="https://i.imgur.com/vJeS4pC.png" alt="imrchnt logo" className="h-8 mr-4 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Core Features</h2>
                <p className="text-gray-500 mt-1">The S1f2 is designed for reliability and ease of use.</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <ul className="space-y-5">
                {features.map((feature ) => (
                  <li key={feature.id} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                      {/* Also update the side list to handle array descriptions */}
                      <div className="text-gray-600">
                        {Array.isArray(feature.description) ? (
                          <>
                            <p>{feature.description[0]}</p>
                            <ul className="list-disc list-inside mt-1 pl-2 text-sm">
                              {feature.description.slice(1).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <p>{feature.description}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default POSDiagramPage;
