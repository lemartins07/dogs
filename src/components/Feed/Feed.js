import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = useState(null)
  const [pages, setPages] = useState([1])
  const [infinity, setInfinity] = useState(true)

  useEffect(() => {
    let wait = false

    function infityScroll() {
      if (infinity) {
        const scrollY = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight

        if (scrollY > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1])
          wait = true
          setTimeout(() => {
            wait = false
          }, 500)
        }
      }
    }

    window.addEventListener('wheel', infityScroll)
    window.addEventListener('scroll', infityScroll)

    return () => {
      window.removeEventListener('wheel', infityScroll)
      window.removeEventListener('scroll', infityScroll)
    }
  }, [infinity])

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          user={user}
          key={page}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinity={setInfinity}
        />
      ))}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
}

export default Feed
