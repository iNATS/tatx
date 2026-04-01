/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1F4',
          100: '#FFE8EE',
          200: '#FFD1DD',
          300: '#FFA9BF',
          400: '#F67A99',
          500: '#DA3C57',
          600: '#B72249',
          700: '#961D3E',
          800: '#7A1C36',
          900: '#661C31',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#34C759',
          600: '#2FA84A',
          700: '#278A3D',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#FF3B30',
          600: '#DC2626',
          700: '#B91C1C',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#FF9500',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
