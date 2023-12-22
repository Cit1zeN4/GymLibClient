import { defineStore } from 'pinia'
import { AppClient, OpenAPI } from '@/api/codegen'
import { ref } from 'vue'

export const authStore = defineStore('auth', () => {
  const isAuth = ref(false)

  async function register(email: string, password: string) {
    const client = new AppClient(OpenAPI)

    const response = await client.gymLibApi.postRegister({ requestBody: { email, password } })

    await login(email, password)
  }

  async function login(email: string, password: string) {
    const client = new AppClient(OpenAPI)

    const response = await client.gymLibApi.postLogin({
      useCookies: true,
      requestBody: { email, password }
    })

    isAuth.value = true
  }

  function logout() {
    isAuth.value = false
  }

  return { isAuth, register, login, logout }
})
