# Shopify-Inspired Website

A modern, responsive website built with React and Tailwind CSS, inspired by Shopify's design language with custom branding for imrchnt.

## 🎨 Features

- **Custom Branding**: imrchnt logo, coral color scheme (#f08e80), Varela Round typography
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Mega Menus**: Professional navigation with Solutions, Hardware, and Support mega menus
- **Complete Pages**: Home, InStore, Offsite, Manage, Credit Cards, and individual hardware product pages
- **Modern Stack**: React 18, Vite, Tailwind CSS, Lucide React icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd shopify-inspired-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📱 Pages & Features

### Navigation
- **Solutions**: InStore (POS, Clienteling, On Floor Assistance), Offsite, Manage, Credit Cards
- **Pricing**: Complete pricing tiers with monthly/yearly toggle
- **Hardware**: S1f2, AMS1, SFO1 product pages with detailed specifications
- **Support**: Comprehensive support resources and documentation

### Key Sections
- **Flat Fee Pricing**: Transparent payment processing rates
- **Hardware Products**: Individual pages with images, pricing, and accessories
- **Responsive Mega Menus**: Professional navigation experience
- **Custom Branding**: Consistent coral color scheme and typography

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Varela Round (Google Fonts)
- **Build Tool**: Vite with optimized production builds

## 🎯 Customization

### Colors
The primary color is defined as `#f08e80` (coral). Update this in:
- Component className props: `bg-[#f08e80]`, `text-[#f08e80]`, etc.
- CSS custom properties if needed

### Logo
Replace `src/assets/logo.png` with your logo and update alt text in components.

### Content
Edit page content in the respective component files in `src/components/`.

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Drag and drop the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Deploy to Vercel
1. Connect your GitHub repository
2. Set framework preset to "Vite"
3. Build command: `npm run build`
4. Output directory: `dist`

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── InStorePage.jsx
│   ├── CreditCardProcessingPage.jsx
│   ├── MegaMenu.jsx
│   └── ...
├── assets/             # Static assets
│   ├── logo.png
│   └── product images
├── App.jsx             # Main app component
└── main.jsx           # Entry point
```

## 🌟 Key Features Implemented

- ✅ Professional Shopify-inspired design
- ✅ Custom imrchnt branding throughout
- ✅ Responsive mega menu navigation
- ✅ Individual hardware product pages
- ✅ Flat fee pricing section
- ✅ Complete payment processing information
- ✅ Mobile-optimized experience

## 📞 Support

For questions about customization or deployment, refer to the included `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

Built with ❤️ using React and Tailwind CSS

