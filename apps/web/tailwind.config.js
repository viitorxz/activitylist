/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/App.tsx',
    './src/main.tsx',
    './src/components/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: 'Poppins, sans-serif',
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        overlayShow: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        contentShow: {
          from: {
            opacity: 0,
            transform: 'translate(-50%,-48%) scale(0.96)',
          },
          to: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
