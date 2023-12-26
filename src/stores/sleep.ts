import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  AppClient,
  OpenAPI,
  type SleepResponse,
  type SleepResponseResponseData
} from '@/api/codegen'

export const sleepStore = defineStore('sleep', () => {
  const sleepList = ref<SleepResponseResponseData>()
  const isLoaded = ref(false)

  function getLastWeek(date: Date) {
    return new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
  }

  function getDateStr(date: Date, utc: boolean = false) {
    var dd = String(utc ? date.getUTCDate() : date.getDate()).padStart(2, '0')
    var mm = String(utc ? date.getUTCMonth() + 1 : date.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  function getShortDate(date: Date) {
    var dd = String(date.getUTCDate()).padStart(2, '0')
    var mm = String(date.getUTCMonth() + 1).padStart(2, '0') //January is 0!
    return dd + '-' + mm
  }

  async function add(hours: number, minutes: number, date: string | undefined) {
    const client = new AppClient(OpenAPI)

    const response = await client.sleep.postSleep({
      requestBody: {
        value: hours * 60 + minutes,
        date: date ?? getDateStr(new Date())
      }
    })
  }

  async function getList(
    skip: number,
    take: number,
    dateStart: string | undefined,
    dateEnd: string | undefined
  ) {
    isLoaded.value = false
    const client = new AppClient(OpenAPI)

    const response = await client.sleep.getSleep({
      skip,
      take,
      dateStart,
      dateEnd
    })

    sleepList.value = response
    isLoaded.value = true
  }

  async function remove(id: number) {
    const client = new AppClient(OpenAPI)

    await client.sleep.deleteSleep({ id })
  }

  return { isLoaded, sleepList, add, remove, getList, getDateStr, getLastWeek, getShortDate }
})
