/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0A1F44',
          50: '#E8ECF5',
          100: '#D1D9EB',
          200: '#A3B3D7',
          300: '#758DC3',
          400: '#4767AF',
          500: '#0A1F44',
          600: '#081938',
          700: '#06132C',
          800: '#040D20',
          900: '#020714'
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#F9F4E8',
          100: '#F3E9D1',
          200: '#E7D3A3',
          300: '#DBBD75',
          400: '#CFA747',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#806921',
          800: '#554616',
          900: '#2B230B'
        },
        sapphire: {
          DEFAULT: '#2C6DBF',
          50: '#E9F1FC',
          100: '#D3E3F9',
          200: '#A7C7F3',
          300: '#7BABEC',
          400: '#4F8FE6',
          500: '#2C6DBF',
          600: '#235799',
          700: '#1A4173',
          800: '#112B4D',
          900: '#081526'
        },
        neutral: {
          cream: '#F8F8F8',
          charcoal: '#2E2E2E'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'parallax': 'parallax 20s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        parallax: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}
