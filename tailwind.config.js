module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    //Setup specific colors here or extend them below in extend {}
    colors: {
      black : '#000000',
      white : '#ffffff',
      red: {
        500: 'rgba(239, 68, 68, 1)'
      },
      purple: {
        500: 'rgba(139, 92, 246, 1)'
      },
      yellow: {
        500: 'rgba(245, 158, 11, 1)'
      },
      pink: {
        500: 'rgba(236, 72, 153, 1)'

      },
      blue: {
        500: 'rgba(59, 130, 246, 1)'
      }

    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
