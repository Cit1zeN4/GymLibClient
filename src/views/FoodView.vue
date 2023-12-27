<script setup lang="ts">
import * as yup from 'yup'
import { foodStore } from '@/stores/food'
import { productStore } from '@/stores/products'
import type { PageState } from 'primevue/paginator'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import type { FoodShortDto } from '@/api/codegen'

const productData = productStore()
const foodData = foodStore()
const toast = useToast()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле'),
    date: yup.date().required('Обязательное поле')
  })
})

const visible = ref(false)
const [name, nameAttr] = defineField<any, string>('name', { validateOnModelUpdate: true })
const [date, dateAttr] = defineField<any, string>('date', { validateOnModelUpdate: true })
const op = ref()

const currentProductList = ref<any[]>(new Array())

let porductFirst = ref(0)
let productTake = ref(3)
let productSearchValue = ref<string>()

const dateStart = ref('')
const dateEnd = ref('')

const dateStartStr = computed(() =>
  dateStart.value ? getDateStr(new Date(dateStart.value)) : undefined
)

const dateEndStr = computed(() => (dateEnd.value ? getDateStr(new Date(dateEnd.value)) : undefined))

const toggle = (event: any) => {
  op.value.toggle(event)
  if (!productData.products?.totalCount) {
    productData.load(0, productTake.value, undefined)
  }
}

function productSearch() {
  productData.load(0, productTake.value, productSearchValue.value)
  porductFirst.value = 0
}

function updProduct(event: PageState) {
  productData.load(event.first, event.rows, productSearchValue.value)
}

function clearSearch() {
  porductFirst.value = 0
  productSearchValue.value = ''
}

function addProduct(id: number) {
  let product = productData.products?.records?.find((x) => x.id === id)
  currentProductList.value?.push({ product, gram: 100 })
}

function removeProduct(id: number) {
  var index = currentProductList.value
    .map((x) => {
      return x.product.Id
    })
    .indexOf(id)
  currentProductList.value.splice(index, 1)
}

function saveNewFood() {
  foodData
    .add({
      name: name.value,
      date: getDateStr(new Date(date.value)),
      products: currentProductList.value.map((x) => {
        return { productId: x.product.id, weight: x.gram }
      })
    })
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Сохранено',
        detail: 'Новый прием пищи успешно сохранен',
        closable: true,
        life: 1000
      })
      visible.value = false
      currentProductList.value = new Array()
      name.value = ''
      date.value = ''
    })
    .catch((error) => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось сохранить новый прием пищи',
        closable: true,
        life: 3000
      })
    })
}

function removeFood(id: number) {
  foodData
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

function upd() {
  foodData.load(0, 0, undefined, dateStartStr.value, dateEndStr.value).then(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  })
}

const calcGram = (value: number, gram: number) => {
  return (value / 100) * gram
}

const round = (num: number) => {
  return Math.round(num * 100) / 100
}

const getDateStr = (date: Date) => {
  var dd = String(date.getDate()).padStart(2, '0')
  var mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = date.getFullYear()
  var HH = String(date.getHours()).padStart(2, '0')
  var MM = String(date.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}T${HH}:${MM}:00Z`
}

const getShortDateTime = (date: Date) => {
  var dd = String(date.getDate()).padStart(2, '0')
  var mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
  var HH = String(date.getHours()).padStart(2, '0')
  var MM = String(date.getMinutes()).padStart(2, '0')
  return `${mm}-${dd} ${HH}:${MM}`
}

const canSave = computed(() => {
  const isNotEmpty =
    name.value !== undefined && name.value !== '' && date.value !== undefined && date.value !== ''
  const isValid = errors.value.name === undefined && errors.value.date === undefined
  return !(isValid && isNotEmpty)
})

const totalProteins = computed(() => {
  var proteins
  if (currentProductList.value.length > 1)
    proteins = currentProductList.value.reduce(
      (p, c) => calcGram(p.product.proteins, p.gram) + calcGram(c.product.proteins, c.gram)
    )
  else
    proteins = calcGram(
      currentProductList.value[0].product.proteins,
      currentProductList.value[0].gram
    )
  return round(proteins)
})

const totalFats = computed(() => {
  var fats
  if (currentProductList.value.length > 1)
    fats = currentProductList.value.reduce(
      (p, c) => calcGram(p.product.fats, p.gram) + calcGram(c.product.fats, c.gram)
    )
  else fats = calcGram(currentProductList.value[0].product.fats, currentProductList.value[0].gram)
  return round(fats)
})

const totalCarbohydrates = computed(() => {
  var carbohydrates
  if (currentProductList.value.length > 1)
    carbohydrates = currentProductList.value.reduce(
      (p, c) =>
        calcGram(p.product.carbohydrates, p.gram) + calcGram(c.product.carbohydrates, c.gram)
    )
  else
    carbohydrates = calcGram(
      currentProductList.value[0].product.carbohydrates,
      currentProductList.value[0].gram
    )
  return round(carbohydrates)
})

const totalKcal = computed(() => {
  var kcal
  if (currentProductList.value.length > 1)
    kcal = currentProductList.value.reduce(
      (p, c) => calcGram(p.product.kcal, p.gram) + calcGram(c.product.kcal, c.gram)
    )
  else kcal = calcGram(currentProductList.value[0].product.kcal, currentProductList.value[0].gram)
  return round(kcal)
})

const formatedFoodList = computed(() => {
  return foodData.foodList?.records?.map<FoodShortDto>((x) => {
    return {
      id: x.id,
      name: x.name,
      date: getShortDateTime(new Date(x.date ?? 0)),
      proteins: round(x.proteins ?? 0),
      fats: round(x.fats ?? 0),
      carbohydrates: round(x.carbohydrates ?? 0),
      kcal: round(x.kcal ?? 0)
    }
  })
})

const chartData = ref()
const chartData2 = ref()
const chartOptions = ref()

onMounted(() => {
  productData.load(0, productTake.value, undefined)
  foodData.load(0, 50, undefined, undefined, undefined)
  chartData.value = setChartData()
  chartData2.value = setChartData2()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: foodData.foodList?.records?.map(
      (x) => x.name + ' ' + getShortDateTime(new Date(x.date ?? 0))
    ),
    datasets: [
      {
        label: 'Б',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        data: foodData.foodList?.records?.map((x) => x.proteins)
      },
      {
        label: 'Ж',
        backgroundColor: documentStyle.getPropertyValue('--green-500'),
        borderColor: documentStyle.getPropertyValue('--green-500'),
        data: foodData.foodList?.records?.map((x) => x.fats)
      },
      {
        label: 'У',
        backgroundColor: documentStyle.getPropertyValue('--purple-500'),
        borderColor: documentStyle.getPropertyValue('--purple-500'),
        data: foodData.foodList?.records?.map((x) => x.carbohydrates)
      }
    ]
  }
}

const setChartData2 = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: foodData.foodList?.records?.map(
      (x) => x.name + ' ' + getShortDateTime(new Date(x.date ?? 0))
    ),
    datasets: [
      {
        label: 'Ккал',
        backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
        borderColor: documentStyle.getPropertyValue('--yellow-500'),
        data: foodData.foodList?.records?.map((x) => x.kcal)
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  }
}
</script>

<template>
  <div class="mx-5">
    <h1 class="text-primary">Питание</h1>
    <Dialog
      v-model:visible="visible"
      modal
      header="Новый прием пищи"
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
            class="w-full mb-1"
            :class="{ 'p-invalid': errors.name }"
          />
          <div class="mb-3">
            <small class="p-error" id="text-error">{{ errors.name }}</small>
          </div>
          <Calendar
            v-model="date"
            v-bind="dateAttr"
            showTime
            hourFormat="24"
            placeholder="Введите дату"
            dateFormat="yy-mm-dd"
            class="w-full mb-1"
            :class="{ 'p-invalid': errors.date }"
          />
          <div class="mb-3">
            <small class="p-error" id="text-error">{{ errors.date }}</small>
          </div>
          <div>
            <Button @click="toggle" label="Добавить продукт" class="w-full" />
          </div>
          <OverlayPanel ref="op" appendTo="body" class="w-20rem" @hide="clearSearch">
            <div class="grid">
              <div class="col-12">
                <InputText
                  @keyup.enter="productSearch"
                  v-model="productSearchValue"
                  placeholder="Поиск"
                  class="w-full"
                />
              </div>
            </div>
            <div v-if="productData.products?.totalCount ?? 0 > 0">
              <DataTable :value="productData.products?.records" :scrollable="true" class="h-20">
                <Column field="name" header="Название"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      @click="addProduct(slotProps.data.id)"
                      severity="success"
                      icon="pi pi-plus"
                      size="small"
                      text
                    />
                  </template>
                </Column>
              </DataTable>
              <Paginator
                v-if="productData.products?.totalCount"
                @page="updProduct"
                v-model:first="porductFirst"
                :rows="productTake"
                :totalRecords="productData.products?.totalCount"
                :template="{
                  default: 'PrevPageLink CurrentPageReport NextPageLink'
                }"
              ></Paginator>
            </div>
            <div v-else>
              <h4 class="text-center">Ничего не найдено</h4>
            </div>
          </OverlayPanel>
        </div>
        <div v-if="currentProductList.length > 0" class="col-12">
          <h3>Продукты</h3>
          <div class="grid">
            <div class="col-12" v-for="item in currentProductList">
              <Divider class="my-1" />
              <div class="grid">
                <div class="col-6">
                  <h3>{{ item.product.name }}</h3>
                </div>
                <div class="col-4 my-auto">
                  <div class="flex">
                    <InputNumber
                      v-model="item.gram"
                      :min="1"
                      inputClass="w-full text-center"
                      showButtons
                    />
                  </div>
                </div>
                <div class="col-2 flex align-items-center">
                  <Button
                    @click="removeProduct(item.product.id)"
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
          <div class="grid">
            <div class="col-3">
              <h5 class="text-center">Белки</h5>
              <h4 class="text-center text-primary">{{ totalProteins }}</h4>
            </div>
            <div class="col-3">
              <h5 class="text-center">Жиры</h5>
              <h4 class="text-center text-primary">{{ totalFats }}</h4>
            </div>
            <div class="col-3">
              <h5 class="text-center">Углеводы</h5>
              <h4 class="text-center text-primary">{{ totalCarbohydrates }}</h4>
            </div>
            <div class="col-3">
              <h5 class="text-center">ККал</h5>
              <h4 class="text-center text-primary">{{ totalKcal }}</h4>
            </div>
          </div>
          <Button
            @click="saveNewFood"
            :disabled="canSave"
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
    <h2>История</h2>
    <div>
      <h3>Интервал</h3>
      <Calendar
        @date-select="upd"
        v-model="dateStart"
        showTime
        hourFormat="24"
        placeholder="Введите дату"
        dateFormat="yy-mm-dd"
        class="mr-3"
      />
      <Calendar
        @date-select="upd"
        v-model="dateEnd"
        showTime
        hourFormat="24"
        placeholder="Введите дату"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div v-if="foodData.foodList?.totalCount ?? 0 > 0">
      <DataTable :value="formatedFoodList">
        <Column field="name" header="Название" />
        <Column field="date" header="Дата" />
        <Column field="proteins" header="Б" />
        <Column field="fats" header="Ж" />
        <Column field="carbohydrates" header="У" />
        <Column field="kcal" header="Ккал" />
        <Column>
          <template #body="slotProps">
            <div class="flex justify-content-end">
              <Button
                @click="removeFood(slotProps.data.id)"
                severity="danger"
                icon="pi pi-trash"
                size="small"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else>
      <h2 сlass="text-center">Ничего не найдено</h2>
    </div>
    <div v-if="foodData.foodList?.totalCount ?? 0 > 0">
      <h1 class="text-primary">График</h1>
      <div class="flex justify-content-center">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem w-screen" />
      </div>
      <div class="flex justify-content-center">
        <Chart type="bar" :data="chartData2" :options="chartOptions" class="h-30rem w-screen" />
      </div>
    </div>
  </div>
</template>
