/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      blue: '#4791db',
      red: '#d32f2f',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'light',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true,
  },
};
