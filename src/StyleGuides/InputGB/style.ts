import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrorRed: boolean
  isSuccess: boolean
}

export const SuperContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};

  label {
    font-family: ${props => props.theme.fontFamily.Metropolis};
    font-size: ${props => props.theme.fontSize.medium};
    margin-bottom: ${props => props.theme.Spacing[3]};
  }
`

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.background};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.graysScale.grayLight};
  width: 100%;
  height: 46px;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;

  ${props =>
    props.isErrorRed &&
    css`
      border-color: ${props.theme.colors.feedBack.alertDark};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.graysScale.grayMedium};
    `}

    ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.graysScale.grayLight};
    `}

  input {
    background: transparent;
    color: #232129;
    border: none;
    width: 100%;
    margin-left: ${props => props.theme.Spacing[2]};
    font-family: ${props => props.theme.fontFamily.Metropolis};
    font-size: ${props => props.theme.fontSize.large};
  }

  input:focus {
    box-shadow: none;
    outline: none;
  }

  .showPassword {
    cursor: pointer;
  }

  svg {
    margin-right: 20px;
    margin-left: 10px;
  }
`

export const Error = styled.div`
  height: 20px;
  margin-top: ${props => props.theme.Spacing[2]};

  span {
    color: ${props => props.theme.colors.feedBack.alertDark};
  }
`
