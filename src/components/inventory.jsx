import { 
    ArrowLeft, BarChart3, Barcode, Battery, Book, Bookmark, BookPlus, Calculator, Cloud,
    CreditCard, DollarSign, Eraser, Flag, Grid, Home, Layers, List, Monitor, Package,
    Percent, PlusCircle, Printer, Scan, Search, Shield, Shredder, Smartphone, Tablet, Tag,
    Trash2, Users, Wallet, Wifi, Zap
} from 'lucide-react';
import { useState } from 'react';
import products from '../assets/products.png';
import details from '../assets/details.png';
import filter from '../assets/filter.png';
import search from '../assets/prod_search.mp4';
import categories from '../assets/categories.png';
import category_detail from '../assets/category_details.png';
import attributes from '../assets/attributes.png';
import add_attribute from '../assets/add_attribute.png';
import attribute_detail from '../assets/attribute_detail.png';

// Reusable Button component
const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm';
  const variants = {
    primary: 'bg-[#f08e80] text-white hover:bg-[#e07d70]',
    secondary: 'bg-white text-[#f08e80] border border-[#f08e80] hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Main Inventory Page
function InventoryPage({ onNavigateBack }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState('products');

  const deviceTypes = [
    { id: 'products', name: 'Inventory', icon: <BookPlus className="h-5 w-5" />, title: 'Fastest search in the industry', subtitle: 'Quickly find any item across your organizations inventories.', description: 'Find a needle in a haystack in milliseconds', imageSrc: products },
    { id: 'details', name: 'Details', icon: <List className="h-5 w-5" />, title: 'Item Details', subtitle: 'Complete product insights, all in one place.', description: 'See all variants, assign categories and attributes for simpler lookup and instore navigation', imageSrc: details },
    { id: 'categories', name: 'Categories', icon: <Tag className="h-5 w-5" />, title: 'Organize your inventory like never before', subtitle: 'Tag items.', description: 'Enhance your data by categorizing products with tags, enabling powerful filtering for analytics, precise marketing campaigns, and improved in-store performance.', imageSrc: categories },
    { id: 'attributes', name: 'Attributes', icon: <Layers className="h-5 w-5" />, title: 'Industry specific and customizable item attributes', subtitle: 'Add detail.', description: 'Gain insight into what makes every individual item unique.', imageSrc: attributes }
  ];

  const deviceFeatures = {
    products: [
      { id: 1, title: "Search", hasVideo: true, videoSrc: search, description: "Blazing fast lookup", icon: <Search size={20} />, position: { top: '21%', left: '19%' } },
      { id: 2, title: "Add Product", description: "Add Products manually or with an import", icon: <BookPlus size={20} />, position: { top: '21%', left: '81%' } },
      { id: 3, title: "Filters", hasImage: true, imageSrc: filter, description: "Filter your lookup to find that needle in the haystack", icon: <Layers size={20} />, position: { top: '21%', left: '53%' } },
      { id: 4, title: "Product code", description: "ISBN / UPC parent level product number", icon: <Barcode size={20} />, position: { top: '60%', left: '53%' } },
      { id: 5, title: "SKU", description: "Stock keeping unit - makes a variant of an item unique", icon: <Scan size={20} />, position: { top: '60%', left: '43%' } },
      { id: 6, title: "Product Name", description: "", icon: <Bookmark size={20} />, position: { top: '60%', left: '28%' } },
      { id: 7, title: "Total Quantity", description: "Stock level of the item across your organization", icon: <Calculator size={20} />, position: { top: '60%', left: '66%' } }
    ],
    details: [
      { id: 1, title: "Edit / Delete", description: "Anywhere you see these icons you can edit or delete that item", icon: <Eraser size={20} />, position: { top: '20%', left: '96%' } },
      { id: 2, title: "Attributes", description: "Assign unique attributes to the item", icon: <List size={20} />, position: { top: '55%', left: '96%' } },
      { id: 3, title: "Product arrangement", description: "View where the variants of the item are located across your organization", icon: <Home size={20} />, position: { top: '83%', left: '96%' } },
      { id: 4, title: "General information", description: "Product level information", icon: <Search size={20} />, position: { top: '20%', left: '36%' } },
      { id: 5, title: "Product Categories", description: "Tag products into groups", icon: <Tag size={20} />, position: { top: '45%', left: '36%' } }
    ],
    categories: [
      { id: 1, title: "Tree View", description: "Enable Tree View to view the Parent/Child relationship of your categories and sub categories.", icon: <Search size={20} />, position: { top: '21%', left: '19%' } },
      { id: 2, title: "Add Category", description: "Add custom categories to assign to groups of products.", icon: <PlusCircle size={20} />, position: { top: '21%', left: '81%' } },
      { id: 3, title: "Customize Categories", hasImage: true, imageSrc: category_detail, description: "Assign sub categories and attributes to parent categories.", icon: <Flag size={20} />, position: { top: '40%', left: '50%' } }
    ],
    attributes: [
      { id: 1, title: "Search", description: "Find attributes quickly", icon: <Search size={20} />, position: { top: '21%', left: '19%' } },
      { id: 2, title: "Add attribute", hasImage: true, imageSrc: add_attribute, description: "Add attributes manually, choose attribute type", icon: <PlusCircle size={20} />, position: { top: '21%', left: '81%' } },
      { id: 3, title: "Product Name", description: "", icon: <Bookmark size={20} />, position: { top: '59%', left: '32%' } },
      { id: 4, title: "Attribute Options", hasImage: true, imageSrc: attribute_detail, description: "Build out attribute options", icon: <Layers size={20} />, position: { top: '59%', left: '80%' } }
    ]
  };

  const currentDevice = deviceTypes.find(d => d.id === selectedDeviceType);
  const currentFeatures = deviceFeatures[selectedDeviceType] || [];

  // Function to get appropriate tooltip width based on content
  const getTooltipWidth = (feature) => {
    if (feature.hasImage || feature.hasVideo) {
      // For media content, use larger responsive sizing
      return 'w-80 sm:w-96 md:w-[400px] lg:w-[450px] xl:w-[500px]';
    }
    // For text-only tooltips, use smaller width
    return 'w-64 sm:w-72';
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <section className="py-10 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Inventory control center</h1>
        </section>

        {/* Device Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-2">
            {deviceTypes.map(device => (
              <button
                key={device.id}
                onClick={() => setSelectedDeviceType(device.id)}
                className={`inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[180px] justify-center ${
                  selectedDeviceType === device.id ? 'bg-[#f08e80] text-white shadow-lg transform scale-105' : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="mr-3 text-xl">{device.icon}</span>{device.name}
              </button>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{currentDevice?.title}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{currentDevice?.description}</p>
        </div>

        {/* Device Diagram & Features */}
        <div className="space-y-16">
          <div className="flex justify-center relative max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm w-full">
              <img src={currentDevice?.imageSrc} alt={currentDevice?.name} className="w-full h-auto object-contain mx-auto max-h-[600px]" />
            </div>

            {/* Feature points */}
            {currentFeatures.map(feature => (
              <div
                key={feature.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${hoveredFeature === feature.id ? 'z-30' : 'z-10'}`}
                style={{ top: feature.position.top, left: feature.position.left }}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="w-4 h-4 bg-[#f08e80] rounded-full transition-transform duration-300 group-hover:scale-150" />
                <div className="absolute w-8 h-8 bg-[#f08e80]/20 rounded-full -top-2 -left-2 animate-ping-slow group-hover:animate-none" />

                {/* Tooltip - Fixed positioning, auto-sizing */}
                {hoveredFeature === feature.id && (
                  <div 
                    className={`absolute z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl ${getTooltipWidth(feature)} max-w-[90vw]`} 
                    style={{ 
                      bottom: '150%', 
                      left: '50%', 
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-[#f08e80] mr-2 flex-shrink-0">{feature.icon}</div>
                      <h4 className="font-bold text-sm sm:text-base">{feature.title}</h4>
                    </div>
                    
                    {feature.hasVideo && feature.videoSrc && (
                      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mb-3 rounded-md overflow-hidden">
                        <video 
                          className="w-full h-full object-cover" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                        >
                          <source src={feature.videoSrc} type="video/mp4" />
                        </video>
                      </div>
                    )}
                    
                    {feature.hasImage && feature.imageSrc && (
                      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mb-3 rounded-md overflow-hidden">
                        <img 
                          src={feature.imageSrc} 
                          alt={feature.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {feature.description && (
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                    
                    {/* Tooltip arrow */}
                    <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Core Features Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-xl mr-4">{currentDevice?.icon}</div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-800">Core Features</h2>
                  <p className="text-gray-500 mt-2 text-lg">{currentDevice?.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentFeatures.map(feature => (
                  <div key={feature.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#f08e80]/10 text-[#f08e80] rounded-lg">{feature.icon}</div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InventoryPage;
