import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'agm-blue': '#0066CC',
        'agm-green': '#00A86B',
        'agm-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
export default config