import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...rest }, ref) => {
    const classes = ['textarea', className].filter(Boolean).join(' ')

    return <textarea ref={ref} className={classes} {...rest} />
  },
)

TextArea.displayName = 'TextArea'
