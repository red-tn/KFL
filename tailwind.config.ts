import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#f0f5f4',
          100: '#d5e3df',
          200: '#adc7be',
          300: '#7da596',
          400: '#55836f',
          500: '#3a6b55',
          600: '#2a5542',
          700: '#1e4433',
          800: '#153425',
          900: '#0d2318',
          950: '#07150e',
        },
        clay: {
          50: '#fdf5f0',
          100: '#f7e2d4',
          200: '#edc5a8',
          300: '#d9a07a',
          400: '#c47d52',
          500: '#b0623a',
          600: '#964d2b',
          700: '#7a3d22',
          800: '#5e2f1a',
          900: '#432113',
        },
        amber: {
          50: '#fdf9ef',
          100: '#f8edcf',
          400: '#d4a24e',
          500: '#c49030',
          600: '#a87928',
        },
        bark: {
          50: '#faf8f5',
          100: '#f0ece6',
          200: '#e0d9cf',
          300: '#c4b9aa',
          400: '#9e917f',
          500: '#7a6e5e',
          600: '#5c5244',
          700: '#423b30',
          800: '#2c2720',
          900: '#1a1612',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
