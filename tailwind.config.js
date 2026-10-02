/** @type {import('tailwindcss').Config} */

// As cores apontam para variáveis CSS (definidas em index.css) em canais RGB,
// para que Alto Contraste e Daltonismo possam trocar a paleta em todo o app.
const token = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(--ifb-${name}) / 1)`
    : `rgb(var(--ifb-${name}) / ${opacityValue})`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ifb: {
          green: token('green'),
          'green-dark': token('green-dark'),
          'green-light': token('green-light'),
          gray: token('gray'),
          border: token('border'),
          text: token('text'),
          'text-light': token('text-light'),
          cream: token('cream'),
          amber: token('amber'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
        card: '0 5px 16px #183b1d08',
        'card-hover': '0 14px 26px #183b1d12',
      },
    },
  },
  plugins: [],
}
