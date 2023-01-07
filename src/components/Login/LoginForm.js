import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import useForm from '../../hooks/useForm'
import Error from '../helper/Error'
import Head from '../helper/Head'

import styles from './LoginForm.module.css'
import stylesBtn from '../Form/Button.module.css'

const LoginForm = () => {
  const username = useForm()
  const password = useForm()

  const { userLogin, error, loading } = useContext(UserContext)

  async function handleSubmit(event) {
    event.preventDefault()

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <Error error={error && 'Dados incorretos.'} />}
      </form>
      <Link to="/login/perdeu" className={styles.perdeu}>
        Perdeu a senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>ainda não possui conta? Cadastre-se no site</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  )
}

export default LoginForm
