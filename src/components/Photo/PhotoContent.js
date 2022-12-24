import React from 'react'

import styles from './PhotoContent.module.css'
import { Link } from 'react-router-dom'

const PhotoContent = ({ data }) => {
  const { photo, coments } = data
  console.log(coments)
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <p className={styles.author}>
          <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
          <span className={styles.visualizacoes}>{photo.acessos}</span>
        </p>
        <h1 className="title">
          <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso} kg</li>
          <li>
            {photo.idade} {photo.idade <= 1 ? 'ano' : 'anos'}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PhotoContent
