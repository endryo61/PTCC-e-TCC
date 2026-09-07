/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ifb: {
          green: '#1e7e48',
          'green-dark': '#176b3c',
          'green-light': '#e6f2eb',
          gray: '#f8f9fa',
          border: '#dee2e6',
          text: '#212529',
          'text-light': '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
