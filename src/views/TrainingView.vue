<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import MuscleSelector from '@/components/MuscleSelector.vue'
import { Muscle, type MuscleAssociation } from '@/svg/human'
import { exerciseStore } from '@/stores/exercise'
import type {
  ExerciseEntity,
  TrainingFullResponse,
  TrainingRequest,
  TrainingSetShortDtoResponseData
} from '@/api/codegen'
import { trainingStore } from '@/stores/training'
import { useToast } from 'primevue/usetoast'
import { meStore } from '@/stores/me'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

interface ExerciseListItem {
  exercise: ExerciseEntity
  sets: number
  reps: number
}

const router = useRouter()
const toast = useToast()
const auth = authStore()
const exerciseData = exerciseStore()
const trainingData = trainingStore()
const me = meStore()

const muscles = ref<MuscleAssociation[]>([
  { inner: Muscle.abs, outer: 'Пресс' },
  { inner: Muscle.trapezuis, outer: 'Трапеции' },
  { inner: Muscle.anterior, outer: 'Косые мышцы' },
  { inner: Muscle['v-line-abs'], outer: 'Косые мышцы' },
  { inner: Muscle.chest, outer: 'Грудь' },
  { inner: Muscle.biceps, outer: 'Бицепс' },
  { inner: Muscle.triceps, outer: 'Трицепс' },
  { inner: Muscle['front-thigh'], outer: 'Передняя часть бедра' },
  { inner: Muscle['back-thigh'], outer: 'Задняя часть бедра' },
  { inner: Muscle.deltoid, outer: 'Передняя дельта' },
  { inner: Muscle.infraspinatus, outer: 'Задняя дельта' },
  { inner: Muscle.lats, outer: 'Широчайшие мышцы' },
  { inner: Muscle.wrist, outer: 'Предплечья' },
  { inner: Muscle.glutes, outer: 'Ягодицы' },
  { inner: Muscle.calves, outer: 'Голень' },
  { inner: Muscle.shin, outer: 'Голень' }
])

const selectedMuscle = ref<string>()

const updMuscle = (val: string) => {
  selectedMuscle.value = val
  exerciseData.load(0, 0, selectedMuscle.value, 1)
}

const updSelect = () => {
  exerciseData.load(0, 0, selectedMuscle.value, 1)
}

const muscleColor = computed(() => {
  var bodyStyle = window.getComputedStyle(document.body)
  return bodyStyle.getPropertyValue('--primary-400')
})

const selectColor = computed(() => {
  var bodyStyle = window.getComputedStyle(document.body)
  return bodyStyle.getPropertyValue('--yellow-400')
})

const outerColor = computed(() => {
  var bodyStyle = window.getComputedStyle(document.body)
  return bodyStyle.getPropertyValue('--gray-700')
})

const bodyColor = computed(() => {
  var bodyStyle = window.getComputedStyle(document.body)
  return bodyStyle.getPropertyValue('--gray-300')
})

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле')
  })
})

const trainingId = ref<number>()
const [name, nameAttr] = defineField<any, string>('name', { validateOnModelUpdate: true })
const currentExerciseList = ref(new Array<ExerciseListItem>())
const currentTraining = ref<TrainingFullResponse>()
const visible = ref(false)
const visibleEdit = ref(false)
const trainingVisible = ref(false)
const tags = ref<string[]>()
const isPublic = ref(false)

const myTrainings = ref<TrainingSetShortDtoResponseData>()

const addExercise = (id: number) => {
  let exercise = exerciseData.exercises?.records?.find((x) => x.id === id)
  if (exercise) currentExerciseList.value?.push({ exercise, sets: 1, reps: 1 })
}

const removeExercise = (id: number) => {
  var index = currentExerciseList.value
    .map((x) => {
      return x.exercise.id
    })
    .indexOf(id)
  currentExerciseList.value.splice(index, 1)
}

const canAdd = computed(() => {
  var hasItem = currentExerciseList.value.length > 0
  var isNotEmpty = name.value !== '' && name.value !== undefined
  var isValid = errors.value.name === undefined
  return !(isNotEmpty && isValid && hasItem)
})

const saveTraining = () => {
  let newTraining: TrainingRequest = {
    name: name.value,
    isPublic: isPublic.value,
    sets: currentExerciseList.value.map((x) => {
      return { exerciseId: x.exercise.id, set: x.sets, reps: x.reps, comment: null }
    })
  }
  trainingData
    .add(newTraining)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Тренеровка создана',
        closable: true,
        life: 1000
      })
      name.value = ''
      visible.value = false
      isPublic.value = false
      selectedMuscle.value = undefined
      currentExerciseList.value = new Array<any>()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось создать тренировку',
        closable: true,
        life: 3000
      })
    })
}

const loadMyTrainings = () => {
  trainingData.getList(0, 0, undefined, me.userData?.id).then((res) => {
    myTrainings.value = res
  })
}

const showTraining = (id: number) => {
  trainingVisible.value = true
  trainingData.getTraining(id).then((res) => {
    currentTraining.value = res
  })
}

const hideTraining = () => {
  currentTraining.value = undefined
}

const removeTraining = (id: number) => {
  trainingData
    .remove(id)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Тренеровка успешно удалена',
        closable: true,
        life: 1000
      })
      loadMyTrainings()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось удалить тренировку',
        closable: true,
        life: 3000
      })
    })
}

const openUpdate = (id: number) => {
  visibleEdit.value = true
  trainingData.getTraining(id).then((res) => {
    trainingId.value = id
    name.value = res.name ?? 'Нет названия'
    isPublic.value = res.isPublic ?? false
    let mapped = res.sets?.map<ExerciseListItem>((x) => {
      return {
        exercise: {
          id: x.exerciseId,
          name: x.name,
          slug: null,
          begginer: null,
          description: x.description,
          source: null,
          tags: null
        },
        sets: x.set ?? 0,
        reps: x.reps ?? 0
      }
    })
    if (mapped) currentExerciseList.value = mapped
  })
}

const updateTraining = () => {
  let training: TrainingRequest = {
    name: name.value,
    isPublic: isPublic.value,
    sets: currentExerciseList.value.map((x) => {
      return { exerciseId: x.exercise.id, set: x.sets, reps: x.reps, comment: null }
    })
  }
  trainingData
    .update(trainingId.value ?? 0, training)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Тренеровка успешно обновлена',
        closable: true,
        life: 1000
      })
      trainingId.value = 0
      name.value = ''
      visibleEdit.value = false
      isPublic.value = false
      selectedMuscle.value = undefined
      currentExerciseList.value = new Array<any>()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось обновить тренировку',
        closable: true,
        life: 3000
      })
    })
}

onMounted(() => {
  if (!auth.isAuth) router.push('signin')
  exerciseData.getTags().then((res) => {
    tags.value = res
  })
  loadMyTrainings()
})
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
          <div class="mb-3">
            <small class="p-error" id="text-error">{{ errors.name }}</small>
          </div>
        </div>
        <div class="col-12">
          <h2>Выбор упражнения</h2>
          <div class="flex justify-content-center">
            <MuscleSelector
              class="w-full sm:w-19rem md:w-27rem lg:w-30rem"
              :outerColor="outerColor"
              :selectColor="selectColor"
              :muscleColor="muscleColor"
              :bodyColor="bodyColor"
              :association="muscles"
              @update:modelValue="updMuscle"
            />
          </div>
        </div>
        <div class="col-12">
          <Dropdown
            @update:model-value="updSelect"
            v-model="selectedMuscle"
            :options="tags"
            class="w-full"
          />
        </div>
        <div v-if="exerciseData.exercises?.totalCount ?? 0 > 0" class="col-12">
          <DataTable :value="exerciseData.exercises?.records" scrollable scrollHeight="280px">
            <Column field="name" header="Название" />
            <Column>
              <template #body="slotProps">
                <div class="flex justify-content-end">
                  <Button
                    @click="addExercise(slotProps.data.id)"
                    severity="success"
                    icon="pi pi-plus"
                    size="small"
                    text
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-if="currentExerciseList.length > 0" class="col-12">
          <h2>Упражнения</h2>
          <div clas="grid">
            <div class="col-12" v-for="item in currentExerciseList">
              <Divider class="my-1" />
              <div class="grid">
                <div class="col-12 md:col-6">
                  <h4>{{ item.exercise.name }}</h4>
                </div>
                <div class="col-4 md:col-2 my-auto">
                  <div class="flex">
                    <InputNumber
                      v-model="item.sets"
                      :min="1"
                      inputClass="w-full text-center"
                      showButtons
                    />
                  </div>
                </div>
                <div class="col-4 md:col-2 my-auto">
                  <div class="flex">
                    <InputNumber
                      v-model="item.reps"
                      :min="1"
                      inputClass="w-full text-center"
                      showButtons
                    />
                  </div>
                </div>
                <div class="col-4 md:col-2 flex align-items-center">
                  <Button
                    @click="removeExercise(item.exercise.id ?? 0)"
                    severity="danger"
                    icon="pi pi-trash"
                    class="w-full"
                    size="small"
                    text
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="flex justify-content-end">
            <Checkbox v-model="isPublic" :binary="true" />
            <label class="ml-2"> Сделать общедоступной </label>
          </div>
        </div>
        <div class="col-12">
          <Button
            @click="saveTraining"
            :disabled="canAdd"
            label="Сохранить"
            class="w-full"
            severity="success"
          />
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
    <Dialog
      v-model:visible="trainingVisible"
      @after-hide="hideTraining"
      :header="currentTraining?.name ?? 'Загрузка...'"
    >
      <div v-if="currentTraining != undefined">
        <DataTable :value="currentTraining?.sets">
          <Column field="name" header="Название" />
          <Column header="Подходы Х Повторения">
            <template #body="slotProps">
              {{ `${slotProps.data.set} X ${slotProps.data.reps}` }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else class="flex justify-content-center">
        <ProgressSpinner />
      </div>
    </Dialog>
    <Dialog
      v-model:visible="visibleEdit"
      modal
      header="Изменение тренировки"
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
          <div class="mb-3">
            <small class="p-error" id="text-error">{{ errors.name }}</small>
          </div>
        </div>
        <div class="col-12">
          <h2>Выбор упражнения</h2>
          <div class="flex justify-content-center">
            <MuscleSelector
              class="w-full sm:w-19rem md:w-27rem lg:w-30rem"
              :outerColor="outerColor"
              :selectColor="selectColor"
              :muscleColor="muscleColor"
              :bodyColor="bodyColor"
              :association="muscles"
              @update:modelValue="updMuscle"
            />
          </div>
        </div>
        <div class="col-12">
          <Dropdown
            @update:model-value="updSelect"
            v-model="selectedMuscle"
            :options="tags"
            class="w-full"
          />
        </div>
        <div v-if="exerciseData.exercises?.totalCount ?? 0 > 0" class="col-12">
          <DataTable :value="exerciseData.exercises?.records" scrollable scrollHeight="280px">
            <Column field="name" header="Название" />
            <Column>
              <template #body="slotProps">
                <div class="flex justify-content-end">
                  <Button
                    @click="addExercise(slotProps.data.id)"
                    severity="success"
                    icon="pi pi-plus"
                    size="small"
                    text
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-if="currentExerciseList.length > 0" class="col-12">
          <h2>Упражнения</h2>
          <div clas="grid">
            <div class="col-12" v-for="item in currentExerciseList">
              <Divider class="my-1" />
              <div class="grid">
                <div class="col-12 md:col-6">
                  <h4>{{ item.exercise.name }}</h4>
                </div>
                <div class="col-4 md:col-2 my-auto">
                  <div class="flex">
                    <InputNumber
                      v-model="item.sets"
                      :min="1"
                      inputClass="w-full text-center"
                      showButtons
                    />
                  </div>
                </div>
                <div class="col-4 md:col-2 my-auto">
                  <div class="flex">
                    <InputNumber
                      v-model="item.reps"
                      :min="1"
                      inputClass="w-full text-center"
                      showButtons
                    />
                  </div>
                </div>
                <div class="col-4 md:col-2 flex align-items-center">
                  <Button
                    @click="removeExercise(item.exercise.id ?? 0)"
                    severity="danger"
                    icon="pi pi-trash"
                    class="w-full"
                    size="small"
                    text
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="flex justify-content-end">
            <Checkbox v-model="isPublic" :binary="true" />
            <label class="ml-2"> Сделать общедоступной </label>
          </div>
        </div>
        <div class="col-12">
          <Button
            @click="updateTraining"
            :disabled="canAdd"
            label="Обновить"
            class="w-full"
            severity="success"
          />
        </div>
      </div>
    </Dialog>
    <Accordion :activeIndex="1" class="mt-5">
      <AccordionTab header="Мои тренировки">
        <div v-if="myTrainings?.totalCount ?? 0 > 0">
          <DataTable :value="myTrainings?.records" scrollable scrollHeight="280px">
            <Column field="name" header="Название">
              <template #body="slotProps">
                <span @click="showTraining(slotProps.data.id)" class="pointer">{{
                  slotProps.data.name
                }}</span>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <div class="flex justify-content-end">
                  <Button
                    @click="openUpdate(slotProps.data.id)"
                    severity="info"
                    icon="pi pi-pencil"
                    size="small"
                    text
                  />
                  <Button
                    @click="removeTraining(slotProps.data.id)"
                    severity="danger"
                    icon="pi pi-trash"
                    size="small"
                    text
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else>
          <h2 class="text-center">Нет созданых тренировок</h2>
        </div>
      </AccordionTab>
      <AccordionTab header="Тренировки других пользователей">
        <div v-if="trainingData.trainings?.totalCount ?? 0 > 0">
          <DataTable :value="trainingData.trainings?.records" scrollable scrollHeight="280px">
            <Column field="name" header="Название">
              <template #body="slotProps">
                <span @click="showTraining(slotProps.data.id)" class="pointer">{{
                  slotProps.data.name
                }}</span>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <div class="flex justify-content-end">
                  <Button severity="info" icon="pi pi-pencil" size="small" text />
                  <Button
                    @click="removeTraining(slotProps.data.id)"
                    severity="danger"
                    icon="pi pi-trash"
                    size="small"
                    text
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else>
          <h2 class="text-center">Тренировки пользователей не найдены</h2>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
