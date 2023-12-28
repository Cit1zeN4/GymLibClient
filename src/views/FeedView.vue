<script setup lang="ts">
import * as yup from 'yup'
import { computed, onMounted, ref } from 'vue'
import { MdEditor, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useForm } from 'vee-validate'
import { articleStore } from '@/stores/article'
import { useToast } from 'primevue/usetoast'
import { meStore } from '@/stores/me'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = authStore()
const me = meStore()
const articleData = articleStore()
const toast = useToast()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле'),
    text: yup.string().required('Обязательное поле')
  })
})

const [name, nameAttr] = defineField<any, string>('name', { validateOnModelUpdate: true })
const [text, textAttr] = defineField<any, string>('text', { validateOnModelUpdate: true })
const articleId = ref(0)
const visible = ref(false)
const visibleEdit = ref(false)

const canAddArticle = computed(() => {
  let isValid = errors.value.name === undefined && errors.value.text === undefined
  let isNotEmpty =
    name.value !== undefined && name.value !== '' && text.value !== undefined && text.value !== ''
  return !(isValid && isNotEmpty)
})

const addArticle = () => {
  articleData
    .add(name.value, text.value)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Запись успешно создана',
        closable: true,
        life: 1000
      })
      visible.value = false
      name.value = ''
      text.value = ''
      upd()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось создать запись',
        closable: true,
        life: 3000
      })
    })
}

const openEdit = (id: number) => {
  let article = articleData.articles?.records?.find((x) => x.id === id)
  articleId.value = article?.id ?? 0
  name.value = article?.title ?? ''
  text.value = article?.text ?? ''
  visibleEdit.value = true
}

const updateArticle = () => {
  articleData
    .update(articleId.value, name.value, text.value)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Запись успешно создана',
        closable: true,
        life: 1000
      })
      visibleEdit.value = false
      articleId.value = 0
      name.value = ''
      text.value = ''
      upd()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось создать запись',
        closable: true,
        life: 3000
      })
    })
}

const removeArticle = (id: number) => {
  articleData
    .remove(id)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Запись успешно удалена',
        closable: true,
        life: 1000
      })
      upd()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось удалить запись',
        closable: true,
        life: 3000
      })
    })
}

const upd = () => {
  articleData.getList(0, 0)
}

onMounted(() => {
  articleData.getList(0, 0)
})
</script>

<template>
  <div class="mx-5">
    <h1>Лента</h1>
    <div class="flex justify-content-end">
      <Button
        v-if="auth.isAuth"
        @click="visible = true"
        label="Добвить"
        icon="pi pi-plus"
        iconPos="right"
        size="small"
      />
    </div>
    <Dialog
      v-model:visible="visible"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :style="{ width: '50rem' }"
      header="Новая запись"
      maximizable
      modal
    >
      <InputText
        v-model="name"
        v-bind="nameAttr"
        type="text"
        placeholder="Введите название"
        class="w-full my-1"
        :class="{ 'p-invalid': errors.name }"
      />
      <div class="mb-3">
        <small class="p-error" id="text-error">{{ errors.name }}</small>
      </div>
      <MdEditor v-model="text" language="en-US" />
      <div class="mb-3">
        <small class="p-error" id="text-error">{{ errors.text }}</small>
      </div>
      <div class="flex justify-content-center">
        <Button
          @click="addArticle"
          :disabled="canAddArticle"
          class="mt-4"
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
          size="small"
        />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="visibleEdit"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :style="{ width: '50rem' }"
      header="Изменение"
      maximizable
      modal
    >
      <InputText
        v-model="name"
        v-bind="nameAttr"
        type="text"
        placeholder="Введите название"
        class="w-full my-1"
        :class="{ 'p-invalid': errors.name }"
      />
      <div class="mb-3">
        <small class="p-error" id="text-error">{{ errors.name }}</small>
      </div>
      <MdEditor v-model="text" language="en-US" />
      <div class="mb-3">
        <small class="p-error" id="text-error">{{ errors.text }}</small>
      </div>
      <div class="flex justify-content-center">
        <Button
          @click="updateArticle"
          :disabled="canAddArticle"
          class="mt-4"
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
          size="small"
        />
      </div>
    </Dialog>

    <div v-if="articleData.isLoaded && (articleData.articles?.totalCount ?? 0) > 0">
      <div v-if="articleData.isLoaded" class="mt-5">
        <div class="grid">
          <div
            v-for="item in articleData.articles?.records"
            class="col-12 flex justify-content-center"
          >
            <Card class="w-35rem mb-3 shadow-5">
              <template #title>
                <div class="flex justify-content-between">
                  <div class="flex align-items-center">
                    <h5 class="text-primary my-1">{{ item.title }}</h5>
                  </div>
                  <div v-if="me.userData?.id === item.userId" class="flex align-items-center">
                    <Button
                      @click="openEdit(item.id ?? 0)"
                      icon="pi pi-pencil"
                      severity="info"
                      class="my-auto"
                      text
                    />
                    <Button
                      @click="removeArticle(item.id ?? 0)"
                      icon="pi pi-trash"
                      severity="danger"
                      class="my-auto"
                      text
                    />
                  </div>
                </div>
                <Divider />
              </template>
              <template #content>
                <MdPreview :modelValue="item.text ?? ''" />
              </template>
            </Card>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-column align-items-center">
        <ArticleSkeleton class="mb-3 w-35rem" />
        <ArticleSkeleton class="mb-3 w-35rem" />
        <ArticleSkeleton class="mb-3 w-35rem" />
      </div>
    </div>
    <div v-else>
      <h2 class="text-center">Нет записей</h2>
    </div>
  </div>
</template>

<style>
.w-35rem {
  width: 35rem;
}
</style>
