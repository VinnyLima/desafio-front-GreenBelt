//IMPORTAÇÕES BIBLIOTECAS
import React, { useCallback, useEffect, useRef } from 'react'
import { Fade, Modal } from '@mui/material'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'

//IMPORTAÇÕES COMPOENNTES INTERNOS
import { InputGB } from '../../../../StyleGuides/InputGB'
import { ButtonGB } from '../../../../StyleGuides/ButtonGB'
import getValidationsErros from '../../../../utils/getValidationsError'
import { api } from '../../../../services/apiClient'

// IMPORTAÇÕES STYLES E ICONES
import { Container, SuperContainer } from './styles'
import { MdClear, MdEditNote, MdSave } from 'react-icons/md'

//IMPORTAÇÕES INTERFACES
import {
  ICreateEmpresaDTO,
  IReponseEmpresaDTO
} from '../../../../pagesDTOs/admin/empresa.dto'
interface IModalCadastroProps {
  idEmpresa: string
  openCloseModal: boolean
  handleCloseModal: () => void
}

const ModalEdicao: React.FC<IModalCadastroProps> = ({
  idEmpresa,
  openCloseModal,
  handleCloseModal
}) => {
  const formRefCad = useRef<FormHandles>(null)

  /**
   * Metodo responsável por realizar o cadastro da empresa
   */
  const handleAtualizarEmpresa = useCallback(
    async (data: ICreateEmpresaDTO) => {
      try {
        formRefCad.current?.setErrors({})

        const schema = Yup.object().shape({
          nomeEmpresa: Yup.string().required('O nome da empresa é obrigatório')
        })
        await schema.validate(data, { abortEarly: false })

        const { nomeEmpresa } = data
        await api.put(`/empresa/${idEmpresa}`, { nomeEmpresa })

        handleCloseModal()
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErros(error)

          formRefCad.current?.setErrors(errors)
        }
        console.log(error)
      }
    },
    [idEmpresa]
  )

  const handleSetValuesEmpresa = useCallback(async (id: string) => {
    await api
      .get<IReponseEmpresaDTO>(`/empresa/${id}`)
      .then(response => {
        const { nomeEmpresa } = response.data.data
        formRefCad.current?.setFieldValue('nomeEmpresa', nomeEmpresa)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (openCloseModal) {
      handleSetValuesEmpresa(idEmpresa)
    }
  }, [openCloseModal])

  return (
    <Modal
      aria-labelledby="modal-edicao-empresa"
      aria-describedby="modal-edicao-empresa-transition"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      open={openCloseModal}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={openCloseModal}>
        <SuperContainer>
          <div className="containerIcon">
            <MdEditNote size={40} />
          </div>
          <Container>
            <section>
              <h3 id="modal-edicao-empresa">Editar Empresa</h3>
              <button onClick={handleCloseModal}>
                <MdClear />
              </button>
            </section>
            <Form
              ref={formRefCad}
              onSubmit={handleAtualizarEmpresa}
              id="modal-edicao-empresa-transition"
            >
              <InputGB
                name="nomeEmpresa"
                label="Nome da empresa"
                type="text"
                placeholder="GreenBelt"
              />

              <div className="containerButon">
                <ButtonGB variant="primary-w-icon" icon={MdSave}>
                  Atualizar
                </ButtonGB>
              </div>
            </Form>
          </Container>
        </SuperContainer>
      </Fade>
    </Modal>
  )
}

export { ModalEdicao }
