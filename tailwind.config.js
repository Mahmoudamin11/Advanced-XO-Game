/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'primary': "var(--primary)",
        'cardColor': 'var(--cardColor)',
        'blueX': 'var(--blueX)',
        'orangeO': 'var(--orangeO)',
        'white': 'var(--white)',
        'exit' : 'var(--exit)',
      },
      keyframes: { 
        changeOpacity: {
          '0%':{ opacity: '100%' },
          '25%': { opacity: '50%' },
          '50%': { opacity: '25%' },
          '75%': { opacity: '75%' },
          '100%': { opacity: '100%' },
        },
        moveAsNo: { 
          '0%': {transform: 'translateX(3px)'},
          '25%': {transform: 'translateX(-3px)'},
          '50%': {transform: 'translateX(3px)'},
          '75%': {transform: 'translateX(-3px)'},
          '100%': {transform: 'translateX(3px)'},
        },
        moveAsYeah: { 
          '0%': {transform: 'translateY(3px)'},
          '25%': {transform: 'translateY(-3px)'},
          '50%': {transform: 'translateY(3px)'},
          '75%': {transform: 'translateY(-3px)'},
          '100%': {transform: 'translateY(3px)'},
        },
        
      },
      animation: {
        'changeOpacity': 'changeOpacity 2s linear infinite',
        'moveAsNo': 'moveAsNo 1.5s linear infinite',
        'moveAsYeah': 'moveAsYeah 1.5s linear infinite',
      },
      boxShadow: { 
        'xShadow': '0px 4px var(--blueXShadow)',
        'xHoverShadow': '0px 6px var(--blueXShadow)',
        'oShadow': '0px 4px var(--orangeOShadow)',
        'oHoverShadow': '0px 6px var(--orangeOShadow)',
        'cardShadow': '0px 4px var(--cardShadow)',
        'cardHoverShadow': '0px 6px var(--cardShadow)',
        'whiteShadow': '0px 4px var(--whiteShadow)',
        'whiteHoverShadow': '0px 6px var(--whiteShadow)',
      },
      fontFamily: { 
        'rubik': 'var(--rubik)'
      },
    },
  },
  plugins: [],
}