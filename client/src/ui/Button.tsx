import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

export const Button: FC<
  PropsWithChildren<{
    onClick?: CallableFunction
    outline?: boolean
    className?: string
    variant?: 'red' | string
    size?: 'xl' | 'md'
    shadow?: boolean
    disabled?: boolean
  }>
> = ({
  onClick,
  outline,
  className,
  variant,
  size = 'xl',
  shadow = true,
  disabled,
  children,
}) => {
  const theme = {
    red: 'bg-red-primary shadow-red-shadow text-white',
    white: 'border-red-primary border text-red-primary',
  }
  return (
    <button
      onClick={() => onClick?.()}
      className={clsx(
        'btn transform cursor-pointer touch-manipulation select-none transition-all duration-100 will-change-transform  disabled:pointer-events-none disabled:opacity-50',
        variant ? theme[variant as keyof Object] : null,
        size === 'xl' ? 'py-3 px-8 font-semibold' : 'py-2 px-4 text-sm',
        shadow && 'shadow-md active:translate-y-0.5 active:shadow-sm',
        outline !== undefined ? 'bg-none' : '',
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
