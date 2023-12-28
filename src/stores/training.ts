import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  AppClient,
  OpenAPI,
  type TrainingRequest,
  type TrainingSetShortDtoResponseData
} from '@/api/codegen'

export const trainingStore = defineStore('training', () => {
  const isLodaded = ref(false)
  const trainings = ref<TrainingSetShortDtoResponseData>()

  async function load(
    skip: number,
    take: number,
    search: string | undefined,
    userId: number | undefined
  ) {
    isLodaded.value = false
    const client = new AppClient(OpenAPI)

    trainings.value = await client.training.getTrainingUserTrainings({
      skip,
      take,
      search,
      userId
    })
    isLodaded.value = true
  }

  async function getList(
    skip: number,
    take: number,
    search: string | undefined,
    userId: number | undefined
  ) {
    const client = new AppClient(OpenAPI)

    return await client.training.getTrainingUserTrainings({
      skip,
      take,
      search,
      userId
    })
  }

  async function getTraining(id: number) {
    const client = new AppClient(OpenAPI)

    return await client.training.getTraining({ id })
  }

  async function add(training: TrainingRequest) {
    const client = new AppClient(OpenAPI)

    await client.training.postTraining({ requestBody: training })
  }

  async function update(id: number, training: TrainingRequest) {
    const client = new AppClient(OpenAPI)

    await client.training.putTraining({ id, requestBody: training })
  }

  async function remove(id: number) {
    const client = new AppClient(OpenAPI)

    await client.training.deleteTraining({ id })
  }

  return { isLodaded, trainings, load, add, update, remove, getList, getTraining }
})
