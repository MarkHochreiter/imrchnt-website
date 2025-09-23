import { 
  CreditCard, 
  Monitor, 
  Printer, 
  DollarSign,
  Package,
  Scan,
  ShoppingCart,
  Tag,
  Receipt,
  Coins
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function HardwareMegaMenu({ isVisible, onMouseEnter, onMouseLeave, onNavigate }) {
  const hardwareData = [
    {
      title: "Card Readers",
      icon: <CreditCard className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "S1f2",
          subtitle: "All-in-one Android device with printing power",
          icon: <CreditCard className="h-5 w-5" />,
          page: "s1f2"
        },
        {
          title: "Ams1",
          subtitle: "All-in-one terminal running on Android",
          icon: <CreditCard className="h-5 w-5" />,
          page: "ams1"
        },
        {
          title: "Sfo1",
          subtitle: "Payment, branding, and customer engagement — all in one terminal",
          icon: <CreditCard className="h-5 w-5" />,
          page: "sfo1"
        }
      ]
    },
    {
  title: "Printers & Accessories",
  icon: <Printer className="h-8 w-8 text-[#f08e80]" />,
  items: [
    {
      title: "Receipt Printer",
      subtitle: (
        <>
          Epson TM-T88V <br /> Industry leading thermal printer
        </>
      ),
      icon: <Receipt className="h-5 w-5" />,
      page: "epson-t88"
    },
        {
          title: "Label Printer",
          subtitle: (
             <>
               Honeywell PC43d <br /> Desktop thermal label printer
             </>
            ),
          icon: <Tag className="h-5 w-5" />,
          page: "honeywell-pc43d"
        }
      ]
    },
    {
      title: "Cash Management",
      icon: <DollarSign className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Cash Drawer",
          subtitle: "APG Cash Drawer",
          icon: <Coins className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Scanners",
      icon: <Scan className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Socket Scan",
          subtitle: "Barcode scanning solution",
          icon: <Scan className="h-5 w-5" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {hardwareData.map((column, columnIndex) => (
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
                  <div
                    key={itemIndex}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      if (item.page) {
                        onNavigate(item.page)
                      }
                    }}
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
                        {item.price && (
                          <p className="text-sm font-medium text-[#f08e80] mt-1">
                            {item.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need help choosing the right hardware?
          </h3>
          <p className="text-gray-600 mb-4">
            Our experts can help you find the perfect solution for your business.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-[#f08e80] hover:bg-[#e07d70] text-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              View All Hardware
            </Button>
            <Button variant="outline" className="border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HardwareMegaMenu
