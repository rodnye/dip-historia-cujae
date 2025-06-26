module.exports = {
  content: ['./src/**/*.{css,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serrat: 'var(--font-serrat)',
      },
      colors: {
        body: 'var(--color-body)',
        primary: 'var(--color-primary)',
        'primary-content': 'var(--color-primary-content)',
        'body-content': 'var(--color-body-content)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
