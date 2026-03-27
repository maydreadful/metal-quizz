import type { Config } from "tailwindcss";

const config: Config|any = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores customizadas para sua estética
        'metal-black': '#050505',
        'blood-red': '#880808',
      },
    },
  },
  plugins: [],
};
export default config;