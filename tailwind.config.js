/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          bg: '#F6F8FC',
          card: '#FFFFFF',
          cyan: '#00B4D8',
          blue: '#0077B6',
          pink: '#E63946',
          gold: '#D4A373',
          emerald: '#10B981',
          accent: '#7209B7',
          dark: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'Consolas', 'monospace']
      },
      backgroundImage: {
        'goa-gradient': 'linear-gradient(135deg, #00B4D8 0%, #0077B6 50%, #7209B7 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF4D6D 0%, #FF8FA3 50%, #FFB703 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #06D6A0 0%, #118AB2 100%)',
        'vip-gradient': 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
        'glass-radial': 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.12), transparent 70%)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
