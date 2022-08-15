module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Khand: ['Khand, sans-serif'],
        heebo: ['Heebo, sans-serif'],
        bogart: ['Bogart', 'sans-serif'],
      },
      fontSize: {
        '6xl': ['64px', '80px'],
        '7xl': ['72px', '96px'],
        '8xl': ['96px', '128px'],
      },
    },
    container: {
      center: true,
      padding: '0.5rem',
      screens: {
        lg: '1124px',
        xl: '1124px',
        '2xl': '1440px',
      },
    },

    colors: {
      black: '#000',
      carbonBlue: '#000F1D',
      darkPearl: '#051422',
      stoneBlue: '#0A1826',
      woodBlue: '#172634',
      polar: '#EEF6FD',
      casper: '#8BA2B2',
      daisy: '#FFEF60',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '1rem',
      '2xl': '2rem',
      full: '9999px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
