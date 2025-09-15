import { 
  ArrowLeft,
  Wifi, 
  CreditCard, 
  Smartphone, 
  Zap, 
  Shield, 
  Printer, 
  Trash2, 
  PlusCircle, 
  Search, 
  Grid, 
  Home, 
  DollarSign, 
  Monitor, 
  Tablet, 
  Layers, 
  Battery, 
  Cloud, 
  Users, 
  BarChart3, 
  Package, 
  Percent, 
  Shredder, 
  Calculator,
  BookPlus,
  Flag,
  Wallet,
  Tag,
  Book} from 'lucide-react';
import { useState } from 'react';
import s1f2POS from '../assets/s1f2_pos.png';
import scanSampleVideo from '../assets/scan_sample.mp4';
import paymentSampleVideo from '../assets/payment_sample.mp4';
import desktopPOS from '../assets/desktop_sample.png';
import iphone from '../assets/iphone.png';
import apple from '../assets/apple.png';
import search from '../assets/search.mp4';

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
  const [selectedDeviceType, setSelectedDeviceType] = useState('desktop');

  // Device type configurations
  const deviceTypes = [
    {
      id: 'desktop',
      name: 'Desktop',
      icon: <Monitor className="h-5 w-5" />,
      title: 'Run on Desktop',
      subtitle: 'Full-featured desktop solution for comprehensive retail management',
      description: 'Our application on desktop provides the most comprehensive feature set with large display support, seamlessly integrate with all your business peripherals, pair with a touchscreen monitor for even greater ease of use.',
      imageSrc: desktopPOS
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: <Tablet className="h-5 w-5" />,
      title: 'Run on Tablet',
      subtitle: 'Portable and flexible point-of-sale for modern retail environments',
      description: 'Perfect for retailers that need mobility without sacrificing functionality. Our tablet POS solution offers touch-optimized interface, minimal device footprint. Pair with the S1F2 or AMS1 for ultimate flexibility.',
      imageSrc: desktopPOS 
    },
    {
      id: 'phone',
      name: 'Phone',
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Run on Smartphone',
      subtitle: 'Pocket-sized point-of-sale for ultimate mobility and convenience',
      description: 'Transform any smartphone into a powerful POS system. Perfect for pop-ups, events, and offsite. Turn your smartphone into a Card Reader with our Tap to Pay functionality or pair with an S1F2 or AMS1 for full card reader capabilities to process any type of payment anywhere.',
      imageSrc: iphone
    },
    {
      id: 'all-in-one',
      name: 'All-in-one',
      icon: <Layers className="h-5 w-5" />,
      title: 'Run on Card Reader',
      subtitle: 'Everything you need all in one unit',
      description: 'Bring one piece of hardware to your next offsite.',
      imageSrc: s1f2POS // Current s1f2POS image
    }
  ];

  // Features for different device types
  const deviceFeatures = {
    'desktop': [
  {
    id: 1, // DONE
    title: "Search",
            hasVideo: true,
        videoSrc: search,
    description: "Either scan item into sale with Bluetooth connected Scanner or use our blazing fast search to manually find and add item into sale",
    icon: <Search size={20} />,
    position: { top: '27%', left: '5%' }
  },

  {
    id: 2, // DONE
    title: "Store - Cashier",
    description: "Displays store you're selling from and cashier making the sale",
    icon: <Zap size={20} />,
    position: { top: '13%', left: '67%' }
  },
  {
    id: 3, // DONE
    title: "POS drawer",
    description: "Navigate to Transactions, Close Day, Assign Card Reader, Attach Bluetooth scanner",
    icon: <Flag size={20} />,
    position: { top: '13%', left: '83%' }
  },
  {
    id: 4, // DONE
    title: "Home",
    description: "Navigate back to Home to access other app modules",
    icon: <Home size={20} />,
    position: { top: '13%', left: '96%' }
  },
  {
    id: 5, // DONE 
    title: "Add Customer",
    description: "Add customer to sale at any point. Look up by Phone, Email, Name, Address",
    icon: <Users size={20} />,
    position: { top: '34%', left: '96%' }
  },
  {
    id: 6,
    title: "Subtotal",
    description: "Sale subtotal",
    icon: <DollarSign size={20} />,
    position: { top: '41%', left: '96%' }
  },
  {
    id: 7,
    title: "Discount",
    description: "Discount amount applied to sale",
    icon: <Tag size={20} />,
    position: { top: '47%', left: '96%' }
  },
  {
    id: 8, // DONE
    title: "Tax",
    description: "Tax amount applied to sale",
    icon: <Percent size={20} />,
    position: { top: '53%', left: '96%' }
  },
  {
    id: 9,
    title: "Sale Total",
    description: "Total amount to be charged in sale",
    icon: <Calculator size={20} />,
    position: { top: '59%', left: '96%' }
  },
  {
    id: 10, // DONE 
    title: "Clear order",
    description: "Removes everything from sale",
    icon: <Shredder size={20} />,
    position: { top: '74%', left: '81%' }
  },
  {
    id: 12, // DONE
    title: "Payment",
    description: "Click on Payment to Tender and complete sale",
    icon: <Wallet size={20} />,
    position: { top: '85%', left: '96%' }
  },
  {
    id: 11, // DONE
    title: "Discount",
    description: "Manually apply discount to sale by flat dollar amount or by a certain percent",
    icon: <Tag size={20} />,
    position: { top: '74%', left: '96%' }
  },
  {
    id: 13,
    title: "Line Item",
    description: "Product Number and Description",
    icon: <Book size={20} />,
    position: { top: '41%', left: '5%' }
  },  
  {
    id: 14,
    title: "Retail Price",
    description: "Unit Retail Price",
    icon: <DollarSign size={20} />,
    position: { top: '41%', left: '25%' }
  },
  
  {
    id: 15,
    title: "Quantity",
    description: "Click + or - to adjust quantity, auto adjusts with scan",
    icon: <BookPlus size={20} />,
    position: { top: '41%', left: '36%' }
  },
 
  {
    id: 16,
    title: "Total",
    description: "Item Total (Retail x Quantity",
    icon: <Calculator size={20} />,
    position: { top: '41%', left: '52%' }
  },
  
  {
    id: 17,
    title: "Delete",
    description: "Remove item from sale",
    icon: <Trash2 size={20} />,
    position: { top: '41%', left: '64%' }
  },
  
    ],
    'tablet': [
  {
    id: 1, // DONE
    title: "Search",
    description: "Either scan item into sale with Bluetooth connected Scanner or use our blazing fast search to manually find and add item into sale",
    icon: <Search size={20} />,
    position: { top: '27%', left: '5%' }
  },

  {
    id: 2, // DONE
    title: "Store - Cashier",
    description: "Displays store you're selling from and cashier making the sale",
    icon: <Zap size={20} />,
    position: { top: '13%', left: '67%' }
  },
  {
    id: 3, // DONE
    title: "POS drawer",
    description: "Navigate to Transactions, Close Day, Assign Card Reader, Attach Bluetooth scanner",
    icon: <Flag size={20} />,
    position: { top: '13%', left: '83%' }
  },
  {
    id: 4, // DONE
    title: "Home",
    description: "Navigate back to Home to access other app modules",
    icon: <Home size={20} />,
    position: { top: '13%', left: '96%' }
  },
  {
    id: 5, // DONE 
    title: "Add Customer",
    description: "Add customer to sale at any point. Look up by Phone, Email, Name, Address",
    icon: <Users size={20} />,
    position: { top: '34%', left: '96%' }
  },
  {
    id: 6,
    title: "Subtotal",
    description: "Sale subtotal",
    icon: <DollarSign size={20} />,
    position: { top: '41%', left: '96%' }
  },
  {
    id: 7,
    title: "Discount",
    description: "Discount amount applied to sale",
    icon: <Tag size={20} />,
    position: { top: '47%', left: '96%' }
  },
  {
    id: 8, // DONE
    title: "Tax",
    description: "Tax amount applied to sale",
    icon: <Percent size={20} />,
    position: { top: '53%', left: '96%' }
  },
  {
    id: 9,
    title: "Sale Total",
    description: "Total amount to be charged in sale",
    icon: <Calculator size={20} />,
    position: { top: '59%', left: '96%' }
  },
  {
    id: 10, // DONE 
    title: "Clear order",
    description: "Removes everything from sale",
    icon: <Shredder size={20} />,
    position: { top: '74%', left: '81%' }
  },
  {
    id: 12, // DONE
    title: "Payment",
    description: "Click on Payment to Tender and complete sale",
    icon: <Wallet size={20} />,
    position: { top: '85%', left: '96%' }
  },
  {
    id: 11, // DONE
    title: "Discount",
    description: "Manually apply discount to sale by flat dollar amount or by a certain percent",
    icon: <Tag size={20} />,
    position: { top: '74%', left: '96%' }
  },
  {
    id: 13,
    title: "Line Item",
    description: "Product Number and Description",
    icon: <Book size={20} />,
    position: { top: '41%', left: '5%' }
  },  
  {
    id: 14,
    title: "Retail Price",
    description: "Unit Retail Price",
    icon: <DollarSign size={20} />,
    position: { top: '41%', left: '25%' }
  },
  
  {
    id: 15,
    title: "Quantity",
    description: "Click + or - to adjust quantity, auto adjusts with scan",
    icon: <BookPlus size={20} />,
    position: { top: '41%', left: '36%' }
  },
 
  {
    id: 16,
    title: "Total",
    description: "Item Total (Retail x Quantity",
    icon: <Calculator size={20} />,
    position: { top: '41%', left: '52%' }
  },
  
  {
    id: 17,
    title: "Delete",
    description: "Remove item from sale",
    icon: <Trash2 size={20} />,
    position: { top: '41%', left: '64%' }
  },
  
    ],
    'phone': [
      {
        id: 1,
        title: "Pocket-Sized Solution",
        description: "Complete POS functionality in a device that fits in your pocket.",
        icon: <Smartphone size={20} />,
        position: { top: '55%', left: '66%' }
      },
      {
        id: 2,
        title: "Simplified Interface",
        description: "Intuitive design with in flow navigation.",
        icon: <Zap size={20} />,
        position: { top: '40%', left: '34%' }
      },
      {
        id: 3,
        title: "Camera Scanner ",
        description: "Scan barcodes with the built in camera.",
        icon: <Users size={20} />,
        position: { top: '36%', left: '66%' }
      },
      {
        id: 4,
        title: "Tap to Pay Capable",
        hasImage: true,
        imageSrc: apple,
        description: "Take contactless payments right to your phone using Tap to Pay.",
        icon: <Cloud size={20} />,
        position: { top: '65%', left: '50%' }
      },
      {
        id: 5,
        title: "Offline Mode",
        description: "Continue processing sales even without internet connectivity.",
        icon: <Shield size={20} />,
        position: { top: '60%', left: '34%' }
      }
    ],
    'all-in-one': [
      {
        id: 1,
        title: "Contactless Reader",
        description: "Accepts NFC cards and mobile payments like Apple Pay & Google Pay.",
        icon: <Wifi size={20} />,
        position: { top: '15%', left: '49%' }
      },
      {
        id: 2,
        title: "5.5\" HD Touchscreen",
        description: "Intuitive interface for you and your customers.",
        icon: <Smartphone size={20} />,
        position: { top: '70%', left: '49%' }
      },
      {
        id: 3,
        title: "Chip Card Slot",
        description: "Securely processes EMV chip cards.",
        icon: <CreditCard size={20} />,
        position: { top: '94%', left: '49%' }
      },
      {
        id: 13,
        title: "Built-in Printer",
        description: "Fast thermal receipt printing for customer convenience.",
        icon: <Printer size={20} />,
        position: { top: '29%', left: '78%' }
      },
      {
        id: 5,
        title: "Item Details",
        description: "Description, Product Number, Unit Price of item in Cart.",
        icon: <Shield size={20} />,
        position: { top: '53%', left: '18%' }
      },
      {
        id: 6,
        title: "Barcode Scanner",
        hasVideo: true,
        videoSrc: scanSampleVideo,
        description: "Scans product barcodes with device camera.",
        icon: <Zap size={20} />,
        position: { top: '45%', left: '78%' }
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
        position: { top: '57%', left: '80%' }
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
      },
      {
        id: 12,
        title: "Sale Total",
        description: "",
        icon: <DollarSign size={20} />,
        position: { top: '45%', left: '18%' }
      },
      {
        id: 4,
        title: "Payment",
        hasVideo: true,
        videoSrc: paymentSampleVideo,
        description: [
          "Tender Sale with:",
          "Credit/Debit",
          "Cash",
          "Gift Card (COMING SOON)",
          "Simple Tender"
        ],
        icon: <DollarSign size={20} />,
        position: { top: '80%', left: '18%' }
      }
    ]
  };

  const currentDevice = deviceTypes.find(device => device.id === selectedDeviceType);
  const currentFeatures = deviceFeatures[selectedDeviceType] || [];

  // Function to get appropriate tooltip width based on content
  const getTooltipWidth = (feature) => {
    if (feature.hasImage || feature.hasVideo) {
      // For media content, use larger responsive sizing
      return 'w-80 sm:w-96 md:w-[400px] lg:w-[450px] xl:w-[500px]';
    }
    // For text-only tooltips, use medium width
    return 'w-72 sm:w-80 md:w-96';
  };

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* MOVED: Hero Section */}
        <section className="py-10 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
             Choose your POS platform
            </h1>
          </div>
        </section>

        {/* Device Type Selection Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-2">
            {deviceTypes.map((device) => (
              <button
                key={device.id}
                onClick={() => setSelectedDeviceType(device.id)}
                className={`inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[180px] justify-center ${
                  selectedDeviceType === device.id
                    ? 'bg-[#f08e80] text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="mr-3 text-xl">{device.icon}</span>
                {device.name}
              </button>
            ))}
          </div>
        </div>

        {/* The rest of your component... */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {currentDevice?.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {currentDevice?.description}
          </p>
        </div>

        {/* Diagram Section */}
        <div className="space-y-16">
          
          {/* Centered Interactive Device Image */}
          <div className="flex justify-center relative max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm w-full">
              <img 
                src={currentDevice?.imageSrc}
                alt={`${currentDevice?.name} POS System`}
                className={`w-full h-auto object-contain mx-auto ${
                  currentDevice?.id === 'desktop' ? 'max-h-[800px]' : 'max-h-[600px]'
                }`}
              />
            </div>

            {/* Interactive Feature Points - Using same style as inventory page */}
            {currentFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
                  hoveredFeature === feature.id ? 'z-30' : 'z-10'
                }`}
                style={{ top: feature.position.top, left: feature.position.left }}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="w-4 h-4 bg-[#f08e80] rounded-full transition-transform duration-300 group-hover:scale-150" />
                <div className="absolute w-8 h-8 bg-[#f08e80]/20 rounded-full -top-2 -left-2 animate-ping-slow group-hover:animate-none" />
                
                {/* Tooltip - Auto-sizing with stable positioning */}
                {hoveredFeature === feature.id && (
                  <div 
                    className={`absolute z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl ${getTooltipWidth(feature)} max-w-[90vw]`}
                    style={{
                      bottom: '150%', 
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-[#f08e80] mr-2 flex-shrink-0">{feature.icon}</div>
                      <h4 className="font-bold text-sm sm:text-base">{feature.title}</h4>
                    </div>
                    
                    {/* Video for features that have it */}
                    {feature.hasVideo && feature.videoSrc && (
                      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mb-3 rounded-md overflow-hidden bg-black">
                        <video 
                          className="w-full h-full object-contain"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={feature.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Image for features that have it */}
                    {feature.hasImage && feature.imageSrc && (
                      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mb-3 rounded-md overflow-hidden bg-gray-100">
                        <img 
                          className="w-full h-full object-contain"
                          src={feature.imageSrc} 
                          alt={feature.imageAlt || "Feature image"} 
                        />
                      </div>
                    )}
                    
                    {feature.description && (
                      <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
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
                    )}
                    
                    {/* Tooltip arrow */}
                    <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Core Features Below Image */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-xl mr-4">
                  {currentDevice?.icon}
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-800">Core Features</h2>
                  <p className="text-gray-500 mt-2 text-lg">{currentDevice?.subtitle}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentFeatures.map((feature) => (
                <div key={feature.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <div className="text-gray-600">
                        {Array.isArray(feature.description) ? (
                          <>
                            <p>{feature.description[0]}</p>
                            <ul className="list-disc list-inside mt-2 pl-2 text-sm">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started with {currentDevice?.name} POS?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the power of our {selectedDeviceType.replace('-', ' ')} solution. 
              Contact us today to learn more about pricing and implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3 text-base">
                Start Free Trial
              </Button>
              <Button variant="secondary" className="px-8 py-3 text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default POSDiagramPage;
