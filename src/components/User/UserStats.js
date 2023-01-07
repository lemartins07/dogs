import React from 'react'
import Head from '../helper/Head'
import useFetch from '../../hooks/useFetch'
import { STATS_GET } from '../../services/api'
import Error from '../helper/Error'
import Loading from '../helper/Loading'
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch()

  React.useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem('token')
      const { url, options } = STATS_GET(token)
      await request(url, options)
    }
    getData()
  }, [request])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <section>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </section>
    )
  else return null
}

export default UserStats
