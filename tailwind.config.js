// Precompiled Tailwind for the whole site (replaces the per-page Play CDN + inline configs).
// Rebuild after editing any HTML: npm run build:css
module.exports = {
  content: [
    './*.html',
    './!(assets|node_modules|implementation_handoffs)/**/*.html',
    './yup.js',
  ],
  theme: {
    extend: {
      colors: {
        zinc: { 850: '#202023' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
