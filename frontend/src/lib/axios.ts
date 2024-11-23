import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.API_BASE_URL,
})

axios.interceptors.response.use(() => {
  return new Promise((resolve) => setTimeout(resolve, 2000))
})
