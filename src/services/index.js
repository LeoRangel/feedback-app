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

export default {
  auth: AuthService(httpClient)
}
