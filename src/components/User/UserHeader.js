import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import UserHeaderNav from './UserHeaderNav'

import styles from './UserHeader.module.css'

const UserHeader = () => {
  const location = useLocation()
  const [title, setTitle] = useState('')

  useEffect(() => {
    const { pathname } = location

    switch (pathname) {
      case '/conta/estatisticas':
        setTitle('Estatísticas')
        break
      case '/conta/postar':
        setTitle('Poste sua foto')
        break
      default:
        setTitle('Minha conta')
        break
    }
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader
