import styled from 'styled-components'
import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/x-data-grid'

export const SuperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .Container {
    display: flex;
    flex-direction: column;
    width: 1024px;
  }

  .sectionTopo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 150px;
    border-bottom: 3px solid ${props => props.theme.colors.graysScale.dark};
    padding-bottom: 20px;

    button {
      width: 120px;
    }
  }
  .sectionDataGrid {
    height: 500px;
  }

  .groupButtonActions {
    display: flex;
    flex-direction: row;

    button {
      margin-right: 10px;
      border: none;
      background-color: transparent;
      cursor: pointer;

      svg {
        color: ${props => props.theme.colors.primary[700]};

        &:hover {
          color: ${props => props.theme.colors.feedBack.alertDark};
        }
      }
    }
  }
`

export const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  ptBR
)
