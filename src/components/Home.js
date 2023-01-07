import React from 'react'
import Feed from './Feed/Feed'
import Head from './helper/Head'

const Home = () => {
  return (
    <section className="container mainContainer">
      <Feed />
      <Head
        title="Fotos"
        description="Home do site Dogs, com o feed de fotos."
      />
    </section>
  )
}

export default Home
