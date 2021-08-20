// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/index.html',
    './src/index.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
