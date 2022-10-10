/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        heropattern: "url('./assets/pattern-hero.png')",
      },
      colors: {
        'pclab-400': '#850b45',
        'pclab-500': '#301642',
        'pclab-600': '#051b41',
      },
      transitionProperty: {
        nav: 'transform, opacity',
        components: 'max-height, opacity',
      },
    },
  },
  plugins: [],
}
