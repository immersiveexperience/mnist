/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/mnist/src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        monoton: ['Monoton', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
