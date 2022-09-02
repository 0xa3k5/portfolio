module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '6xl': ['64px', '80px'],
        '7xl': ['72px', '96px'],
        '8xl': ['96px', '128px'],
      },
      fontFamily: {
        vollkorn: ['Vollkorn', 'serif'],
        lato: ['Lato', 'sans-serif'],
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
      white: '#ffffff',
      daisy: '#FFEF60',
      midnight: '#06060B',
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
