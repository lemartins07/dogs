import { useEffect } from 'react'

import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import useForm from '../../hooks/useForm'
import { TOKEN_POST, USER_GET } from '../../services/api'

const LoginForm = () => {
  const username = useForm()
  const password = useForm()

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      getUser(token)
    }
  }, [])

  async function getUser(token) {
    const { url, options } = USER_GET(token)

    const response = await fetch(url, options)
    const json = await response.json()

    console.log(json)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      })

      const response = await fetch(url, options)
      const json = await response.json()

      window.localStorage.setItem('token', json.token)
      console.log(json)
      getUser(json.token)
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
