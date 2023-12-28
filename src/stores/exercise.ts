import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  AppClient,
  OpenAPI,
  type ExerciseListRequest,
  type ExerciseEntityResponseData,
  type ExerciseSearchByType
} from '@/api/codegen'

export const exerciseStore = defineStore('exercise', () => {
  const isLodaded = ref(false)
  let exercises = ref<ExerciseEntityResponseData>()

  async function load(
    skip: number,
    take: number,
    search: string | undefined,
    searchBy: ExerciseSearchByType
  ) {
    isLodaded.value = false
    const client = new AppClient(OpenAPI)

    const response = await client.exercise.postList({
      requestBody: {
        searchBy,
        search,
        skip,
        take
      }
    })

    exercises.value = response
    isLodaded.value = true
  }

  async function getTags() {
    const client = new AppClient(OpenAPI)

    return await client.exercise.getTags()
  }

  return { isLodaded, exercises, load, getTags }
})
