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
          gray: '#FAFBFC',
          border: '#E5E7EB',
          text: '#1A1D23',
          'text-light': '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 2px 8px -2px rgb(0 0 0 / 0.07)',
      },
    },
  },
  plugins: [],
}
