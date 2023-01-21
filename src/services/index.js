import axios from 'axios'
import router from '@/router'
import { setGlobalLoading } from '@/store/global'
import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feebacks'

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

// Em toda requisição verifica se tem token e coloca na configuração do request
httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// intercepta erros para disparar apenas os tipos de erros não tratados no componente
// só vai cair no try catch do componente (handleSubmit do ModalLogin) os erros tratados abaixo
httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request?.status === 0 ||
  error?.request?.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  // Se token false, redireciona para home, não faz login
  if (error.response?.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
