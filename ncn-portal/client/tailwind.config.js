/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ncn: {
          green:  '#1B5E20',
          'green-light': '#2E7D32',
          red:    '#B71C1C',
          'red-light': '#C62828',
          gold:   '#F9A825',
          dark:   '#0D2110',
          body:   '#F5F5F5',
          text:   '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
