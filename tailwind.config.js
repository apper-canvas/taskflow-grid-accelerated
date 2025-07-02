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
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        accent: {
          50: '#f7fee7',
          100: '#ecfccb',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
        },
        surface: '#f8fafc',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        hover: '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        confetti: 'confetti 0.8s ease-out',
        bounce: 'bounce 0.6s ease-out',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0.8) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}