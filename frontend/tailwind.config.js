import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}', // Adjust this path based on your project structure
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('daisyui')], // Add DaisyUI as a plugin
// };

