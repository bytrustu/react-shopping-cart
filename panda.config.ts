import { defineConfig } from '@pandacss/dev';
import { tokens } from '@/styles/tokens';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.stories.{tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
