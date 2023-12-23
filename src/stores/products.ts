import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AppClient, OpenAPI, type ProductEntityResponseData } from '@/api/codegen'

export const productStore = defineStore('product', () => {
  const isLodaded = ref(false)
  let products = ref<ProductEntityResponseData>()

  async function load(skip: number, take: number, search: string | undefined) {
    isLodaded.value = false
    const client = new AppClient(OpenAPI)

    const response = await client.food.postFoodProductList({
      requestBody: {
        search,
        skip,
        take
      }
    })

    products.value = response
    isLodaded.value = true
  }

  return { isLodaded, products, load }
})
