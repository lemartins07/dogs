import React, { createContext, useState, useEffect, useCallback } from 'react'
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function getUser(token) {
    const { url, options } = USER_GET(token)

    const response = await fetch(url, options)
    const json = await response.json()

    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({ username, password })
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`Usuário ou senha inválidos`)
      const { token } = await response.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    } catch (err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  const userLogout = useCallback(async () => {
    setData(null)
    setError(null)
    setLoading(null)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          if (!response.ok) throw new Error('Token inválido')
          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setLogin(false)
      }
    }

    autoLogin()
  }, [userLogout])

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  )
}
