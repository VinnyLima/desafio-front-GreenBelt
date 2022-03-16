import React from 'react'
import Head from 'next/head'
import GreebeltLogo from '../assets/LogoPrincipal.svg'

import { Container } from '../styles/pages/Home'
import { ButtonGB } from '../StyleGuides/ButtonGB'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const router = useRouter()
  return (
    <Container>
      <Head>
        <title>Teste Developer</title>
      </Head>

      <GreebeltLogo />
      <h1>Teste de FrontEnd</h1>
      <p>Seja um belt e solucione problemas!</p>
      <div className="containerButton">
        <ButtonGB
          onClick={() => {
            console.log('clicou')
            router.push('/admin/empresas')
          }}
        >
          Empresa
        </ButtonGB>
        <ButtonGB>Usuários</ButtonGB>
      </div>
    </Container>
  )
}

export default Home
