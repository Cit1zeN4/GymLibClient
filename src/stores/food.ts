import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  AppClient,
  OpenAPI,
  type CreateFoodRequest,
  type FoodShortDtoResponseData
} from '@/api/codegen'

export const foodStore = defineStore('food', () => {
  const isLodaded = ref(false)
  const foodList = ref<FoodShortDtoResponseData>()

  async function add(data: CreateFoodRequest) {
    const client = new AppClient(OpenAPI)

    await client.food.postFood({ requestBody: data })
  }

  async function load(
    skip: number,
    take: number,
    search: string | undefined,
    dateStart: string | undefined,
    dateEnd: string | undefined
  ) {
    isLodaded.value = false
    const client = new AppClient(OpenAPI)

    const response = await client.food.postFoodList({
      requestBody: { skip, take, search, dateStart, dateEnd }
    })
    foodList.value = response
    isLodaded.value = true
  }

  async function remove(id: number) {
    const client = new AppClient(OpenAPI)

    await client.food.deleteFood({ id })
  }

  return { isLodaded, foodList, add, load, remove }
})
