import React from 'react'

import Input from '../Form/Input'
import Button from '../Form/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { PASSWORD_LOST } from '../../services/api'
import Error from '../helper/Error'

const LoginPasswordLost = () => {
  const login = useForm()
  const { request, error, loading, data } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: window.location.href.replace('perdeu', 'resetar'),
    })
    await request(url, options)
  }
  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>E-mail enviado.</p>
      ) : (
        <form className="" onSubmit={handleSubmit}>
          <Input label="E-mail / Usuário" type="text" name="login" {...login} />
          {<Error error={error} />}
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar e-mail</Button>
          )}
        </form>
      )}
    </section>
  )
}
export default LoginPasswordLost
