import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AppClient, OpenAPI, type UserShortDto } from '@/api/codegen'

export const meStore = defineStore(
  'me',
  () => {
    const userData = ref<UserShortDto>()

    async function getMe() {
      const client = new AppClient(OpenAPI)

      const response = await client.user.getUserMe()
      userData.value = response
    }

    async function changeName(newName: string) {
      const client = new AppClient(OpenAPI)

      await client.user.putUserMe({ newName })
    }

    async function changePassword(oldPassword: string, newPassword: string) {
      const client = new AppClient(OpenAPI)

      await client.gymLibApiVersion1000CultureNeutralPublicKeyTokenNull.postManageInfo({
        requestBody: { oldPassword, newPassword }
      })
    }

    return { userData, getMe, changeName, changePassword }
  },
  { persist: true }
)
