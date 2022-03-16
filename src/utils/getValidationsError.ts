import { ValidationError } from 'yup'
interface Errors {
  [key: string]: string
}

function getValidationsErros(err: ValidationError): Errors {
  const ValidationErrors: Errors = {}
  err.inner.forEach(error => {
    ValidationErrors[error.path] = error.message
  })

  return ValidationErrors
}

export default getValidationsErros
