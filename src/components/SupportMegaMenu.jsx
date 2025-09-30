import React, { useState } from 'react'
import { HelpCircle, FileText, Users, ExternalLink } from 'lucide-react'

// Button component to match your design system
const Button = ({ children, className = '', variant = 'default', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm';
  
  const variants = {
    default: 'bg-[#f08e80] hover:bg-[#e07d70] text-white',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
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

const SupportMegaMenu = ({ onNavigate, onMouseEnter, onMouseLeave }) => {
  const [hoveredItem, setHoveredItem] = useState(null)

  const supportData = [
    {
      title: "Get Help",
      icon: <HelpCircle className="h-6 w-6 text-[#f08e80]" />,
      items: [
        {
          title: "Contact Support",
          subtitle: "Get help from our team",
          description: "24/7 support available",
          icon: <HelpCircle className="h-5 w-5" />,
          onClick: () => console.log('Contact Support clicked')
        },
        {
          title: "Live Chat",
          subtitle: "Chat with support",
          description: "Instant help available",
          icon: <HelpCircle className="h-5 w-5" />,
          onClick: () => console.log('Live Chat clicked')
        }
      ]
    },
    {
      title: "Documentation",
      icon: <FileText className="h-6 w-6 text-[#f08e80]" />,
      items: [
        {
          title: "API Docs",
          subtitle: "Developer resources",
          description: "Complete API reference",
          icon: <FileText className="h-5 w-5" />,
          onClick: () => console.log('API Docs clicked')
        },
        {
          title: "User Guide",
          subtitle: "How to use our platform",
          description: "Step-by-step tutorials",
          icon: <FileText className="h-5 w-5" />,
          onClick: () => console.log('User Guide clicked')
        }
      ]
    },
    {
      title: "Community",
      icon: <Users className="h-6 w-6 text-[#f08e80]" />,
      items: [
        {
          title: "Forum",
          subtitle: "Community discussions",
          description: "Connect with other users",
          icon: <Users className="h-5 w-5" />,
          onClick: () => console.log('Forum clicked')
        },
        {
          title: "Discord",
          subtitle: "Real-time chat",
          description: "Join our Discord server",
          icon: <Users className="h-5 w-5" />,
          onClick: () => console.log('Discord clicked')
        }
      ]
    },
    {
      title: "Resources",
      icon: <ExternalLink className="h-6 w-6 text-[#f08e80]" />,
      items: [
        {
          title: "Blog",
          subtitle: "Latest updates",
          description: "News and insights",
          icon: <ExternalLink className="h-5 w-5" />,
          onClick: () => console.log('Blog clicked')
        },
        {
          title: "Status Page",
          subtitle: "System status",
          description: "Check service health",
          icon: <ExternalLink className="h-5 w-5" />,
          onClick: () => console.log('Status Page clicked')
        }
      ]
    }
  ]

  const getItemKey = (columnIndex, itemIndex) => `${columnIndex}-${itemIndex}`

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
                {column.items.map((item, itemIndex) => {
                  const itemKey = getItemKey(columnIndex, itemIndex)
                  const isHovered = hoveredItem === itemKey
                  
                  return (
                    <a
                      key={itemIndex}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (item.onClick) {
                          item.onClick()
                        }
                      }}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredItem(itemKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex items-start space-x-3">
                        <div 
                          className={`transition-colors duration-200 mt-1 ${
                            isHovered ? 'text-[#f08e80]' : 'text-gray-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div 
                            className={`font-medium transition-colors duration-200 font-varela ${
                              isHovered ? 'text-[#f08e80]' : 'text-gray-900'
                            }`}
                          >
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
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportMegaMenu
