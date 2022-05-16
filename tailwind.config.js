module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    borderRadius: {
      DEFAULT: '0.25rem',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      '6xl': '3rem'
    }
    // height: {
    //  148:"37rem"
    // }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
