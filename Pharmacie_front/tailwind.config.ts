import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
      '30': '30rem',
    },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "winter",
      "night",
      "lemonade",
      "aqua",
      "light",
      "nord",
      "sunset",
      "black",
    ],
  },
 
}
export default config
