/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        army: {
          green: '#228B22',   // forest green
          red: '#cc0000',
          dark: '#1a1a1a',
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      }
    }
  },
  plugins: []
}
