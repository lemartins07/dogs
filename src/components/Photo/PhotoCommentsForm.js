import { useState } from 'react'
import { COMMENT_POST } from '../../services/api'
import useFetch from './../../hooks/useFetch'
import Error from '../helper/Error'

import { ReactComponent as Enviar } from '../../Assets/enviar.svg'

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = useState('')
  const { request, error } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = COMMENT_POST(id, { comment })
    const { response, json } = await request(url, options)
    if (response.ok) {
      setComment('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="comment"
        id="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
