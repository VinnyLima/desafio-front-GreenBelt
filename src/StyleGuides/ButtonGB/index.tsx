import React, { ButtonHTMLAttributes, FC } from 'react'
import { IconBaseProps } from 'react-icons/lib'

import { Container } from './styled'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>
  variant?: 'primary' | 'outlined' | 'primary-w-icon' | 'secondary'
  disabled?: boolean
}

const ButtonGB: FC<IButtonProps> = ({
  children,
  icon: Icon,
  disabled,
  variant = 'primary',
  ...rest
}) => {
  return (
    <Container variants={variant} disabled={disabled} {...rest}>
      {Icon && <Icon />}
      {children}
    </Container>
  )
}

export { ButtonGB }
