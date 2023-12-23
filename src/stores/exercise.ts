import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  AppClient,
  OpenAPI,
  type ExerciseListRequest,
  type ExerciseEntityResponseData
} from '@/api/codegen'

export const exerciseStore = defineStore('exercise', () => {
  const isLodaded = ref(false)
  let exercises = ref<ExerciseEntityResponseData>()

  async function load(skip: number, take: number, search: string | undefined) {
    isLodaded.value = false
    const client = new AppClient(OpenAPI)

    const response = await client.exercise.postList({
      requestBody: {
        search,
        skip,
        take
      }
    })

    exercises.value = response
    isLodaded.value = true
  }

  return { isLodaded, exercises, load }
})
