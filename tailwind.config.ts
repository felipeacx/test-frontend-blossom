import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EEE3FF",
          600: "#8054C7",
          700: "#5A3696",
        },
        secondary: {
          600: "#63D838",
        },
      },
    },
  },
  plugins: [],
}
export default config
