import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3.vercel.app',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

// intercepta erros para disparar apenas os tipos de erros não tratados no componente
// só vai cair no try catch do componente (handleSubmit do ModalLogin) os erros tratados abaixo
httpClient.interceptors.response.use((response) => response, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  return error
})

export default {
  auth: AuthService(httpClient)
}
