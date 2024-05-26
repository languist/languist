import baseConfig from '@languist/ui/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'auth-pattern': "url('/auth-pattern.svg')",
      },
    },
  },
} satisfies Config
