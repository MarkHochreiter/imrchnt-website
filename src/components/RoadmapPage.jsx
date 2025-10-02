import { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star, 
  Zap, 
  Book,
  Users, 
  CreditCard, 
  Smartphone, 
  Monitor, 
  Shield, 
  BarChart3, 
  Package, 
  Globe, 
  Layers,
  Rocket,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Lock, 
  DollarSign,
  WifiOff,
  Receipt,
  Database,
  Network,
  Map,
  Percent,
  List,
  Handshake,
  Apple,
  Printer
} from 'lucide-react';

// Button component matching the styling from attached pages
const Button = ({ children, className = '', size = 'default', onClick, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

function RoadmapPage({ onSignupClick, onNavigate }) {
  const [currentMilestone, setCurrentMilestone] = useState(0);

  // Auto-scroll through milestones
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % roadmapData.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Statuses = planned, completed, in-progress
  
  const roadmapData = [
    {
      id: 1,
      date: "May 14, 2025",
      title: "First Live Transaction on im+",
      description: "Historic milestone: Our first successful live transaction processed through the im+ platform.",
      status: "completed",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
        "Successfully processed first customer payment",
        "Validated core payment infrastructure",
        "Confirmed system reliability and security"
      ]
    },
        {
      id: 2,
      date: "June 4, 2025",
      title: "Tap to Pay on Smartphones",
      description: "No need for a Card Reader. Process contactless payments anywhere with your smartphone.",
      status: "completed",
      icon: <Smartphone className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "iOS and Android Smartphones with NFC capability"
      ]
    },
    
    {
      id: 3,
      date: "June 17, 2025",
      title: "Offline Mode",
      description: "Take payments with or without a network connection. Download DB to device and sell offline. Store and Foreward credit card transactions.",
      status: "completed",
      icon: <WifiOff className="h-6 w-6" />,
      category: "Product",
      details: [
        "Triple Redundancy",
        "Sales in any environment"
      ]
    },
    {
      id: 4,
      date: "June 25, 2025",
      title: "Custom Receipts",
      description: "Design custom receipts with Header logo and custom copy on header and footer.",
      status: "completed",
      icon: <Receipt className="h-6 w-6" />,
      category: "Transactions",
      details: [
        "Print to S1F2",
        "Reprint from Transactions",
        "Email / SMS / Print"
      ]
    },
    {
      id: 5,
      date: "July 7, 2025",
      title: "First Beta Test Event",
      description: "Still North Books and Bar holds their first event using im+ to process sales.",
      status: "completed",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
        "First Book = Blood Wolf Moon: Poems",
        "First Author = Elise Paschen",
        "First User = H Rooker"
      ]
    },
    {
      id: 6,
      date: "July 15, 2025",
      title: "In App Chargeback management",
      description: "Get notified, dispute, submit evidence, and track each individual Chargeback from within the application.",
      status: "completed",
      icon: <Zap className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "Industry First"
      ]
    },
    {
      id: 7,
      date: "July 22, 2025",
      title: "Tips",
      description: "For stores that combine a cafe or bar into their model we have provided the option to enable tips on individual card readers.",
      status: "completed",
      icon: <DollarSign className="h-6 w-6" />,
      category: "Credit Cards",
      details: [
        "Customize options as $ or %",
        "Enable by Card Reader",
        "Customer input option"
      ]
    },
    {
      id: 8,
      date: "July 30, 2025",
      title: "Two Factor Authentication",
      description: "2FA Security for Admin an Manager security roles.",
      status: "completed",
      icon: <Lock className="h-6 w-6" />,
      category: "Security",
      details: [
        "Secures Admin / Manager Log In",
        "Secures Bank Account Add / Delete",
        "Secures Payouts"
      ]
    },
    {
      id: 9,
      date: "August 13, 2025",
      title: "Item Meta Data",
      description: "Enriching item meta data, making products easier to find in app and in store with the addition of customizable data.",
      status: "completed",
      icon: <Book className="h-6 w-6" />,
      category: "Products",
      details: [
        "Attributes",
        "Categories",
        "Variants"
      ]
    },
    {
      id: 10,
      date: "August 21, 2025",
      title: "Move DB to PostgreSQL",
      description: "As we increased the size of db's to be cabale of housing over 1 million items per store we decided that MariaDB was no longer the best soltution.",
      status: "completed",
      icon: <Database className="h-6 w-6" />,
      category: "Database",
      details: [
        "Search Results in Milliseconds",
        "Enables Vector search",
        "Open Source"
      ]
    },
    {
      id: 11,
      date: "September 12, 2025",
      title: "App on GooglePlay Store",
      description: "Our app was officially made available on the Google Play store.",
      status: "completed",
      icon: <Star className="h-6 w-6" />,
      category: "Launch",
      details: [
      ]
    },
    {
      id: 12,
      date: "Q4 2025",
      title: "App on Apple App Store",
      description: "App to be available on Apple App store by the end of the year.",
      status: "in-progress",
      icon: <Apple className="h-6 w-6" />,
      category: "Launch",
      details: [
      ]
    },
    {
      id: 13,
      date: "Q4 2025",
      title: "In store assistant",
      description: "Use your smartphone in store to assist customers. Meet the customers where they are in the store, answer inventory questions, reduce POS lines by processing the sale right there with Tap to Pay.",
      status: "in-progress",
      icon: <Rocket className="h-6 w-6" />,
      category: "In Store Experience",
      details: [
        "Industry First"
      ]
    },
    {
      id: 14,
      date: "Q4 2025",
      title: "Meta Data Integrations",
      description: "Industry specific integrations for richer item meta data from Industry vendors and publishers.",
      status: "planned",
      icon: <Handshake className="h-6 w-6" />,
      category: "Integrations",
      details: [
        "API's", 
        "File feeds", 
        "ONYX XML files"
      ]
    },
    {
      id: 15,
      date: "Q4 2025",
      title: "POS Quick Buttons",
      description: "Assign items to a grid of Buttons at POS to simply add items into sale.",
      status: "planned",
      icon: <CheckCircle className="h-6 w-6" />,
      category: "Product",
      details: [
        "Add items with one touch",
        "Simplified POS"
      ]
    },
    {
      id: 16,
      date: "Q1 2026",
      title: "Customer Orders",
      description: "Produce customer orders from the same screen as a regular transaction.",
      status: "planned",
      icon: <Users className="h-6 w-6" />,
      category: "In Store Experience",
      details: [
        "Credit Card Pre Authorization",
        "Bill the customer when the order ships",
        "Automate customer order buying"
      ]
    },
    {
      id: 17,
      date: "Q1 2026",
      title: "Automated Legacy POS Integration",
      description: "Move POS operations to imrchnt while maintaining other business operations on your legacy system .",
      status: "planned",
      icon: <Zap className="h-6 w-6" />,
      category: "Integrations",
      details: [
        "Inventory imports",
        "Sales exports",
        "Customer Order exports"
      ]
    },
    {
      id: 18,
      date: "Q2 2026",
      title: "Gift Cards",
      description: "Sell and redeem store gift cards at POS.",
      status: "planned",
      icon: <CreditCard className="h-6 w-6" />,
      category: "Integrations",
      details: [
        "Legacy Integration",
        "Givex",
        "Net New Gift Cards"
      ]
    },
    {
      id: 19,
      date: "Q2 2026",
      title: "Tax Integration",
      description: "automatically apply tax rates at pos based on event address, ship to address, or individual item type.",
      status: "planned",
      icon: <Percent className="h-6 w-6" />,
      category: "Integrations",
      details: [
      ]
    },
    {
      id: 20,
      date: "Q2 2026",
      title: "Printing",
      description: "Enable printing to local printers.",
      status: "planned",
      icon: <Printer className="h-6 w-6" />,
      category: "Product",
      details: [
        "Receipts and Cash Drawer",
        "Reports",
        "Labels"
      ]
    },
    {
      id: 21, // Includes the addition of Adyen Wallet passes and the creation of a Customer front end that could be treated like an in store or e-commerce cart
      date: "Q3 2026",
      title: "Customer Rewards",
      description: "Track customer sales, create rewards program rules, issue customer rewards as balance cards or coupons.",
      status: "planned",
      icon: <Award className="h-6 w-6" />,
      category: "In Store Experience",
      details: [
      ]
    },
    {
      id: 22,
      date: "Q3 2026", // Ties in to Customer rewards to make it easier to add customers into the app, also allows for indoor maps within the customer app
      title: "MapBox Integration",
      description: "Validate address, auto-fill, movement data, indoor maps.",
      status: "planned",
      icon: <Map className="h-6 w-6" />,
      category: "Integrations",
      details: [
      ]
    },
    {
      id: 23, // Once we have Customer Rewards in the system then we move to target marketing as we will have all customer sales data in order to make these decisions, another layer of target marketing is Pub/Man ad dollars
      date: "Q4 2026",
      title: "Target Marketing",
      description: "Individualized marketing to customers in and out of the store.", // Preauth all Sales, after sale send customer a text with a targeted add and a simple Yes/No response, if YES then tack on the new item to the sale and then process the card, if NO process the card.
      status: "planned",
      icon: <Target className="h-6 w-6" />,
      category: "In Store Experience",
      details: [
        "One Click buy through Text",
        "Add to Sale through Card Reader",
        "Highly targeted email campaigns"
      ]
    },
    {
      id: 24,
      date: "Q1 2027",
      title: "Buying",
      description: "A new buying experience that provides suggestions based on aggregated industry data and auto replenishes always in stock items",
      status: "planned",
      icon: <Layers className="h-6 w-6" />,
      category: "Product",
      details: [
      ]
    },
    {
      id: 25,
      date: "Q1 2027",
      title: "Ordering Decision Tree",
      description: "Preset what path a customer order takes based on a set of rules. Send orders to stores closest to delivery or send to 3PL vendors instantly on items ordered where inventory isn't in store",
      status: "planned",
      icon: <Network className="h-6 w-6" />,
      category: "Buying",
      details: [
        "Automate customer order buying",
        "Localized features",
        "Regional partnerships"
      ]
    },
    {
      id: 26,
      date: "Q2 2027",
      title: "Receiving",
      description: "Single scan receiving",
      status: "planned",
      icon: <Package className="h-6 w-6" />,
      category: "Product",
      details: [
        "Order tracking",
        "Plan staffing levels according to delivery dates",
        "Simplified Receiving"
      ]
    },
    {
      id: 27,
      date: "Q3 2027",
      title: "Picking",
      description: "Use a smartphone to pick customer orders, event stock, returns, stocking shelves",
      status: "planned",
      icon: <Smartphone className="h-6 w-6" />,
      category: "Integrations",
      details: [
      ]
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-[#f08e80]';
      case 'planned':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-white" />;
      case 'planned':
        return <Calendar className="h-4 w-4 text-white" />;
      default:
        return <Calendar className="h-4 w-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              The Future is Bright!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              We aren't just saying that. We are delivering it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Celebrate our milestones and see our future goals.
            </h2>
          </div>

          {/* Featured Current Milestone */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#f08e80]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`${getStatusColor(roadmapData[currentMilestone].status)} rounded-full p-3 mr-4`}>
                    {roadmapData[currentMilestone].icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#f08e80] mb-1">
                      {roadmapData[currentMilestone].category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {roadmapData[currentMilestone].title}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {roadmapData[currentMilestone].date}
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(roadmapData[currentMilestone].status)} text-white`}>
                    {getStatusIcon(roadmapData[currentMilestone].status)}
                    <span className="ml-1 capitalize">{roadmapData[currentMilestone].status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {roadmapData[currentMilestone].description}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {roadmapData[currentMilestone].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-[#f08e80] mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {roadmapData.map((milestone, index) => (
                <div 
                  key={milestone.id} 
                  className={`relative flex items-start transition-all duration-500 ${
                    index === currentMilestone ? 'scale-105' : 'scale-100'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(milestone.status)} shadow-lg`}>
                    {milestone.icon}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-8 flex-1 bg-white rounded-lg shadow-md p-6 transition-all duration-500 ${
                    index === currentMilestone ? 'ring-2 ring-[#f08e80] shadow-xl' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-[#f08e80] bg-[#f08e80]/10 px-2 py-1 rounded">
                          {milestone.category}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">
                          {milestone.date}
                        </span>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)} text-white`}>
                        {getStatusIcon(milestone.status)}
                        <span className="ml-1 capitalize">{milestone.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {milestone.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-2">
                      {milestone.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-[#f08e80] mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Be Part of the Future
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Button 
                size="lg" 
                className="bg-[#f08e80] hover:bg-violet-400 text-white"
                onClick={onSignupClick}
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoadmapPage;
