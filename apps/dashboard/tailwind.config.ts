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
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-in',
      },
    },
  },
} satisfies Config
