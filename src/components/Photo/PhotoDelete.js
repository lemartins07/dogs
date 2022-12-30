import React from 'react'

import { PHOTO_DELETE } from '../../services/api'
import useFetch from './../../hooks/useFetch'

import styles from './PhotoDelete.module.css'

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch()

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar essa foto?')

    if (confirm) {
      const token = window.localStorage.getItem('token')
      const { url, options } = PHOTO_DELETE(id, token)
      const { response } = await request(url, options)

      if (response.ok) window.location.reload()
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando...
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  )
}

export default PhotoDelete
