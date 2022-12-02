import React from 'react'

import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import useForm from '../../hooks/useForm'

const LoginForm = () => {
  const username = useForm()
  const password = useForm()

  function handleSubmit(event) {
    event.preventDefault()
    if (username.validate() && password.validate()) {
      fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((json) => console.log(json))
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
    </section>
  )
}

export default LoginForm
