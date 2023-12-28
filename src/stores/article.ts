import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AppClient, type ArticleEntityResponseData, OpenAPI } from '@/api/codegen'

export const articleStore = defineStore('article', () => {
  const isLoaded = ref(false)
  const articles = ref<ArticleEntityResponseData>()

  async function getList(skip: number, take: number) {
    const client = new AppClient(OpenAPI)

    isLoaded.value = false
    const response = await client.article.postArticleList({
      requestBody: {
        skip,
        take
      }
    })

    articles.value = response
    isLoaded.value = true
  }

  async function add(title: string, text: string) {
    const client = new AppClient(OpenAPI)

    await client.article.postArticle({
      requestBody: {
        title,
        text
      }
    })
  }

  async function update(id: number, title: string, text: string) {
    const client = new AppClient(OpenAPI)

    await client.article.putArticle({
      id,
      requestBody: {
        title,
        text
      }
    })
  }

  async function remove(id: number) {
    const client = new AppClient(OpenAPI)

    await client.article.deleteArticle({ id })
  }

  return { isLoaded, articles, getList, add, update, remove }
})
