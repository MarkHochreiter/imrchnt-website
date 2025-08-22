import { ArrowLeft, Wifi, CreditCard, Smartphone, Zap, Shield, Printer, Trash2, PlusCircle, Search, Grid, Home, DollarSign, Monitor, Tablet, Layers, Battery, Cloud, Users, BarChart3, Package } from 'lucide-react';
import { useState } from 'react';
import s1f2POS from '../assets/s1f2_pos.png';
import scanSampleVideo from '../assets/scan_sample.mp4';
import paymentSampleVideo from '../assets/payment_sample.mp4';
import desktopPOS from '../assets/desktop_sample.png';

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
  const [selectedDeviceType, setSelectedDeviceType] = useState('all-in-one');

  // Device type configurations
  const deviceTypes = [
    {
      id: 'desktop',
      name: 'Desktop',
      icon: <Monitor className="h-5 w-5" />,
      title: 'Desktop POS System',
      subtitle: 'Full-featured desktop solution for comprehensive retail management',
      description: 'Our desktop POS system provides the most comprehensive feature set with large display support, advanced reporting capabilities, and seamless integration with all your business peripherals.',
      imageSrc: desktopPOS
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: <Tablet className="h-5 w-5" />,
      title: 'Tablet POS Solution',
      subtitle: 'Portable and flexible point-of-sale for modern retail environments',
      description: 'Perfect for businesses that need mobility without sacrificing functionality. Our tablet POS solution offers touch-optimized interface and wireless connectivity for ultimate flexibility.',
      imageSrc: s1f2POS // You can replace with tablet-specific image
    },
    {
      id: 'phone',
      name: 'Phone',
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Mobile POS System',
      subtitle: 'Pocket-sized point-of-sale for ultimate mobility and convenience',
      description: 'Transform any smartphone into a powerful POS system. Perfect for pop-up shops, delivery services, and businesses that need to process payments anywhere.',
      imageSrc: s1f2POS // You can replace with phone-specific image
    },
    {
      id: 'all-in-one',
      name: 'All-in-one',
      icon: <Layers className="h-5 w-5" />,
      title: 'All-in-one Anatomy',
      subtitle: 'Complete integrated payment solution with everything you need',
      description: 'An interactive look at the key components of our all-in-one payment solution. Hover over the points on the device to learn more.',
      imageSrc: s1f2POS // Current s1f2POS image
    }
  ];

  // Features for different device types
  const deviceFeatures = {
    'desktop': [
  {
    id: 1,
    title: "top 0 left 0",
    description: "Position marker at 0% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '0%' }
  },
  {
    id: 2,
    title: "top 0 left 5",
    description: "Position marker at 0% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '5%' }
  },
  {
    id: 3,
    title: "top 0 left 10",
    description: "Position marker at 0% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '10%' }
  },
  {
    id: 4,
    title: "top 0 left 15",
    description: "Position marker at 0% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '15%' }
  },
  {
    id: 5,
    title: "top 0 left 20",
    description: "Position marker at 0% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '20%' }
  },
  {
    id: 6,
    title: "top 0 left 25",
    description: "Position marker at 0% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '25%' }
  },
  {
    id: 7,
    title: "top 0 left 30",
    description: "Position marker at 0% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '30%' }
  },
  {
    id: 8,
    title: "top 0 left 35",
    description: "Position marker at 0% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '35%' }
  },
  {
    id: 9,
    title: "top 0 left 40",
    description: "Position marker at 0% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '40%' }
  },
  {
    id: 10,
    title: "top 0 left 45",
    description: "Position marker at 0% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '45%' }
  },
  {
    id: 11,
    title: "top 0 left 50",
    description: "Position marker at 0% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '50%' }
  },
  {
    id: 12,
    title: "top 0 left 55",
    description: "Position marker at 0% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '55%' }
  },
  {
    id: 13,
    title: "top 0 left 60",
    description: "Position marker at 0% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '60%' }
  },
  {
    id: 14,
    title: "top 0 left 65",
    description: "Position marker at 0% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '65%' }
  },
  {
    id: 15,
    title: "top 0 left 70",
    description: "Position marker at 0% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '70%' }
  },
  {
    id: 16,
    title: "top 0 left 75",
    description: "Position marker at 0% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '75%' }
  },
  {
    id: 17,
    title: "top 0 left 80",
    description: "Position marker at 0% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '80%' }
  },
  {
    id: 18,
    title: "top 0 left 85",
    description: "Position marker at 0% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '85%' }
  },
  {
    id: 19,
    title: "top 0 left 90",
    description: "Position marker at 0% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '90%' }
  },
  {
    id: 20,
    title: "top 0 left 95",
    description: "Position marker at 0% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '95%' }
  },
  {
    id: 21,
    title: "top 0 left 100",
    description: "Position marker at 0% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '0%', left: '100%' }
  },
  {
    id: 22,
    title: "top 5 left 0",
    description: "Position marker at 5% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '0%' }
  },
  {
    id: 23,
    title: "top 5 left 5",
    description: "Position marker at 5% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '5%' }
  },
  {
    id: 24,
    title: "top 5 left 10",
    description: "Position marker at 5% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '10%' }
  },
  {
    id: 25,
    title: "top 5 left 15",
    description: "Position marker at 5% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '15%' }
  },
  {
    id: 26,
    title: "top 5 left 20",
    description: "Position marker at 5% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '20%' }
  },
  {
    id: 27,
    title: "top 5 left 25",
    description: "Position marker at 5% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '25%' }
  },
  {
    id: 28,
    title: "top 5 left 30",
    description: "Position marker at 5% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '30%' }
  },
  {
    id: 29,
    title: "top 5 left 35",
    description: "Position marker at 5% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '35%' }
  },
  {
    id: 30,
    title: "top 5 left 40",
    description: "Position marker at 5% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '40%' }
  },
  {
    id: 31,
    title: "top 5 left 45",
    description: "Position marker at 5% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '45%' }
  },
  {
    id: 32,
    title: "top 5 left 50",
    description: "Position marker at 5% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '50%' }
  },
  {
    id: 33,
    title: "top 5 left 55",
    description: "Position marker at 5% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '55%' }
  },
  {
    id: 34,
    title: "top 5 left 60",
    description: "Position marker at 5% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '60%' }
  },
  {
    id: 35,
    title: "top 5 left 65",
    description: "Position marker at 5% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '65%' }
  },
  {
    id: 36,
    title: "top 5 left 70",
    description: "Position marker at 5% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '70%' }
  },
  {
    id: 37,
    title: "top 5 left 75",
    description: "Position marker at 5% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '75%' }
  },
  {
    id: 38,
    title: "top 5 left 80",
    description: "Position marker at 5% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '80%' }
  },
  {
    id: 39,
    title: "top 5 left 85",
    description: "Position marker at 5% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '85%' }
  },
  {
    id: 40,
    title: "top 5 left 90",
    description: "Position marker at 5% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '90%' }
  },
  {
    id: 41,
    title: "top 5 left 95",
    description: "Position marker at 5% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '95%' }
  },
  {
    id: 42,
    title: "top 5 left 100",
    description: "Position marker at 5% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '5%', left: '100%' }
  },
  {
    id: 43,
    title: "top 10 left 0",
    description: "Position marker at 10% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '0%' }
  },
  {
    id: 44,
    title: "top 10 left 5",
    description: "Position marker at 10% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '5%' }
  },
  {
    id: 45,
    title: "top 10 left 10",
    description: "Position marker at 10% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '10%' }
  },
  {
    id: 46,
    title: "top 10 left 15",
    description: "Position marker at 10% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '15%' }
  },
  {
    id: 47,
    title: "top 10 left 20",
    description: "Position marker at 10% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '20%' }
  },
  {
    id: 48,
    title: "top 10 left 25",
    description: "Position marker at 10% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '25%' }
  },
  {
    id: 49,
    title: "top 10 left 30",
    description: "Position marker at 10% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '30%' }
  },
  {
    id: 50,
    title: "top 10 left 35",
    description: "Position marker at 10% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '35%' }
  },
  {
    id: 51,
    title: "top 10 left 40",
    description: "Position marker at 10% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '40%' }
  },
  {
    id: 52,
    title: "top 10 left 45",
    description: "Position marker at 10% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '45%' }
  },
  {
    id: 53,
    title: "top 10 left 50",
    description: "Position marker at 10% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '50%' }
  },
  {
    id: 54,
    title: "top 10 left 55",
    description: "Position marker at 10% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '55%' }
  },
  {
    id: 55,
    title: "top 10 left 60",
    description: "Position marker at 10% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '60%' }
  },
  {
    id: 56,
    title: "top 10 left 65",
    description: "Position marker at 10% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '65%' }
  },
  {
    id: 57,
    title: "top 10 left 70",
    description: "Position marker at 10% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '70%' }
  },
  {
    id: 58,
    title: "top 10 left 75",
    description: "Position marker at 10% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '75%' }
  },
  {
    id: 59,
    title: "top 10 left 80",
    description: "Position marker at 10% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '80%' }
  },
  {
    id: 60,
    title: "top 10 left 85",
    description: "Position marker at 10% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '85%' }
  },
  {
    id: 61,
    title: "top 10 left 90",
    description: "Position marker at 10% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '90%' }
  },
  {
    id: 62,
    title: "top 10 left 95",
    description: "Position marker at 10% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '95%' }
  },
  {
    id: 63,
    title: "top 10 left 100",
    description: "Position marker at 10% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '10%', left: '100%' }
  },
  {
    id: 64,
    title: "top 15 left 0",
    description: "Position marker at 15% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '0%' }
  },
  {
    id: 65,
    title: "top 15 left 5",
    description: "Position marker at 15% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '5%' }
  },
  {
    id: 66,
    title: "top 15 left 10",
    description: "Position marker at 15% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '10%' }
  },
  {
    id: 67,
    title: "top 15 left 15",
    description: "Position marker at 15% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '15%' }
  },
  {
    id: 68,
    title: "top 15 left 20",
    description: "Position marker at 15% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '20%' }
  },
  {
    id: 69,
    title: "top 15 left 25",
    description: "Position marker at 15% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '25%' }
  },
  {
    id: 70,
    title: "top 15 left 30",
    description: "Position marker at 15% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '30%' }
  },
  {
    id: 71,
    title: "top 15 left 35",
    description: "Position marker at 15% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '35%' }
  },
  {
    id: 72,
    title: "top 15 left 40",
    description: "Position marker at 15% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '40%' }
  },
  {
    id: 73,
    title: "top 15 left 45",
    description: "Position marker at 15% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '45%' }
  },
  {
    id: 74,
    title: "top 15 left 50",
    description: "Position marker at 15% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '50%' }
  },
  {
    id: 75,
    title: "top 15 left 55",
    description: "Position marker at 15% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '55%' }
  },
  {
    id: 76,
    title: "top 15 left 60",
    description: "Position marker at 15% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '60%' }
  },
  {
    id: 77,
    title: "top 15 left 65",
    description: "Position marker at 15% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '65%' }
  },
  {
    id: 78,
    title: "top 15 left 70",
    description: "Position marker at 15% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '70%' }
  },
  {
    id: 79,
    title: "top 15 left 75",
    description: "Position marker at 15% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '75%' }
  },
  {
    id: 80,
    title: "top 15 left 80",
    description: "Position marker at 15% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '80%' }
  },
  {
    id: 81,
    title: "top 15 left 85",
    description: "Position marker at 15% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '85%' }
  },
  {
    id: 82,
    title: "top 15 left 90",
    description: "Position marker at 15% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '90%' }
  },
  {
    id: 83,
    title: "top 15 left 95",
    description: "Position marker at 15% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '95%' }
  },
  {
    id: 84,
    title: "top 15 left 100",
    description: "Position marker at 15% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '15%', left: '100%' }
  },
  {
    id: 85,
    title: "top 20 left 0",
    description: "Position marker at 20% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '0%' }
  },
  {
    id: 86,
    title: "top 20 left 5",
    description: "Position marker at 20% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '5%' }
  },
  {
    id: 87,
    title: "top 20 left 10",
    description: "Position marker at 20% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '10%' }
  },
  {
    id: 88,
    title: "top 20 left 15",
    description: "Position marker at 20% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '15%' }
  },
  {
    id: 89,
    title: "top 20 left 20",
    description: "Position marker at 20% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '20%' }
  },
  {
    id: 90,
    title: "top 20 left 25",
    description: "Position marker at 20% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '25%' }
  },
  {
    id: 91,
    title: "top 20 left 30",
    description: "Position marker at 20% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '30%' }
  },
  {
    id: 92,
    title: "top 20 left 35",
    description: "Position marker at 20% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '35%' }
  },
  {
    id: 93,
    title: "top 20 left 40",
    description: "Position marker at 20% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '40%' }
  },
  {
    id: 94,
    title: "top 20 left 45",
    description: "Position marker at 20% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '45%' }
  },
  {
    id: 95,
    title: "top 20 left 50",
    description: "Position marker at 20% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '50%' }
  },
  {
    id: 96,
    title: "top 20 left 55",
    description: "Position marker at 20% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '55%' }
  },
  {
    id: 97,
    title: "top 20 left 60",
    description: "Position marker at 20% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '60%' }
  },
  {
    id: 98,
    title: "top 20 left 65",
    description: "Position marker at 20% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '65%' }
  },
  {
    id: 99,
    title: "top 20 left 70",
    description: "Position marker at 20% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '70%' }
  },
  {
    id: 100,
    title: "top 20 left 75",
    description: "Position marker at 20% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '75%' }
  },
  {
    id: 101,
    title: "top 20 left 80",
    description: "Position marker at 20% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '80%' }
  },
  {
    id: 102,
    title: "top 20 left 85",
    description: "Position marker at 20% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '85%' }
  },
  {
    id: 103,
    title: "top 20 left 90",
    description: "Position marker at 20% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '90%' }
  },
  {
    id: 104,
    title: "top 20 left 95",
    description: "Position marker at 20% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '95%' }
  },
  {
    id: 105,
    title: "top 20 left 100",
    description: "Position marker at 20% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '20%', left: '100%' }
  },
  {
    id: 106,
    title: "top 25 left 0",
    description: "Position marker at 25% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '0%' }
  },
  {
    id: 107,
    title: "top 25 left 5",
    description: "Position marker at 25% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '5%' }
  },
  {
    id: 108,
    title: "top 25 left 10",
    description: "Position marker at 25% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '10%' }
  },
  {
    id: 109,
    title: "top 25 left 15",
    description: "Position marker at 25% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '15%' }
  },
  {
    id: 110,
    title: "top 25 left 20",
    description: "Position marker at 25% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '20%' }
  },
  {
    id: 111,
    title: "top 25 left 25",
    description: "Position marker at 25% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '25%' }
  },
  {
    id: 112,
    title: "top 25 left 30",
    description: "Position marker at 25% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '30%' }
  },
  {
    id: 113,
    title: "top 25 left 35",
    description: "Position marker at 25% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '35%' }
  },
  {
    id: 114,
    title: "top 25 left 40",
    description: "Position marker at 25% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '40%' }
  },
  {
    id: 115,
    title: "top 25 left 45",
    description: "Position marker at 25% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '45%' }
  },
  {
    id: 116,
    title: "top 25 left 50",
    description: "Position marker at 25% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '50%' }
  },
  {
    id: 117,
    title: "top 25 left 55",
    description: "Position marker at 25% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '55%' }
  },
  {
    id: 118,
    title: "top 25 left 60",
    description: "Position marker at 25% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '60%' }
  },
  {
    id: 119,
    title: "top 25 left 65",
    description: "Position marker at 25% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '65%' }
  },
  {
    id: 120,
    title: "top 25 left 70",
    description: "Position marker at 25% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '70%' }
  },
  {
    id: 121,
    title: "top 25 left 75",
    description: "Position marker at 25% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '75%' }
  },
  {
    id: 122,
    title: "top 25 left 80",
    description: "Position marker at 25% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '80%' }
  },
  {
    id: 123,
    title: "top 25 left 85",
    description: "Position marker at 25% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '85%' }
  },
  {
    id: 124,
    title: "top 25 left 90",
    description: "Position marker at 25% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '90%' }
  },
  {
    id: 125,
    title: "top 25 left 95",
    description: "Position marker at 25% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '95%' }
  },
  {
    id: 126,
    title: "top 25 left 100",
    description: "Position marker at 25% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '25%', left: '100%' }
  },
  {
    id: 127,
    title: "top 30 left 0",
    description: "Position marker at 30% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '0%' }
  },
  {
    id: 128,
    title: "top 30 left 5",
    description: "Position marker at 30% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '5%' }
  },
  {
    id: 129,
    title: "top 30 left 10",
    description: "Position marker at 30% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '10%' }
  },
  {
    id: 130,
    title: "top 30 left 15",
    description: "Position marker at 30% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '15%' }
  },
  {
    id: 131,
    title: "top 30 left 20",
    description: "Position marker at 30% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '20%' }
  },
  {
    id: 132,
    title: "top 30 left 25",
    description: "Position marker at 30% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '25%' }
  },
  {
    id: 133,
    title: "top 30 left 30",
    description: "Position marker at 30% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '30%' }
  },
  {
    id: 134,
    title: "top 30 left 35",
    description: "Position marker at 30% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '35%' }
  },
  {
    id: 135,
    title: "top 30 left 40",
    description: "Position marker at 30% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '40%' }
  },
  {
    id: 136,
    title: "top 30 left 45",
    description: "Position marker at 30% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '45%' }
  },
  {
    id: 137,
    title: "top 30 left 50",
    description: "Position marker at 30% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '50%' }
  },
  {
    id: 138,
    title: "top 30 left 55",
    description: "Position marker at 30% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '55%' }
  },
  {
    id: 139,
    title: "top 30 left 60",
    description: "Position marker at 30% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '60%' }
  },
  {
    id: 140,
    title: "top 30 left 65",
    description: "Position marker at 30% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '65%' }
  },
  {
    id: 141,
    title: "top 30 left 70",
    description: "Position marker at 30% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '70%' }
  },
  {
    id: 142,
    title: "top 30 left 75",
    description: "Position marker at 30% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '75%' }
  },
  {
    id: 143,
    title: "top 30 left 80",
    description: "Position marker at 30% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '80%' }
  },
  {
    id: 144,
    title: "top 30 left 85",
    description: "Position marker at 30% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '85%' }
  },
  {
    id: 145,
    title: "top 30 left 90",
    description: "Position marker at 30% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '90%' }
  },
  {
    id: 146,
    title: "top 30 left 95",
    description: "Position marker at 30% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '95%' }
  },
  {
    id: 147,
    title: "top 30 left 100",
    description: "Position marker at 30% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '30%', left: '100%' }
  },
  {
    id: 148,
    title: "top 35 left 0",
    description: "Position marker at 35% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '0%' }
  },
  {
    id: 149,
    title: "top 35 left 5",
    description: "Position marker at 35% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '5%' }
  },
  {
    id: 150,
    title: "top 35 left 10",
    description: "Position marker at 35% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '10%' }
  },
  {
    id: 151,
    title: "top 35 left 15",
    description: "Position marker at 35% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '15%' }
  },
  {
    id: 152,
    title: "top 35 left 20",
    description: "Position marker at 35% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '20%' }
  },
  {
    id: 153,
    title: "top 35 left 25",
    description: "Position marker at 35% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '25%' }
  },
  {
    id: 154,
    title: "top 35 left 30",
    description: "Position marker at 35% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '30%' }
  },
  {
    id: 155,
    title: "top 35 left 35",
    description: "Position marker at 35% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '35%' }
  },
  {
    id: 156,
    title: "top 35 left 40",
    description: "Position marker at 35% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '40%' }
  },
  {
    id: 157,
    title: "top 35 left 45",
    description: "Position marker at 35% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '45%' }
  },
  {
    id: 158,
    title: "top 35 left 50",
    description: "Position marker at 35% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '50%' }
  },
  {
    id: 159,
    title: "top 35 left 55",
    description: "Position marker at 35% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '55%' }
  },
  {
    id: 160,
    title: "top 35 left 60",
    description: "Position marker at 35% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '60%' }
  },
  {
    id: 161,
    title: "top 35 left 65",
    description: "Position marker at 35% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '65%' }
  },
  {
    id: 162,
    title: "top 35 left 70",
    description: "Position marker at 35% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '70%' }
  },
  {
    id: 163,
    title: "top 35 left 75",
    description: "Position marker at 35% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '75%' }
  },
  {
    id: 164,
    title: "top 35 left 80",
    description: "Position marker at 35% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '80%' }
  },
  {
    id: 165,
    title: "top 35 left 85",
    description: "Position marker at 35% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '85%' }
  },
  {
    id: 166,
    title: "top 35 left 90",
    description: "Position marker at 35% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '90%' }
  },
  {
    id: 167,
    title: "top 35 left 95",
    description: "Position marker at 35% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '95%' }
  },
  {
    id: 168,
    title: "top 35 left 100",
    description: "Position marker at 35% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '35%', left: '100%' }
  },
  {
    id: 169,
    title: "top 40 left 0",
    description: "Position marker at 40% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '0%' }
  },
  {
    id: 170,
    title: "top 40 left 5",
    description: "Position marker at 40% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '5%' }
  },
  {
    id: 171,
    title: "top 40 left 10",
    description: "Position marker at 40% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '10%' }
  },
  {
    id: 172,
    title: "top 40 left 15",
    description: "Position marker at 40% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '15%' }
  },
  {
    id: 173,
    title: "top 40 left 20",
    description: "Position marker at 40% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '20%' }
  },
  {
    id: 174,
    title: "top 40 left 25",
    description: "Position marker at 40% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '25%' }
  },
  {
    id: 175,
    title: "top 40 left 30",
    description: "Position marker at 40% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '30%' }
  },
  {
    id: 176,
    title: "top 40 left 35",
    description: "Position marker at 40% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '35%' }
  },
  {
    id: 177,
    title: "top 40 left 40",
    description: "Position marker at 40% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '40%' }
  },
  {
    id: 178,
    title: "top 40 left 45",
    description: "Position marker at 40% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '45%' }
  },
  {
    id: 179,
    title: "top 40 left 50",
    description: "Position marker at 40% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '50%' }
  },
  {
    id: 180,
    title: "top 40 left 55",
    description: "Position marker at 40% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '55%' }
  },
  {
    id: 181,
    title: "top 40 left 60",
    description: "Position marker at 40% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '60%' }
  },
  {
    id: 182,
    title: "top 40 left 65",
    description: "Position marker at 40% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '65%' }
  },
  {
    id: 183,
    title: "top 40 left 70",
    description: "Position marker at 40% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '70%' }
  },
  {
    id: 184,
    title: "top 40 left 75",
    description: "Position marker at 40% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '75%' }
  },
  {
    id: 185,
    title: "top 40 left 80",
    description: "Position marker at 40% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '80%' }
  },
  {
    id: 186,
    title: "top 40 left 85",
    description: "Position marker at 40% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '85%' }
  },
  {
    id: 187,
    title: "top 40 left 90",
    description: "Position marker at 40% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '90%' }
  },
  {
    id: 188,
    title: "top 40 left 95",
    description: "Position marker at 40% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '95%' }
  },
  {
    id: 189,
    title: "top 40 left 100",
    description: "Position marker at 40% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '40%', left: '100%' }
  },
  {
    id: 190,
    title: "top 45 left 0",
    description: "Position marker at 45% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '0%' }
  },
  {
    id: 191,
    title: "top 45 left 5",
    description: "Position marker at 45% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '5%' }
  },
  {
    id: 192,
    title: "top 45 left 10",
    description: "Position marker at 45% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '10%' }
  },
  {
    id: 193,
    title: "top 45 left 15",
    description: "Position marker at 45% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '15%' }
  },
  {
    id: 194,
    title: "top 45 left 20",
    description: "Position marker at 45% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '20%' }
  },
  {
    id: 195,
    title: "top 45 left 25",
    description: "Position marker at 45% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '25%' }
  },
  {
    id: 196,
    title: "top 45 left 30",
    description: "Position marker at 45% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '30%' }
  },
  {
    id: 197,
    title: "top 45 left 35",
    description: "Position marker at 45% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '35%' }
  },
  {
    id: 198,
    title: "top 45 left 40",
    description: "Position marker at 45% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '40%' }
  },
  {
    id: 199,
    title: "top 45 left 45",
    description: "Position marker at 45% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '45%' }
  },
  {
    id: 200,
    title: "top 45 left 50",
    description: "Position marker at 45% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '50%' }
  },
  {
    id: 201,
    title: "top 45 left 55",
    description: "Position marker at 45% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '55%' }
  },
  {
    id: 202,
    title: "top 45 left 60",
    description: "Position marker at 45% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '60%' }
  },
  {
    id: 203,
    title: "top 45 left 65",
    description: "Position marker at 45% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '65%' }
  },
  {
    id: 204,
    title: "top 45 left 70",
    description: "Position marker at 45% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '70%' }
  },
  {
    id: 205,
    title: "top 45 left 75",
    description: "Position marker at 45% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '75%' }
  },
  {
    id: 206,
    title: "top 45 left 80",
    description: "Position marker at 45% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '80%' }
  },
  {
    id: 207,
    title: "top 45 left 85",
    description: "Position marker at 45% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '85%' }
  },
  {
    id: 208,
    title: "top 45 left 90",
    description: "Position marker at 45% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '90%' }
  },
  {
    id: 209,
    title: "top 45 left 95",
    description: "Position marker at 45% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '95%' }
  },
  {
    id: 210,
    title: "top 45 left 100",
    description: "Position marker at 45% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '45%', left: '100%' }
  },
  {
    id: 211,
    title: "top 50 left 0",
    description: "Position marker at 50% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '0%' }
  },
  {
    id: 212,
    title: "top 50 left 5",
    description: "Position marker at 50% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '5%' }
  },
  {
    id: 213,
    title: "top 50 left 10",
    description: "Position marker at 50% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '10%' }
  },
  {
    id: 214,
    title: "top 50 left 15",
    description: "Position marker at 50% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '15%' }
  },
  {
    id: 215,
    title: "top 50 left 20",
    description: "Position marker at 50% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '20%' }
  },
  {
    id: 216,
    title: "top 50 left 25",
    description: "Position marker at 50% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '25%' }
  },
  {
    id: 217,
    title: "top 50 left 30",
    description: "Position marker at 50% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '30%' }
  },
  {
    id: 218,
    title: "top 50 left 35",
    description: "Position marker at 50% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '35%' }
  },
  {
    id: 219,
    title: "top 50 left 40",
    description: "Position marker at 50% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '40%' }
  },
  {
    id: 220,
    title: "top 50 left 45",
    description: "Position marker at 50% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '45%' }
  },
  {
    id: 221,
    title: "top 50 left 50",
    description: "Position marker at 50% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '50%' }
  },
  {
    id: 222,
    title: "top 50 left 55",
    description: "Position marker at 50% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '55%' }
  },
  {
    id: 223,
    title: "top 50 left 60",
    description: "Position marker at 50% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '60%' }
  },
  {
    id: 224,
    title: "top 50 left 65",
    description: "Position marker at 50% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '65%' }
  },
  {
    id: 225,
    title: "top 50 left 70",
    description: "Position marker at 50% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '70%' }
  },
  {
    id: 226,
    title: "top 50 left 75",
    description: "Position marker at 50% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '75%' }
  },
  {
    id: 227,
    title: "top 50 left 80",
    description: "Position marker at 50% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '80%' }
  },
  {
    id: 228,
    title: "top 50 left 85",
    description: "Position marker at 50% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '85%' }
  },
  {
    id: 229,
    title: "top 50 left 90",
    description: "Position marker at 50% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '90%' }
  },
  {
    id: 230,
    title: "top 50 left 95",
    description: "Position marker at 50% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '95%' }
  },
  {
    id: 231,
    title: "top 50 left 100",
    description: "Position marker at 50% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '50%', left: '100%' }
  },
  {
    id: 232,
    title: "top 55 left 0",
    description: "Position marker at 55% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '0%' }
  },
  {
    id: 233,
    title: "top 55 left 5",
    description: "Position marker at 55% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '5%' }
  },
  {
    id: 234,
    title: "top 55 left 10",
    description: "Position marker at 55% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '10%' }
  },
  {
    id: 235,
    title: "top 55 left 15",
    description: "Position marker at 55% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '15%' }
  },
  {
    id: 236,
    title: "top 55 left 20",
    description: "Position marker at 55% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '20%' }
  },
  {
    id: 237,
    title: "top 55 left 25",
    description: "Position marker at 55% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '25%' }
  },
  {
    id: 238,
    title: "top 55 left 30",
    description: "Position marker at 55% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '30%' }
  },
  {
    id: 239,
    title: "top 55 left 35",
    description: "Position marker at 55% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '35%' }
  },
  {
    id: 240,
    title: "top 55 left 40",
    description: "Position marker at 55% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '40%' }
  },
  {
    id: 241,
    title: "top 55 left 45",
    description: "Position marker at 55% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '45%' }
  },
  {
    id: 242,
    title: "top 55 left 50",
    description: "Position marker at 55% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '50%' }
  },
  {
    id: 243,
    title: "top 55 left 55",
    description: "Position marker at 55% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '55%' }
  },
  {
    id: 244,
    title: "top 55 left 60",
    description: "Position marker at 55% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '60%' }
  },
  {
    id: 245,
    title: "top 55 left 65",
    description: "Position marker at 55% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '65%' }
  },
  {
    id: 246,
    title: "top 55 left 70",
    description: "Position marker at 55% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '70%' }
  },
  {
    id: 247,
    title: "top 55 left 75",
    description: "Position marker at 55% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '75%' }
  },
  {
    id: 248,
    title: "top 55 left 80",
    description: "Position marker at 55% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '80%' }
  },
  {
    id: 249,
    title: "top 55 left 85",
    description: "Position marker at 55% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '85%' }
  },
  {
    id: 250,
    title: "top 55 left 90",
    description: "Position marker at 55% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '90%' }
  },
  {
    id: 251,
    title: "top 55 left 95",
    description: "Position marker at 55% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '95%' }
  },
  {
    id: 252,
    title: "top 55 left 100",
    description: "Position marker at 55% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '55%', left: '100%' }
  },
  {
    id: 253,
    title: "top 60 left 0",
    description: "Position marker at 60% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '0%' }
  },
  {
    id: 254,
    title: "top 60 left 5",
    description: "Position marker at 60% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '5%' }
  },
  {
    id: 255,
    title: "top 60 left 10",
    description: "Position marker at 60% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '10%' }
  },
  {
    id: 256,
    title: "top 60 left 15",
    description: "Position marker at 60% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '15%' }
  },
  {
    id: 257,
    title: "top 60 left 20",
    description: "Position marker at 60% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '20%' }
  },
  {
    id: 258,
    title: "top 60 left 25",
    description: "Position marker at 60% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '25%' }
  },
  {
    id: 259,
    title: "top 60 left 30",
    description: "Position marker at 60% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '30%' }
  },
  {
    id: 260,
    title: "top 60 left 35",
    description: "Position marker at 60% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '35%' }
  },
  {
    id: 261,
    title: "top 60 left 40",
    description: "Position marker at 60% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '40%' }
  },
  {
    id: 262,
    title: "top 60 left 45",
    description: "Position marker at 60% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '45%' }
  },
  {
    id: 263,
    title: "top 60 left 50",
    description: "Position marker at 60% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '50%' }
  },
  {
    id: 264,
    title: "top 60 left 55",
    description: "Position marker at 60% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '55%' }
  },
  {
    id: 265,
    title: "top 60 left 60",
    description: "Position marker at 60% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '60%' }
  },
  {
    id: 266,
    title: "top 60 left 65",
    description: "Position marker at 60% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '65%' }
  },
  {
    id: 267,
    title: "top 60 left 70",
    description: "Position marker at 60% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '70%' }
  },
  {
    id: 268,
    title: "top 60 left 75",
    description: "Position marker at 60% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '75%' }
  },
  {
    id: 269,
    title: "top 60 left 80",
    description: "Position marker at 60% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '80%' }
  },
  {
    id: 270,
    title: "top 60 left 85",
    description: "Position marker at 60% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '85%' }
  },
  {
    id: 271,
    title: "top 60 left 90",
    description: "Position marker at 60% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '90%' }
  },
  {
    id: 272,
    title: "top 60 left 95",
    description: "Position marker at 60% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '95%' }
  },
  {
    id: 273,
    title: "top 60 left 100",
    description: "Position marker at 60% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '60%', left: '100%' }
  },
  {
    id: 274,
    title: "top 65 left 0",
    description: "Position marker at 65% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '0%' }
  },
  {
    id: 275,
    title: "top 65 left 5",
    description: "Position marker at 65% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '5%' }
  },
  {
    id: 276,
    title: "top 65 left 10",
    description: "Position marker at 65% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '10%' }
  },
  {
    id: 277,
    title: "top 65 left 15",
    description: "Position marker at 65% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '15%' }
  },
  {
    id: 278,
    title: "top 65 left 20",
    description: "Position marker at 65% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '20%' }
  },
  {
    id: 279,
    title: "top 65 left 25",
    description: "Position marker at 65% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '25%' }
  },
  {
    id: 280,
    title: "top 65 left 30",
    description: "Position marker at 65% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '30%' }
  },
  {
    id: 281,
    title: "top 65 left 35",
    description: "Position marker at 65% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '35%' }
  },
  {
    id: 282,
    title: "top 65 left 40",
    description: "Position marker at 65% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '40%' }
  },
  {
    id: 283,
    title: "top 65 left 45",
    description: "Position marker at 65% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '45%' }
  },
  {
    id: 284,
    title: "top 65 left 50",
    description: "Position marker at 65% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '50%' }
  },
  {
    id: 285,
    title: "top 65 left 55",
    description: "Position marker at 65% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '55%' }
  },
  {
    id: 286,
    title: "top 65 left 60",
    description: "Position marker at 65% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '60%' }
  },
  {
    id: 287,
    title: "top 65 left 65",
    description: "Position marker at 65% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '65%' }
  },
  {
    id: 288,
    title: "top 65 left 70",
    description: "Position marker at 65% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '70%' }
  },
  {
    id: 289,
    title: "top 65 left 75",
    description: "Position marker at 65% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '75%' }
  },
  {
    id: 290,
    title: "top 65 left 80",
    description: "Position marker at 65% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '80%' }
  },
  {
    id: 291,
    title: "top 65 left 85",
    description: "Position marker at 65% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '85%' }
  },
  {
    id: 292,
    title: "top 65 left 90",
    description: "Position marker at 65% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '90%' }
  },
  {
    id: 293,
    title: "top 65 left 95",
    description: "Position marker at 65% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '95%' }
  },
  {
    id: 294,
    title: "top 65 left 100",
    description: "Position marker at 65% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '65%', left: '100%' }
  },
  {
    id: 295,
    title: "top 70 left 0",
    description: "Position marker at 70% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '0%' }
  },
  {
    id: 296,
    title: "top 70 left 5",
    description: "Position marker at 70% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '5%' }
  },
  {
    id: 297,
    title: "top 70 left 10",
    description: "Position marker at 70% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '10%' }
  },
  {
    id: 298,
    title: "top 70 left 15",
    description: "Position marker at 70% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '15%' }
  },
  {
    id: 299,
    title: "top 70 left 20",
    description: "Position marker at 70% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '20%' }
  },
  {
    id: 300,
    title: "top 70 left 25",
    description: "Position marker at 70% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '25%' }
  },
  {
    id: 301,
    title: "top 70 left 30",
    description: "Position marker at 70% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '30%' }
  },
  {
    id: 302,
    title: "top 70 left 35",
    description: "Position marker at 70% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '35%' }
  },
  {
    id: 303,
    title: "top 70 left 40",
    description: "Position marker at 70% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '40%' }
  },
  {
    id: 304,
    title: "top 70 left 45",
    description: "Position marker at 70% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '45%' }
  },
  {
    id: 305,
    title: "top 70 left 50",
    description: "Position marker at 70% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '50%' }
  },
  {
    id: 306,
    title: "top 70 left 55",
    description: "Position marker at 70% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '55%' }
  },
  {
    id: 307,
    title: "top 70 left 60",
    description: "Position marker at 70% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '60%' }
  },
  {
    id: 308,
    title: "top 70 left 65",
    description: "Position marker at 70% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '65%' }
  },
  {
    id: 309,
    title: "top 70 left 70",
    description: "Position marker at 70% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '70%' }
  },
  {
    id: 310,
    title: "top 70 left 75",
    description: "Position marker at 70% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '75%' }
  },
  {
    id: 311,
    title: "top 70 left 80",
    description: "Position marker at 70% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '80%' }
  },
  {
    id: 312,
    title: "top 70 left 85",
    description: "Position marker at 70% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '85%' }
  },
  {
    id: 313,
    title: "top 70 left 90",
    description: "Position marker at 70% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '90%' }
  },
  {
    id: 314,
    title: "top 70 left 95",
    description: "Position marker at 70% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '95%' }
  },
  {
    id: 315,
    title: "top 70 left 100",
    description: "Position marker at 70% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '70%', left: '100%' }
  },
  {
    id: 316,
    title: "top 75 left 0",
    description: "Position marker at 75% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '0%' }
  },
  {
    id: 317,
    title: "top 75 left 5",
    description: "Position marker at 75% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '5%' }
  },
  {
    id: 318,
    title: "top 75 left 10",
    description: "Position marker at 75% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '10%' }
  },
  {
    id: 319,
    title: "top 75 left 15",
    description: "Position marker at 75% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '15%' }
  },
  {
    id: 320,
    title: "top 75 left 20",
    description: "Position marker at 75% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '20%' }
  },
  {
    id: 321,
    title: "top 75 left 25",
    description: "Position marker at 75% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '25%' }
  },
  {
    id: 322,
    title: "top 75 left 30",
    description: "Position marker at 75% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '30%' }
  },
  {
    id: 323,
    title: "top 75 left 35",
    description: "Position marker at 75% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '35%' }
  },
  {
    id: 324,
    title: "top 75 left 40",
    description: "Position marker at 75% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '40%' }
  },
  {
    id: 325,
    title: "top 75 left 45",
    description: "Position marker at 75% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '45%' }
  },
  {
    id: 326,
    title: "top 75 left 50",
    description: "Position marker at 75% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '50%' }
  },
  {
    id: 327,
    title: "top 75 left 55",
    description: "Position marker at 75% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '55%' }
  },
  {
    id: 328,
    title: "top 75 left 60",
    description: "Position marker at 75% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '60%' }
  },
  {
    id: 329,
    title: "top 75 left 65",
    description: "Position marker at 75% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '65%' }
  },
  {
    id: 330,
    title: "top 75 left 70",
    description: "Position marker at 75% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '70%' }
  },
  {
    id: 331,
    title: "top 75 left 75",
    description: "Position marker at 75% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '75%' }
  },
  {
    id: 332,
    title: "top 75 left 80",
    description: "Position marker at 75% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '80%' }
  },
  {
    id: 333,
    title: "top 75 left 85",
    description: "Position marker at 75% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '85%' }
  },
  {
    id: 334,
    title: "top 75 left 90",
    description: "Position marker at 75% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '90%' }
  },
  {
    id: 335,
    title: "top 75 left 95",
    description: "Position marker at 75% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '95%' }
  },
  {
    id: 336,
    title: "top 75 left 100",
    description: "Position marker at 75% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '75%', left: '100%' }
  },
  {
    id: 337,
    title: "top 80 left 0",
    description: "Position marker at 80% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '0%' }
  },
  {
    id: 338,
    title: "top 80 left 5",
    description: "Position marker at 80% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '5%' }
  },
  {
    id: 339,
    title: "top 80 left 10",
    description: "Position marker at 80% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '10%' }
  },
  {
    id: 340,
    title: "top 80 left 15",
    description: "Position marker at 80% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '15%' }
  },
  {
    id: 341,
    title: "top 80 left 20",
    description: "Position marker at 80% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '20%' }
  },
  {
    id: 342,
    title: "top 80 left 25",
    description: "Position marker at 80% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '25%' }
  },
  {
    id: 343,
    title: "top 80 left 30",
    description: "Position marker at 80% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '30%' }
  },
  {
    id: 344,
    title: "top 80 left 35",
    description: "Position marker at 80% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '35%' }
  },
  {
    id: 345,
    title: "top 80 left 40",
    description: "Position marker at 80% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '40%' }
  },
  {
    id: 346,
    title: "top 80 left 45",
    description: "Position marker at 80% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '45%' }
  },
  {
    id: 347,
    title: "top 80 left 50",
    description: "Position marker at 80% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '50%' }
  },
  {
    id: 348,
    title: "top 80 left 55",
    description: "Position marker at 80% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '55%' }
  },
  {
    id: 349,
    title: "top 80 left 60",
    description: "Position marker at 80% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '60%' }
  },
  {
    id: 350,
    title: "top 80 left 65",
    description: "Position marker at 80% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '65%' }
  },
  {
    id: 351,
    title: "top 80 left 70",
    description: "Position marker at 80% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '70%' }
  },
  {
    id: 352,
    title: "top 80 left 75",
    description: "Position marker at 80% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '75%' }
  },
  {
    id: 353,
    title: "top 80 left 80",
    description: "Position marker at 80% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '80%' }
  },
  {
    id: 354,
    title: "top 80 left 85",
    description: "Position marker at 80% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '85%' }
  },
  {
    id: 355,
    title: "top 80 left 90",
    description: "Position marker at 80% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '90%' }
  },
  {
    id: 356,
    title: "top 80 left 95",
    description: "Position marker at 80% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '95%' }
  },
  {
    id: 357,
    title: "top 80 left 100",
    description: "Position marker at 80% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '80%', left: '100%' }
  },
  {
    id: 358,
    title: "top 85 left 0",
    description: "Position marker at 85% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '0%' }
  },
  {
    id: 359,
    title: "top 85 left 5",
    description: "Position marker at 85% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '5%' }
  },
  {
    id: 360,
    title: "top 85 left 10",
    description: "Position marker at 85% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '10%' }
  },
  {
    id: 361,
    title: "top 85 left 15",
    description: "Position marker at 85% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '15%' }
  },
  {
    id: 362,
    title: "top 85 left 20",
    description: "Position marker at 85% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '20%' }
  },
  {
    id: 363,
    title: "top 85 left 25",
    description: "Position marker at 85% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '25%' }
  },
  {
    id: 364,
    title: "top 85 left 30",
    description: "Position marker at 85% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '30%' }
  },
  {
    id: 365,
    title: "top 85 left 35",
    description: "Position marker at 85% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '35%' }
  },
  {
    id: 366,
    title: "top 85 left 40",
    description: "Position marker at 85% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '40%' }
  },
  {
    id: 367,
    title: "top 85 left 45",
    description: "Position marker at 85% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '45%' }
  },
  {
    id: 368,
    title: "top 85 left 50",
    description: "Position marker at 85% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '50%' }
  },
  {
    id: 369,
    title: "top 85 left 55",
    description: "Position marker at 85% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '55%' }
  },
  {
    id: 370,
    title: "top 85 left 60",
    description: "Position marker at 85% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '60%' }
  },
  {
    id: 371,
    title: "top 85 left 65",
    description: "Position marker at 85% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '65%' }
  },
  {
    id: 372,
    title: "top 85 left 70",
    description: "Position marker at 85% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '70%' }
  },
  {
    id: 373,
    title: "top 85 left 75",
    description: "Position marker at 85% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '75%' }
  },
  {
    id: 374,
    title: "top 85 left 80",
    description: "Position marker at 85% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '80%' }
  },
  {
    id: 375,
    title: "top 85 left 85",
    description: "Position marker at 85% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '85%' }
  },
  {
    id: 376,
    title: "top 85 left 90",
    description: "Position marker at 85% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '90%' }
  },
  {
    id: 377,
    title: "top 85 left 95",
    description: "Position marker at 85% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '95%' }
  },
  {
    id: 378,
    title: "top 85 left 100",
    description: "Position marker at 85% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '85%', left: '100%' }
  },
  {
    id: 379,
    title: "top 90 left 0",
    description: "Position marker at 90% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '0%' }
  },
  {
    id: 380,
    title: "top 90 left 5",
    description: "Position marker at 90% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '5%' }
  },
  {
    id: 381,
    title: "top 90 left 10",
    description: "Position marker at 90% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '10%' }
  },
  {
    id: 382,
    title: "top 90 left 15",
    description: "Position marker at 90% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '15%' }
  },
  {
    id: 383,
    title: "top 90 left 20",
    description: "Position marker at 90% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '20%' }
  },
  {
    id: 384,
    title: "top 90 left 25",
    description: "Position marker at 90% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '25%' }
  },
  {
    id: 385,
    title: "top 90 left 30",
    description: "Position marker at 90% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '30%' }
  },
  {
    id: 386,
    title: "top 90 left 35",
    description: "Position marker at 90% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '35%' }
  },
  {
    id: 387,
    title: "top 90 left 40",
    description: "Position marker at 90% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '40%' }
  },
  {
    id: 388,
    title: "top 90 left 45",
    description: "Position marker at 90% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '45%' }
  },
  {
    id: 389,
    title: "top 90 left 50",
    description: "Position marker at 90% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '50%' }
  },
  {
    id: 390,
    title: "top 90 left 55",
    description: "Position marker at 90% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '55%' }
  },
  {
    id: 391,
    title: "top 90 left 60",
    description: "Position marker at 90% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '60%' }
  },
  {
    id: 392,
    title: "top 90 left 65",
    description: "Position marker at 90% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '65%' }
  },
  {
    id: 393,
    title: "top 90 left 70",
    description: "Position marker at 90% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '70%' }
  },
  {
    id: 394,
    title: "top 90 left 75",
    description: "Position marker at 90% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '75%' }
  },
  {
    id: 395,
    title: "top 90 left 80",
    description: "Position marker at 90% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '80%' }
  },
  {
    id: 396,
    title: "top 90 left 85",
    description: "Position marker at 90% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '85%' }
  },
  {
    id: 397,
    title: "top 90 left 90",
    description: "Position marker at 90% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '90%' }
  },
  {
    id: 398,
    title: "top 90 left 95",
    description: "Position marker at 90% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '95%' }
  },
  {
    id: 399,
    title: "top 90 left 100",
    description: "Position marker at 90% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '90%', left: '100%' }
  },
  {
    id: 400,
    title: "top 95 left 0",
    description: "Position marker at 95% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '0%' }
  },
  {
    id: 401,
    title: "top 95 left 5",
    description: "Position marker at 95% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '5%' }
  },
  {
    id: 402,
    title: "top 95 left 10",
    description: "Position marker at 95% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '10%' }
  },
  {
    id: 403,
    title: "top 95 left 15",
    description: "Position marker at 95% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '15%' }
  },
  {
    id: 404,
    title: "top 95 left 20",
    description: "Position marker at 95% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '20%' }
  },
  {
    id: 405,
    title: "top 95 left 25",
    description: "Position marker at 95% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '25%' }
  },
  {
    id: 406,
    title: "top 95 left 30",
    description: "Position marker at 95% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '30%' }
  },
  {
    id: 407,
    title: "top 95 left 35",
    description: "Position marker at 95% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '35%' }
  },
  {
    id: 408,
    title: "top 95 left 40",
    description: "Position marker at 95% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '40%' }
  },
  {
    id: 409,
    title: "top 95 left 45",
    description: "Position marker at 95% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '45%' }
  },
  {
    id: 410,
    title: "top 95 left 50",
    description: "Position marker at 95% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '50%' }
  },
  {
    id: 411,
    title: "top 95 left 55",
    description: "Position marker at 95% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '55%' }
  },
  {
    id: 412,
    title: "top 95 left 60",
    description: "Position marker at 95% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '60%' }
  },
  {
    id: 413,
    title: "top 95 left 65",
    description: "Position marker at 95% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '65%' }
  },
  {
    id: 414,
    title: "top 95 left 70",
    description: "Position marker at 95% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '70%' }
  },
  {
    id: 415,
    title: "top 95 left 75",
    description: "Position marker at 95% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '75%' }
  },
  {
    id: 416,
    title: "top 95 left 80",
    description: "Position marker at 95% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '80%' }
  },
  {
    id: 417,
    title: "top 95 left 85",
    description: "Position marker at 95% top, 85% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '85%' }
  },
  {
    id: 418,
    title: "top 95 left 90",
    description: "Position marker at 95% top, 90% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '90%' }
  },
  {
    id: 419,
    title: "top 95 left 95",
    description: "Position marker at 95% top, 95% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '95%' }
  },
  {
    id: 420,
    title: "top 95 left 100",
    description: "Position marker at 95% top, 100% left",
    icon: <Monitor size={20} />,
    position: { top: '95%', left: '100%' }
  },
  {
    id: 421,
    title: "top 100 left 0",
    description: "Position marker at 100% top, 0% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '0%' }
  },
  {
    id: 422,
    title: "top 100 left 5",
    description: "Position marker at 100% top, 5% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '5%' }
  },
  {
    id: 423,
    title: "top 100 left 10",
    description: "Position marker at 100% top, 10% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '10%' }
  },
  {
    id: 424,
    title: "top 100 left 15",
    description: "Position marker at 100% top, 15% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '15%' }
  },
  {
    id: 425,
    title: "top 100 left 20",
    description: "Position marker at 100% top, 20% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '20%' }
  },
  {
    id: 426,
    title: "top 100 left 25",
    description: "Position marker at 100% top, 25% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '25%' }
  },
  {
    id: 427,
    title: "top 100 left 30",
    description: "Position marker at 100% top, 30% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '30%' }
  },
  {
    id: 428,
    title: "top 100 left 35",
    description: "Position marker at 100% top, 35% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '35%' }
  },
  {
    id: 429,
    title: "top 100 left 40",
    description: "Position marker at 100% top, 40% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '40%' }
  },
  {
    id: 430,
    title: "top 100 left 45",
    description: "Position marker at 100% top, 45% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '45%' }
  },
  {
    id: 431,
    title: "top 100 left 50",
    description: "Position marker at 100% top, 50% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '50%' }
  },
  {
    id: 432,
    title: "top 100 left 55",
    description: "Position marker at 100% top, 55% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '55%' }
  },
  {
    id: 433,
    title: "top 100 left 60",
    description: "Position marker at 100% top, 60% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '60%' }
  },
  {
    id: 434,
    title: "top 100 left 65",
    description: "Position marker at 100% top, 65% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '65%' }
  },
  {
    id: 435,
    title: "top 100 left 70",
    description: "Position marker at 100% top, 70% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '70%' }
  },
  {
    id: 436,
    title: "top 100 left 75",
    description: "Position marker at 100% top, 75% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '75%' }
  },
  {
    id: 437,
    title: "top 100 left 80",
    description: "Position marker at 100% top, 80% left",
    icon: <Monitor size={20} />,
    position: { top: '100%', left: '80%' }
  },
    ],
    'tablet': [
      {
        id: 1,
        title: "Touch-Optimized Interface",
        description: "Intuitive touch controls designed specifically for tablet interaction.",
        icon: <Tablet size={20} />,
        position: { top: '25%', left: '50%' }
      },
      {
        id: 2,
        title: "Portable Design",
        description: "Lightweight and portable for flexible point-of-sale anywhere in your store.",
        icon: <Zap size={20} />,
        position: { top: '45%', left: '30%' }
      },
      {
        id: 3,
        title: "Battery Powered",
        description: "Long-lasting battery life for all-day operation without charging.",
        icon: <Battery size={20} />,
        position: { top: '65%', left: '70%' }
      },
      {
        id: 4,
        title: "Wireless Connectivity",
        description: "Wi-Fi and cellular connectivity for seamless operation anywhere.",
        icon: <Wifi size={20} />,
        position: { top: '85%', left: '50%' }
      },
      {
        id: 5,
        title: "Card Reader Integration",
        description: "Built-in or attachable card readers for secure payment processing.",
        icon: <CreditCard size={20} />,
        position: { top: '35%', left: '80%' }
      },
      {
        id: 6,
        title: "Cloud Sync",
        description: "Real-time synchronization with your main POS system and inventory.",
        icon: <Cloud size={20} />,
        position: { top: '75%', left: '20%' }
      }
    ],
    'phone': [
      {
        id: 1,
        title: "Pocket-Sized Solution",
        description: "Complete POS functionality in a device that fits in your pocket.",
        icon: <Smartphone size={20} />,
        position: { top: '30%', left: '50%' }
      },
      {
        id: 2,
        title: "Quick Payments",
        description: "Fast payment processing with tap, chip, and contactless options.",
        icon: <Zap size={20} />,
        position: { top: '50%', left: '30%' }
      },
      {
        id: 3,
        title: "Customer Engagement",
        description: "Built-in camera for loyalty programs and customer interaction.",
        icon: <Users size={20} />,
        position: { top: '70%', left: '70%' }
      },
      {
        id: 4,
        title: "Real-Time Sync",
        description: "Instant synchronization with your main POS system and inventory.",
        icon: <Cloud size={20} />,
        position: { top: '90%', left: '50%' }
      },
      {
        id: 5,
        title: "Mobile Receipts",
        description: "Send digital receipts via SMS or email directly from the device.",
        icon: <Printer size={20} />,
        position: { top: '40%', left: '80%' }
      },
      {
        id: 6,
        title: "Offline Mode",
        description: "Continue processing sales even without internet connectivity.",
        icon: <Shield size={20} />,
        position: { top: '80%', left: '20%' }
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

  return (
    <div className="min-h-screen bg-white font-sans animate-fade-in">
      {/* Sub-header with back navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button onClick={onNavigateBack} variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to System Solutions
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
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
          <div className="flex justify-center">
            <div className="relative max-w-4xl">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                <img 
                  src={currentDevice?.imageSrc}
                  alt={`${currentDevice?.name} POS System`}
                  className={`w-full h-auto object-contain mx-auto ${
                    currentDevice?.id === 'desktop' ? 'max-h-[800px]' : 'max-h-[600px]'
                  }`}
                />
              </div>

              {/* Interactive Feature Points */}
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
                  
                  {/* Tooltip */}
                  {hoveredFeature === feature.id && (
                    <div 
                      className={`absolute z-10 bg-gray-900 text-white p-3 rounded-lg shadow-xl ${
                        feature.hasVideo ? 'w-80' : 'w-64'
                      }`}
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
                      
                      {/* Video for features that have it */}
                      {feature.hasVideo && feature.videoSrc && (
                        <div className="mb-3">
                          <video 
                            className="w-full h-full object-cover rounded-md"
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
