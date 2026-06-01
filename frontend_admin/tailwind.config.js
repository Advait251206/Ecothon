export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f7fee7',  // Very light lime/off-white
          100: '#ecfccb', // Light lime
          200: '#d9f99d', // Pale lime
          300: '#bef264', // Bright lime
          400: '#a3e635', // Action Lime (Primary Accent)
          500: '#84cc16', // Element Green
          600: '#65a30d', // Darker Lime
          700: '#4d7c0f', // Muted Green
          800: '#3f6212', // Forest base
          900: '#14532d', // Deep Forest (Secondary BG)
          950: '#022c22', // Darkest Green (Main BG)
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
