module.exports = {
  theme: {
    fontFamily: {
      'sans': ['"Noto Sans"'],
      'mono': ['"IBM Plex Mono"'],
    },
    customForms: theme => ({
      default: {
        'input, select': {
          borderRadius: theme('borderRadius.lg'),
          backgroundColor: theme('colors.gray.200'),
          boxShadow: theme('boxShadow.sm'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            outline: 0
          }
        },
        select: {
          iconColor: theme('colors.gray.600'),
        },
      },
    })
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}