import { useEffect } from 'react'
import useFecth from '../../hooks/useFetch'
import { PHOTOS_GET } from '../../services/api'
import FeedPhotoItem from './FeedPhotoItem'
import Error from '../helper/Error'
import Loading from '../helper/Loading'

import styles from './FeedPhotos.module.css'

const FeedPhotos = ({ page, user, setModalPhoto, setInfinity }) => {
  const { data, loading, error, request } = useFecth()

  useEffect(() => {
    async function fetchPhotos() {
      const total = 6
      const { url, options } = PHOTOS_GET({ page, total, user })
      const { response, json } = await request(url, options)

      if (response && response.ok && json.length < total) {
        setInfinity(false)
      }
    }
    fetchPhotos()
  }, [request, user, page, setInfinity])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <ul className={`animeLeft ${styles.feed}`}>
        {data.map((photo) => (
          <FeedPhotoItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    )
  else return null
}

export default FeedPhotos
