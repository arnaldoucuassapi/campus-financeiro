/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#24352d',
        paper: '#fbfaf4',
        lime: '#d9f27c',
        'lime-dark': '#a6c936',
        'lime-ink': '#4d6414', // verde escuro legível para texto (contraste 6:1)
        tangerine: '#ff8b45',
        'tangerine-dark': '#b04a14', // laranja escuro legível para texto (contraste 5:1)
        cream: '#f3f1e7',
        mist: '#e6ead2',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: { retro: '4px 4px 0 #24352d', 'retro-sm': '2px 2px 0 #24352d' },
    },
  },
  plugins: [],
};
