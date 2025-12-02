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
          subtitle: "Payment, branding, and customer engagement",
          icon: <CreditCard className="h-5 w-5" />,
          page: "sfo1"
        }
      ]
    },
    {
  title: "Printers",
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
          subtitle: (
            <>
              APG VB320-1-BL1616 <br /> Standard-duty cash drawer
            </>
          ),
          icon: <Coins className="h-5 w-5" />,
          page: "apg-cash-drawer"
        }
      ]
    },
    {
      title: "Scanners",
      icon: <Scan className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "SocketScan S720",
          subtitle: (
            <>
              Entry-Level Scanner <br /> Bluetooth barcode scanner
            </>
          ),
          icon: <Scan className="h-5 w-5" />,
          page: "socket-scan-s720"
        },
        {
          title: "SocketScan S840",
          subtitle: (
            <>
              Professional Scanner <br /> High-volume Bluetooth scanner
            </>
          ),
          icon: <Scan className="h-5 w-5" />,
          page: "socket-scan-s840"
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
          {hardwareData.map((column, columnIndex) => (
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
      </div>
    </div>
  )
}

export default HardwareMegaMenu
