import { 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Phone,
  Mail,
  Clock,
  Users,
  BookOpen,
  Monitor,
  Map,
  TrendingUp
} from 'lucide-react'

// Button component to match your design system
const Button = ({ children, className = '', variant = 'default', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm';
  
  const variants = {
    default: 'bg-[#f08e80] hover:bg-[#e07d70] text-white',
    outline: 'border border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white bg-transparent'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

function SupportMegaMenu({ isVisible, onMouseEnter, onMouseLeave, onNavigate, onClose, onFeatureRequest }) {
  const supportData = [
    {
      title: "Get Help",
      icon: <HelpCircle className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Submit Ticket",
          subtitle: "Get personalized support",
          icon: <MessageSquare className="h-5 w-5" />,
          description: "Submit a support request and get help from our team",
          onClick: () => window.open('https://imrchnt-243943054.hs-sites-na2.com/tickets-view', '_blank')
        },
        {
          title: "Phone Support",
          subtitle: "(603)-298-5721",
          icon: <Phone className="h-5 w-5" />,
          description: "Speak directly with a support specialist"
        }
      ]
    },
    {
      title: "Documentation",
      icon: <FileText className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "User Guides",
          subtitle: "Step-by-step instructions",
          icon: <BookOpen className="h-5 w-5" />,
          description: "Comprehensive guides for all features",
          onClick: () => window.open('https://243943054.hs-sites-na2.com/', '_blank')
        },
        {
          title: "Road Map",
          subtitle: "Future development plans",
          icon: <Map className="h-5 w-5" />,
          description: "Real-time status of our services",
          onClick: () => {
            if (onNavigate) onNavigate('roadmap')
            if (onClose) onClose()
          }
        }
      ]
    },
    {
      title: "Community",
      icon: <Users className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Community Forum - COMING SOON",
          subtitle: "Connect with other users",
          icon: <Users className="h-5 w-5" />,
          description: "Ask questions and share experiences"
        },
        {
          title: "Feature Requests",
          subtitle: "Suggest improvements",
          icon: <HelpCircle className="h-5 w-5" />,
          description: "Help us improve our platform",
          onClick: () => {
            if (onClose) onClose()
            if (onFeatureRequest) onFeatureRequest()
          }
        }
      ]
    },
    {
      title: "Resources",
      icon: <Clock className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: ".SPI Converter",
          subtitle: "Convert files to .SPI",
          icon: <FileText className="h-5 w-5" />,
          description: "supports .txt and .csv",
          onClick: () => {
            if (onNavigate) onNavigate('spi-converter')
            if (onClose) onClose()
          }
        },
        {
          title: "Statement Analyzer",
          subtitle: "Analyze processing rates",
          icon: <TrendingUp className="h-5 w-5" />,
          description: "Get insights on your credit card fees",
          onClick: () => {
            if (onNavigate) onNavigate('statement-analyzer')
            if (onClose) onClose()
          }
        }
      ]
    }
  ]

  if (!isVisible) return null

  return (
    <div 
      className="fixed top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-[999]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-4 gap-8">
          {supportData.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {/* Column Header */}
              <div className="flex items-center space-x-3 mb-8">
                {column.icon}
                <h3 className="text-2xl font-extrabold text-gray-900 font-varela">
                  {column.title}
                </h3>
              </div>
              
              {/* Column Items */}
              <div className="space-y-4">
                {column.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (item.onClick) {
                        item.onClick()
                      }
                    }}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="!text-gray-400 group-hover:!text-[#f08e80] transition-colors duration-200 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="!text-gray-900 font-medium group-hover:!text-[#f08e80] transition-colors duration-200 font-varela">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 font-varela">
                          {item.subtitle}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-varela">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportMegaMenu
