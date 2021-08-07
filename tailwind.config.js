module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif"
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(250,69%,61%)',
          'lighter': 'hsl(250,92%,85%)',
          'alt': 'hsl(250,57%,53%)',
          'title': 'hsl(250,8%,15%)',
          'text': 'hsl(250,8%,61%)',
          'textLight': 'hsl(250,8%,61%)',
          'input': 'hsl(250,70%,96%)',
          'body': 'hsl(250,60%,99%)',
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
