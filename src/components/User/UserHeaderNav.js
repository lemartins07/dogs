import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from './../../context/UserContext'

import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg'
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg'
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg'
import { ReactComponent as Sair } from '../../Assets/sair.svg'

import styles from './UserHeaderNav.module.css'

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext)
  const [mobile, setMobile] = useState(null)

  function Provisoria() {
    setMobile(null)
  }
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <MinhasFotos /> {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto />
        {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && 'Sair'}
      </button>
      <button onClick={Provisoria}>Provisoria</button>
    </nav>
  )
}

export default UserHeaderNav
