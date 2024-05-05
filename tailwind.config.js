/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '1/2': '50%', // 50% margin
        '1/3': '33.33333%', // 33.33% margin
        '1/8': '12.5%',
        '2/3': '66.66667%', // 66.67% margin
        '1/6': '16.666667%',
        '15':'15%'
        // Add more percentage margins as needed
      },
      
      fontFamily: {
        'sans': ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}