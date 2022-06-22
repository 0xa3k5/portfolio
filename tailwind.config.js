module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '6xl': ['60px', '80px'],
      },
      zIndex: {
        '-1': '-1',
      },
      backgroundImage: {},
      fontFamily: {
        playfair: ['Playfair Display, sans-serif'],
        inter: ['Inter, sans-serif'],
      },
      letterSpacing: {
        max: '0.25em',
      },
      blur: {
        '4xl': '128px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0.2, 0.6, 1) infinite',
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
      flamingo: '#FF00E5',
      valentino: '#330C45',
      lemon: '#FFFACD',
      spring: '#41FFA4',
      crimson: '#D83259',
      aqua: '#00FFF0',
      tiber: '#003330',
      capeCod: '#374244',
      cyprus: '#003F47',
      royal: '#6F1CD8',
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
  variants: {
    extend: {
      zIndex: ['hover'],
      inset: ['hover'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
