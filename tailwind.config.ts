import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moroccan: {
          red: '#C1272D',
          green: '#006233',
          gold: '#D4AF37',
          terracotta: '#E07856',
          blue: '#0047AB',
          sand: '#F4E4C1',
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
