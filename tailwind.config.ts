import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f6fb',
          100: '#e3ebf6',
          200: '#c3d5eb',
          300: '#93b4d9',
          400: '#5c8dc3',
          500: '#396dab',
          600: '#28558e',
          700: '#204573',
          800: '#1d3a60',
          900: '#1b3251',
          950: '#0f1e33',
        },
        accent: {
          500: '#b1893f',
          600: '#96702f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '46rem',
        shell: '84rem',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#27324a',
            '--tw-prose-headings': '#1b3251',
            '--tw-prose-links': '#204573',
            '--tw-prose-bold': '#1b3251',
            '--tw-prose-quotes': '#204573',
            maxWidth: 'none',
            lineHeight: '1.75',
            a: { textUnderlineOffset: '3px', fontWeight: '600' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
