import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { PHOTO_GET } from '../../services/api'
import Error from '../helper/Error'
import Loading from '../helper/Loading'
import PhotoContent from './PhotoContent'

const Photo = () => {
  const { id } = useParams()
  const { request, data, loading, error } = useFetch()

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id)

    request(url, options)
  }, [request, id])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    )
}

export default Photo
