import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/packages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        300: '300px',
        360: '360px',
        390: '390px',
        425: '425px',
        480: '480px',
        560: '560px',
        640: '640px',
        768: '768px',
        880: '880px',
        960: '960px',
        1024: '1024px',
        1180: '1180px',
        1240: '1240px',
        1300: '1300px',
        1400: '1400px',
        1600: '1600px',
      },
      boxShadow: {
        default: '0px 0px 15px 4px rgba(0,0,0,0.1)',
        100: '0px 1px 5px rgba(0, 0, 0, 0.1216)',
      },
      colors: {
        primary: {
          white: '#fff',
          black: '#000',
          main: '#2741D6',
          blue20: '#D9DDFA',
          blue50: '#367ef3',
          blue70: '#243bc1',
        },
        secondary: {
          transparentBlack30: '#0000004D',
          transparentBlack50: '#00000080',
          transparentBlack60: '#00000069',
          transparentBlack90: '#00000094',
        },
      },
      fontFamily: {
        primary: ['Outfit', 'Inter', 'Sans-Serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      animation: {
        float: 'float 2s linear infinite',
        float_a: 'float 2.5s linear infinite',
        float_b: 'float 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    backgroundImage: {
      'auth-bg': "url('/src/assets/auth/dash_auth_bg_2.png')",
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
