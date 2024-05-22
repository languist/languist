import type { SVGProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '../../utils'

const logoVariants = cva('[animationDuration:10000ms]', {
  variants: {
    variant: {
      default: 'text-primary',
      monochrome: 'text-black dark:text-white',
    },
    size: {
      default: 'h-16',
      sm: 'h-8',
      lg: 'h-24',
    },
    spin: {
      true: 'animate-spin',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    spin: false,
  },
})

const Logo = ({
  className,
  variant,
  size,
  spin,
  ...props
}: SVGProps<SVGSVGElement> & VariantProps<typeof logoVariants>) => (
  <svg
    className={cn(logoVariants({ variant, size, spin, className }))}
    fill="none"
    preserveAspectRatio="none"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m242.976 263.687-121.672-6.377c-14.506-.76-28.574 4.291-39.167 13.829-35.829 32.26-14.75 91.696 33.348 94.365l13.618.714c59.66 2.979 110.599-42.887 113.873-102.531ZM264.902 252.583l-43.663 113.746c-5.206 13.561-4.749 28.501 1.048 41.523 19.61 44.044 82.65 42.364 100.052-2.555l4.887-12.731c21.269-55.819-6.61-118.438-62.324-139.983ZM261.114 228.3l94.686 76.676c11.289 9.142 25.639 13.325 39.815 11.835 47.948-5.04 65.831-65.514 28.488-95.945l-10.598-8.582c-46.515-37.477-114.684-30.312-152.391 16.016ZM236.852 224.398l102.183-66.358c12.182-7.911 20.595-20.266 23.559-34.209 10.024-47.159-41.965-82.854-82.447-56.742l-11.436 7.427c-50.016 32.657-64.268 99.704-31.859 149.882ZM225.641 246.268 194.108 128.58c-3.76-14.031-12.911-25.85-25.256-32.977C127.1 71.497 77.086 109.911 89.41 156.48l3.53 13.172c15.603 57.66 74.964 91.933 132.701 76.616Z"
      fill="currentColor"
    />
  </svg>
)

export { Logo }
