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
  Map
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function SupportMegaMenu({ isVisible, onMouseEnter, onMouseLeave, onNavigate, onClose }) {
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
          onClick: () => window.open('https://imerchant.happyfox.com/tickets', '_blank')
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
          title: "User Guides", // LINK TO HAPPY FOX https://imerchant.happyfox.com/tickets
          subtitle: "Step-by-step instructions",
          icon: <BookOpen className="h-5 w-5" />,
          description: "Comprehensive guides for all features",
          onClick: () => window.open('https://imrchnt.screenstepslive.com/s/17626/a/1988030-welcome-to-im', '_blank')
        },
        {
          title: "Video Tutorials - COMING SOON", // LINK TO YOUTUBE OR NEW PAGE WITH VIDEOS
          subtitle: "Visual learning resources",
          icon: <Monitor className="h-5 w-5" />,
          description: "Watch and learn at your own pace"
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
          description: "Help us improve our platform"
          onClick: () => window.open('https://imrchnt.screenstepslive.com/s/17626/a/1988030-welcome-to-im', '_blank')
        }
      ]
    },
    {
      title: "Resources",
      icon: <Clock className="h-8 w-8 text-[#f08e80]" />,
      items: [
                {
          title: "Release Notes - COMING SOON",
          subtitle: "Latest updates and features",
          icon: <FileText className="h-5 w-5" />,
          description: "Stay informed about new releases"
        },
        {
          title: "Road Map",
          subtitle: "Future development plans",
          icon: <Map className="h-5 w-5" />,
          description: "Real-time status of our services",
          onClick: () => {onNavigate('roadmap')}
        },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {supportData.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {/* Column Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                {column.icon}
                <h3 className="text-lg font-semibold text-gray-900">
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
                      if (onClose) {
                        onClose() 
                      }
                    }}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-gray-400 group-hover:text-[#f08e80] transition-colors duration-200 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-[#f08e80] transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.subtitle}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need immediate assistance?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you succeed with our platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
            <Button variant="outline" className="border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportMegaMenu

