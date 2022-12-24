import React, { useEffect } from 'react'
import useFetch from './../../hooks/useFetch'
import { PHOTO_GET } from '../../services/api'
import Error from '../helper/Error'
import Loading from '../helper/Loading'
import PhotoContent from '../Photo/PhotoContent'

import styles from './FeedModal.module.css'

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch()

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id)
    const { response, json } = request(url, options)
    console.log(response, json)
  }, [request, photo])

  function handleOutSideClick(event) {
    console.log('Target: ', event.target)
    console.log('Current: ', event.currentTarget)

    if (event.target === event.currentTarget) setModalPhoto(null)
  }

  return (
    <div className={styles.modal} onClick={handleOutSideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  )
}

export default FeedModal
