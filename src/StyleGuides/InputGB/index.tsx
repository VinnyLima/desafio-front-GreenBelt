/**
 * Importações Globais
 */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  FormEvent
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

/**
 * Importações Locais
 */

/**
 * Estilização do Componente
 */
import { Container, Error, SuperContainer } from './style'
import {
  cep,
  currency,
  cpfCnpj,
  telefoneMask,
  placaCarro,
  placaCarro1
} from '../../utils/masks'

/**
 * Interfaces
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  mask?: 'cep' | 'currency' | 'cpfCnpj' | 'cnpj' | 'telefone' | 'placaCarro1'
  label?: string
  helpText?: string
  icon?: React.ComponentType<IconBaseProps>
  icon2?: React.ComponentType<IconBaseProps>
  setExibeSenhaProp?: React.Dispatch<React.SetStateAction<boolean>>
}

const InputGB: React.FC<InputProps> = ({
  name,
  icon: Icon,
  icon2: Icon2,
  label,
  helpText,
  mask: Mask,
  setExibeSenhaProp,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFild] = useState(false)
  const [exibirSenha, setExibirSenha] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFild(!!inputRef.current?.value)
  }, [])

  const handleKeyUp = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      if (Mask === 'cep') {
        cep(e)
      }
      if (Mask === 'currency') {
        currency(e)
      }
      if (Mask === 'cpfCnpj') {
        cpfCnpj(e)
      }
      if (Mask === 'telefone') {
        telefoneMask(e)
      }
      if (Mask === 'placaCarro1') {
        placaCarro1(e)
      }
    },
    [Mask]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const showPassword = useCallback(() => {
    if (exibirSenha === true) {
      setExibirSenha(false)
      setExibeSenhaProp(false)
    }

    if (exibirSenha === false) {
      setExibirSenha(true)
      setExibeSenhaProp(true)
    }
  }, [exibirSenha, setExibirSenha])

  return (
    <SuperContainer>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Container
        isErrorRed={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        isSuccess
      >
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyUp={handleKeyUp}
          defaultValue={defaultValue}
          ref={inputRef}
          type={
            (!exibirSenha && name === 'senha') || name === 'idSenha'
              ? 'password'
              : 'text'
          }
          {...rest}
        />
        {Icon2 && (
          <Icon2 onClick={showPassword} size={20} className="showPassword" />
        )}
      </Container>
      {error && (
        <Error title={error}>
          <span>{error}</span>
        </Error>
      )}
    </SuperContainer>
  )
}

export { InputGB }
