module.exports = {
  darkMode: 'class',
  purge: [],
  theme: {
    screens: {
      'sm': '375px',
      'md': '568px',
      'lg': '768px',
      'xl': '1024px'
    },
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif"
      },
      colors: {
        primary: {
          DEFAULT: 'var(--first-color)',
          'second': 'var(--first-color-second)',
          'lighter': 'var(--first-color-lighter)',
          'alt': 'var(--first-color-alt)',
          'title': 'var(--title-color)',
          'text': 'var(--text-color)',
          'textLight': 'var(--text-color-light)',
          'input': 'var(--input-color)',
          'body': 'var(--body-color)',
          'container': 'var(--container-color)'
        },
      },
      spacing: {
        '1.8': '0.438rem'
      }
    }
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
