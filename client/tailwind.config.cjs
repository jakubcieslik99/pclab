/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./assets/pattern-hero.png')",
        test: "url('./assets/test.png')",
      },
      colors: {
        'pclab-400': '#850b45',
        'pclab-500': '#301642',
        'pclab-600': '#051b41',
      },
      transitionProperty: {
        nav: 'transform, opacity',
      },
    },
  },
  plugins: [],
}
