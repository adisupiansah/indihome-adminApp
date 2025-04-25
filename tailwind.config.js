module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    variants: {
      extend: {
        opacity: ['group-hover'], // Aktifkan group-hover untuk opacity
      },
    },
  };