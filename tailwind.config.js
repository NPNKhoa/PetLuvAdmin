/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f79400',
          light: '#f7aa2d',
          dark: '#d87a00',
        },
        secondary: {
          light: '#3365ac',
          'supper-light': '#6595d8',
          DEFAULT: '#0e1826',
        },
        tertiary: {
          light: '#efefef',
          dark: '#aeaeae',
        },
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    },
  },
  plugins: [],
};
