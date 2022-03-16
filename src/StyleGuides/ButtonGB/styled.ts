import styled from 'styled-components'
import PropTypes from 'prop-types'

interface ContainerProps {
  variants?: 'primary' | 'outlined' | 'primary-w-icon' | 'secondary'
  disabled?: boolean
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;

  height: ${props =>
    props.variants === 'primary' || props.variants === 'outlined'
      ? '48px'
      : props.variants === 'primary-w-icon'
      ? '40px'
      : props.variants === 'secondary'
      ? '40px'
      : '48px'};
  width: 100%;
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.medium};
  font-family: ${props => props.theme.fontFamily.Metropolis};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  color: ${props =>
    props.variants === 'outlined'
      ? props.theme.colors.primary[900]
      : props.variants === 'secondary'
      ? props.theme.colors.primary[600]
      : props.theme.colors.graysScale[50]};
  border-radius: 5px;

  background-color: ${props =>
    props.variants === 'primary'
      ? props.theme.colors.primary[900]
      : props.variants === 'outlined'
      ? 'transparent'
      : props.variants === 'primary-w-icon'
      ? props.theme.colors.primary[900]
      : props.variants === 'secondary'
      ? 'transparent'
      : props.theme.colors.background};

  border: ${props =>
    props.variants === 'outlined'
      ? '2px solid ' + props.theme.colors.primary[900]
      : 'none'};

  transition: 500ms;

  &:hover {
    background-color: ${props =>
      props.variants === 'primary'
        ? props.theme.colors.primary[600]
        : props.variants === 'outlined'
        ? props.theme.colors.primary[900]
        : props.variants === 'primary-w-icon'
        ? props.theme.colors.primary[600]
        : props.variants === 'secondary'
        ? props.theme.colors.primary[600]
        : props.theme.colors.graysScale[50]};

    color: ${props =>
      props.variants === 'outlined'
        ? props.theme.colors.graysScale[50]
        : props.variants === 'secondary'
        ? props.theme.colors.graysScale[50]
        : props.theme.colors.graysScale[50]};
  }

  &:disabled {
    transition: none;
    cursor: not-allowed;
    opacity: 0.7;
    background-color: ${props =>
      props.variants === 'primary'
        ? props.theme.colors.graysScale[100]
        : props.variants === 'outlined'
        ? props.theme.colors.background
        : props.variants === 'primary-w-icon'
        ? props.theme.colors.graysScale[100]
        : props.variants === 'secondary'
        ? props.theme.colors.graysScale[100]
        : props.theme.colors.background};

    color: ${props =>
      props.variants === 'outlined'
        ? props.theme.colors.graysScale[400]
        : props.variants === 'secondary'
        ? props.theme.colors.graysScale[400]
        : props.variants === 'primary-w-icon'
        ? props.theme.colors.graysScale[400]
        : props.variants === 'primary'
        ? props.theme.colors.graysScale[400]
        : props.theme.colors.graysScale[50]};

    border: ${props =>
      props.variants === 'outlined'
        ? '2px solid ' + props.theme.colors.graysScale[200]
        : 'none'};

    &:hover {
      background-color: ${props =>
        props.variants === 'primary'
          ? props.theme.colors.graysScale[100]
          : props.variants === 'outlined'
          ? props.theme.colors.background
          : props.variants === 'primary-w-icon'
          ? props.theme.colors.graysScale[100]
          : props.variants === 'secondary'
          ? props.theme.colors.graysScale[100]
          : props.theme.colors.background};

      color: ${props =>
        props.variants === 'outlined'
          ? props.theme.colors.graysScale[400]
          : props.variants === 'secondary'
          ? props.theme.colors.graysScale[400]
          : props.variants === 'primary-w-icon'
          ? props.theme.colors.graysScale[400]
          : props.variants === 'primary'
          ? props.theme.colors.graysScale[400]
          : props.theme.colors.graysScale[50]};

      border: ${props =>
        props.variants === 'outlined'
          ? '2px solid ' + props.theme.colors.graysScale[200]
          : 'none'};
    }
  }

  svg {
    margin-right: 5px;
  }
`
