/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundPosition: {
        'button-hover': 'calc(50% + 20px) 50%',
        button: '50% 60%'
      },
      backgroundSize: {
       '1.5': '150%'
      }
    },
  },
  plugins: [],
}

