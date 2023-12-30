import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        notojp: ['var(--font-notojp)'],
      },
      colors: {
        theme: "#059669" // green-600
      },
    },
  },
  plugins: [require("daisyui"), nextui()]
}
export default config
