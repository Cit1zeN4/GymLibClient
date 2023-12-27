<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import MuscleSelector from '@/components/MuscleSelector.vue'

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле')
  })
})

const visible = ref(false)
const [name, nameAttr] = defineField<any, string>('name', { validateOnModelUpdate: true })
</script>

<template>
  <div class="mx-5">
    <h1 class="text-primary">Тренировки</h1>
    <Dialog
      v-model:visible="visible"
      modal
      header="Новая тренировка"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="grid">
        <div class="col-12">
          <InputText
            v-model="name"
            v-bind="nameAttr"
            type="text"
            placeholder="Введите название"
            class="w-full my-1"
            :class="{ 'p-invalid': errors.name }"
          />
        </div>
        <div class="col-12">
          <MuscleSelector />
        </div>
      </div>
    </Dialog>
    <div class="flex justify-content-end">
      <Button
        @click="visible = true"
        label="Добвить"
        icon="pi pi-plus"
        iconPos="right"
        size="small"
      />
    </div>
  </div>
</template>
