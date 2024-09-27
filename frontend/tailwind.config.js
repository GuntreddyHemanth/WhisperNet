/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',              // Adjust the path for your project
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all necessary file types are covered
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};





// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// };
