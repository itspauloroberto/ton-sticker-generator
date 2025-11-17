import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', ...rest }, ref) => {
    const classes = [
      'btn',
      `btn-${variant}`,
      fullWidth ? 'btn-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} className={classes} {...rest} />
  },
)

Button.displayName = 'Button'
