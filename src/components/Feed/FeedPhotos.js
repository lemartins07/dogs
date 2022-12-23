import { useEffect } from 'react'
import useFecth from '../../hooks/useFetch'
import { PHOTOS_GET } from '../../services/api'
import FeedPhotoItem from './FeedPhotoItem'
import Error from '../helper/Error'
import Loading from '../helper/Loading'

import styles from './FeedPhotos.module.css'

// { setInfite, page, user, setModalPhoto}

const FeedPhotos = ({ setModalPhoto }) => {
  const { data, loading, error, request } = useFecth()

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 })
      const { response, json } = await request(url, options)
      console.log(json, response)
    }
    fetchPhotos()
  }, [request])

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
