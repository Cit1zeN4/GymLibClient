import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AppClient, OpenAPI, type UserShortDto } from '@/api/codegen'

export const meStore = defineStore('me', () => {
  const userData = ref<UserShortDto>()

  async function getMe() {
    const client = new AppClient(OpenAPI)

    const response = await client.user.getUserMe()
    userData.value = response
  }

  return { userData, getMe }
})
