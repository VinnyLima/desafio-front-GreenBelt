//IMPORTAÇÕES BIBLIOTECAS
import React, { useCallback, useRef } from 'react'
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
import { ICreateEmpresaDTO } from '../../../../pagesDTOs/admin/empresa.dto'
interface IModalCadastroProps {
  openCloseModal: boolean
  handleCloseModal: () => void
}

const ModalCadastro: React.FC<IModalCadastroProps> = ({
  openCloseModal,
  handleCloseModal
}) => {
  const formRefCad = useRef<FormHandles>(null)

  /**
   * Metodo responsÁvel por realizar o cadastro da empresa
   */
  const handleCriarEmpresa = useCallback(async (data: ICreateEmpresaDTO) => {
    try {
      formRefCad.current?.setErrors({})

      const schema = Yup.object().shape({
        nomeEmpresa: Yup.string().required('O nome da empresa é obrigatório')
      })
      await schema.validate(data, { abortEarly: false })

      const { nomeEmpresa } = data
      await api.post('/empresa', { nomeEmpresa })

      handleCloseModal()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsErros(error)

        formRefCad.current?.setErrors(errors)
      }
      console.log(error)
    }
  }, [])

  return (
    <Modal
      aria-labelledby="modal-cadastro-empresa"
      aria-describedby="modal-cadastro-empresa-transition"
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
              <h3 id="modal-cadastro-empresa">Cadastrar nova Empresa</h3>
              <button onClick={handleCloseModal}>
                <MdClear />
              </button>
            </section>
            <Form
              ref={formRefCad}
              onSubmit={handleCriarEmpresa}
              id="modal-cadastro-empresa-transition"
            >
              <InputGB
                name="nomeEmpresa"
                label="Nome da empresa"
                type="text"
                placeholder="GreenBelt"
              />

              <div className="containerButon">
                <ButtonGB variant="primary-w-icon" icon={MdSave}>
                  Salvar
                </ButtonGB>
              </div>
            </Form>
          </Container>
        </SuperContainer>
      </Fade>
    </Modal>
  )
}

export { ModalCadastro }
