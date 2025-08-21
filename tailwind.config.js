/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'varela': ['Varela Round', 'sans-serif'],
        'sans': ['Varela Round', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'coral': {
          50: '#fef7f6',
          100: '#fdeeed',
          200: '#fbd5d2',
          300: '#f8bcb7',
          400: '#f08e80', // Your main coral color
          500: '#e07d70',
          600: '#d06c5f',
          700: '#c05b4e',
          800: '#b04a3d',
          900: '#a0392c',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      boxShadow: {
        'coral': '0 4px 14px 0 rgba(240, 142, 128, 0.25)',
        'coral-lg': '0 10px 25px 0 rgba(240, 142, 128, 0.3)',
      }
    },
  },
  plugins: [],
}

