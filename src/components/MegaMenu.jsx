import { 
  Rocket, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  Building,
  Globe,
  Palette,
  Package,
  MapPin,
  Wrench,
  CreditCard,
  CheckCircle,
  Monitor,
  Layers,
  Store,
  Zap,
  DollarSign,
  MessageCircle,
  Mail,
  Users,
  BarChart3,
  Truck,
  Archive,
  Repeat,
  Smartphone,
  ShoppingBag,
} from 'lucide-react'

function MegaMenu({ isVisible, onMouseEnter, onMouseLeave, onNavigate }) {
  const menuData = [
    {
      title: "Back Office",
      icon: <Settings className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Admin",
          subtitle: "Manage with ease",
          icon: <Users className="h-5 w-5" />
        },
        {
          title: "Reports",
          subtitle: "Your operations, at a glance",
          icon: <BarChart3 className="h-5 w-5" />
        },
        {
          title: "Inventory",
          subtitle: "Simplified inventory management",
          icon: <Package className="h-5 w-5" />
        },
      ]
    },
    {
      title: "Sales Floor",
      icon: <Store className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "POS",
          subtitle: "Cross platform Point of Sale",
          icon: <Monitor className="h-5 w-5" />
        },
        {
          title: "Customers",
          subtitle: "Optimize the customer experience",
          icon: <Users className="h-5 w-5" />
        },
        {
          title: "On Floor Assistant",
          subtitle: "Optimize the in store experience",
          icon: <Zap className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Offsite",
      icon: <ShoppingBag className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Single Device",
          subtitle: "Full POS all in one device",
          icon: <Smartphone className="h-5 w-5" />
        },
        {
          title: "Import Items",
          subtitle: "Upload thousands of items in seconds",
          icon: <Layers className="h-5 w-5" />
        },
        {
          title: "Export Sales",
          subtitle: "Download sales data",
          icon: <BarChart3 className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Credit Cards",
      icon: <CreditCard className="h-8 w-8 text-[#f08e80]" />,
      items: [
        {
          title: "Payouts",
          subtitle: "Manually manage or automate payouts",
          icon: <DollarSign className="h-5 w-5" />
        },
        {
          title: "Terminals",
          subtitle: "Manage payment terminals",
          icon: <Monitor className="h-5 w-5" />
        },
        {
          title: "Chargebacks",
          subtitle: "Handle chargeback disputes",
          icon: <MessageCircle className="h-5 w-5" />
        }
      ]
    }
  ]

  if (!isVisible) return null

  return (
  <div 
    className="fixed top-16 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-[999] font-varela"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-4 gap-12">
        {menuData.map((column, columnIndex) => (
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
                    const pageMap = {
                      'System': 'system',
                      'InStore': 'instore',
                      'Offsite': 'offsite', 
                      'Credit Cards': 'credit-cards'
                    }
                    const sectionMap = {
                      'POS': 'pos',
                      'Admin': 'admin',
                      'Reports': 'reports',
                      'Products': 'products',
                      'Customers': 'customers',
                      'Clienteling': 'clienteling',
                      'On Floor Assistance': 'on-floor-assistance',
                      'Single Device': 'single-device',
                      'Import Items': 'import-items',
                      'Add Items': 'add-items',
                      'Export Sales': 'export-sales',
                      'Payouts': 'payouts',
                      'Terminals': 'terminals',
                      'Chargebacks': 'chargebacks',
                      'Flat Fee': 'flat-fee'
                    }
                    const page = pageMap[column.title]
                    const section = sectionMap[item.title]
                    if (page && section) {
                      onNavigate(page, section)
                    }
                  }}
                  className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-400 group-hover:text-[#f08e80] transition-colors duration-200 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium group-hover:text-[#f08e80] transition-colors duration-200 font-varela">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 font-varela">
                        {item.subtitle}
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

export default MegaMenu
