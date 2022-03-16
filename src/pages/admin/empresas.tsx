// BIBLIOTECAS EXTERNAS
import React, { useCallback, useState } from 'react'
import { ButtonGB } from '../../StyleGuides/ButtonGB'
import { SuperContainer, theme } from '../../styles/pages/admin/empresa.styles'
import Head from 'next/head'

import {
  DataGrid,
  ptBR,
  GridCellParams,
  GridColDef,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

// COMPOENNTES INTERNOS
import { LoadingPages } from '../../components/LoadingPages'
import { useFetch } from '../../hooks/useFetch'
import { ModalCadastro } from '../../components/admin/empresa/modalCadastro'
import { ModalEdicao } from '../../components/admin/empresa/modalEdicao'

// ESTILOS E ICONES
import { MdEdit, MdDelete, MdOutlineCheck } from 'react-icons/md'

// INTERFACES
import { IReponseEmpresasDTO } from '../../pagesDTOs/admin/empresa.dto'
import { api } from '../../services/apiClient'

interface IOpenMoldais {
  openModalCadastro?: boolean
  openModalEdicao?: boolean
}

const Empresa: React.FC = () => {
  const [openCloseModal, setOpenCloseModal] = useState<IOpenMoldais>({
    openModalCadastro: false,
    openModalEdicao: false
  })

  const [idEmpresa, setIdEmpresa] = useState<string>('')

  const { data: dataEmpresas } = useFetch<IReponseEmpresasDTO>('/empresa', 2000)

  const hadleOpenModal = useCallback(() => {
    setOpenCloseModal({ openModalCadastro: true })
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenCloseModal({ openModalCadastro: false })
  }, [])

  const hadleOpenModalEdicao = useCallback(
    (id: string) => {
      setIdEmpresa(id)
      setOpenCloseModal({ openModalEdicao: true })
    },
    [setIdEmpresa]
  )

  const handleCloseModalEdicao = useCallback(() => {
    setOpenCloseModal({ openModalEdicao: false })
  }, [])

  const handleDesativarEmpresa = useCallback(async (id: string) => {
    await api
      .delete(`/empresa/${id}`)
      .then(() => {})
      .catch(() => {
        console.log('Erro ao desativar empresa')
      })
  }, [])

  const columnsEmpresa: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 130,
      hideable: true
    },
    {
      field: 'nomeEmpresa',
      headerName: 'Nome da Empresa',
      width: 200
    },
    {
      field: 'flExcluido',
      headerName: 'Desativado?',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.flExcluido ? 'Sim' : 'Não'
      },
      width: 100
    },
    {
      field: 'dtCadastro',
      headerName: 'Data de Cadastro',
      width: 200
    },
    {
      field: 'dtAlteracao',
      headerName: 'Data de Alteração',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params: GridCellParams) => (
        <div className="groupButtonActions">
          <button
            onClick={() => {
              hadleOpenModalEdicao(params.id.toString())
            }}
          >
            <MdEdit size={20} title="Editar" />
          </button>

          <button
            onClick={() => {
              handleDesativarEmpresa(params.id.toString())
            }}
          >
            {params.row.flExcluido ? (
              <MdOutlineCheck size={20} title="Ativar" />
            ) : (
              <MdDelete size={20} title="Desativar" />
            )}
          </button>
        </div>
      ),
      width: 100
    }
  ]
  return (
    <SuperContainer>
      <Head>
        <title>Empresas</title>
      </Head>
      <div className="Container">
        <div className="sectionTopo">
          <div className="title">
            <h1>Empresas</h1>
            <span>Home/Empresas</span>
          </div>
          <ButtonGB onClick={hadleOpenModal}>Cadastrar</ButtonGB>
        </div>
        <div className="sectionDataGrid">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              {!dataEmpresas ? (
                <LoadingPages />
              ) : (
                <DataGrid
                  rows={dataEmpresas.data}
                  columns={columnsEmpresa}
                  pageSize={6}
                />
              )}
            </ThemeProvider>
          </StyledEngineProvider>
        </div>
      </div>

      <ModalCadastro
        openCloseModal={openCloseModal.openModalCadastro}
        handleCloseModal={handleCloseModal}
      />

      <ModalEdicao
        idEmpresa={idEmpresa}
        openCloseModal={openCloseModal.openModalEdicao}
        handleCloseModal={handleCloseModalEdicao}
      />
    </SuperContainer>
  )
}

export default Empresa
