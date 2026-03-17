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
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        forest: {
          50: '#f2f7f4',
          100: '#dce8e0',
          200: '#b5cebf',
          300: '#84ad93',
          400: '#5a8d6b',
          500: '#3d7252',
          600: '#2d5c40',
          700: '#1e4a32',
          800: '#163a27',
          900: '#0f2b1d',
          950: '#091a12',
        },
        earth: {
          50: '#faf6f1',
          100: '#f0e4d4',
          200: '#e0c6a5',
          300: '#cca06e',
          400: '#b87f45',
          500: '#a16832',
          600: '#8a5428',
          700: '#724322',
          800: '#5c361d',
          900: '#4a2c18',
          950: '#2f1a0e',
        },
        amber: {
          400: '#d4a24e',
          500: '#c49030',
          600: '#a87928',
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
