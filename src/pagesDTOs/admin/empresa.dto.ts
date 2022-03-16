export interface EmpresaDTO {
  id?: string
  nomeEmpresa: string
  flExcluido?: boolean
  dtCadastro?: Date
  dtAlteracao?: Date
}
export interface IReponseEmpresasDTO {
  sucesso: boolean
  mensagem: string
  data: EmpresaDTO[]
  statusCode: number
}

export interface IReponseEmpresaDTO {
  sucesso: boolean
  mensagem: string
  data: EmpresaDTO
  statusCode: number
}

export interface ICreateEmpresaDTO {
  nomeEmpresa: string
}
