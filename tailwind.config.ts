import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        heritage: {
          navy: '#1a2f4a',
          'navy-dark': '#0f1d2e',
          'navy-light': '#1e3a5f',
          gold: '#c9a227',
          bronze: '#b8860b',
          stone: '#f5f2eb',
          parchment: '#ebe6dc',
          charcoal: '#2d2d2d',
        },
      },
      backgroundImage: {
        'map-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30 30 60 0 30z\' fill=\'%23ffffff\' fill-opacity=\'0.03\'/%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\' stroke=\'%23c9a227\' stroke-opacity=\'0.06\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
        'parchment-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(201, 162, 39, 0.25)',
        'glow-gold-lg': '0 0 40px rgba(201, 162, 39, 0.2)',
        'inner-vintage': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'shimmer': { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
