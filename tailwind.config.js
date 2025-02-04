const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    '.src/app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config;