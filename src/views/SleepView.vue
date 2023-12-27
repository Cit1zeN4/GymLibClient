<script setup lang="ts">
import type SleepTableSkeletonVue from '@/components/SleepTableSkeleton.vue'
import { sleepStore } from '@/stores/sleep'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'

const sleepData = sleepStore()
const toast = useToast()

const today = new Date()
const weekAgo = sleepData.getLastWeek(today)

const todayStr = sleepData.getDateStr(today) + 'T23:59:59Z'
const weekAgoStr = sleepData.getDateStr(weekAgo) + 'T00:00:00Z'

const dateStart = ref('')
const dateEnd = ref('')

const dateStartStr = computed(() =>
  dateStart.value ? sleepData.getDateStr(new Date(dateStart.value)) + 'T00:00:00Z' : undefined
)

const dateEndStr = computed(() =>
  dateEnd.value ? sleepData.getDateStr(new Date(dateEnd.value)) + 'T23:59:59Z' : undefined
)

const date = ref<Date>()
const hour = ref<number | undefined>()
const minute = ref<number | undefined>()
const op = ref()

const toggle = (event: any) => {
  op.value.toggle(event)
}

const minuteToTime = (minute: number) => {
  var m = minute % 60
  var h = (minute - m) / 60

  return (h < 10 ? '0' : '') + h.toString() + ':' + (m < 10 ? '0' : '') + m.toString()
}

const hide = () => {
  date.value = undefined
  hour.value = undefined
  minute.value = undefined
}

const save = () => {
  sleepData
    .add(
      hour.value ?? 0,
      minute.value ?? 0,
      sleepData.getDateStr(date.value ?? new Date(), false) + 'T12:00:00.000Z'
    )
    .then(() => {
      toggle(null)
      toast.add({
        severity: 'success',
        summary: 'Сохранено',
        detail: 'Введенные вами данные успешно сохранены',
        closable: true,
        life: 1000
      })
      update()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось сохранить введенные вами данные',
        closable: true,
        life: 3000
      })
    })
}

const update = () => {
  sleepData.getList(0, 0, dateStartStr.value, dateEndStr.value).then(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  })
}

const remove = (id: number) => {
  sleepData
    .remove(id)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Сохранено',
        detail: 'Выбраная запись успешно удалена',
        closable: true,
        life: 1000
      })
      update()
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось удалить указанную запись',
        closable: true,
        life: 3000
      })
    })
}

const isData = computed(() => {
  var result = (sleepData.sleepList?.totalCount ?? 0 > 0) && sleepData.isLoaded
  return result
})

onMounted(() => {
  sleepData.getList(0, 50, weekAgoStr, todayStr).then(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  })
})

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: sleepData.sleepList?.records?.map((x) => sleepData.getShortDate(new Date(x.date ?? 0))),
    datasets: [
      {
        label: 'Время сна',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        data: sleepData.sleepList?.records?.map((x) => (x.value ? x.value / 60 : 0))
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
    <h1 class="text-primary">Сон</h1>
    <div class="flex justify-content-end">
      <Button label="Добвить" icon="pi pi-plus" iconPos="right" size="small" @click="toggle" />
    </div>
    <OverlayPanel ref="op" @hide="hide">
      <div class="mx-4">
        <h3 class="text-primary">Время</h3>
        <div class="flex justify-content-center align-items-center">
          <InputNumber
            v-model="hour"
            showButtons
            :min="0"
            :max="23"
            placeholder="ч."
            buttonLayout="vertical"
            style="width: 4rem"
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
          >
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
          </InputNumber>
          <h1 class="mx-2 text-primary">:</h1>
          <InputNumber
            v-model="minute"
            showButtons
            :min="0"
            :max="59"
            placeholder="мин."
            buttonLayout="vertical"
            style="width: 4rem"
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
          >
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
          </InputNumber>
        </div>
        <h3 class="text-primary">Дата</h3>
        <div class="flex justify-content-center">
          <Calendar
            v-model="date"
            placeholder="Введите дату"
            dateFormat="yy-mm-dd"
            class="w-9rem"
          />
        </div>
        <div class="flex justify-content-center mt-3">
          <Button icon="pi pi-check" class="w-9rem" @click="save" />
        </div>
      </div>
    </OverlayPanel>

    <div>
      <h3>Интервал</h3>
      <Calendar
        @date-select="update"
        v-model="dateStart"
        placeholder="Введите дату"
        dateFormat="yy-mm-dd"
        class="mr-3"
      />
      <Calendar
        @date-select="update"
        v-model="dateEnd"
        placeholder="Введите дату"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div v-if="isData">
      <div v-if="sleepData.isLoaded" class="mt-5">
        <DataTable :value="sleepData.sleepList?.records" scrollable scrollHeight="480px">
          <Column field="date" header="Дата" class="w-25rem">
            <template #body="slotProps">
              {{ slotProps.data.date }}
            </template>
          </Column>
          <Column field="value" header="Время">
            <template #body="slotProps">
              {{ minuteToTime(slotProps.data.value) }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <div class="flex justify-content-end">
                <Button
                  @click="remove(slotProps.data.id)"
                  severity="danger"
                  icon="pi pi-trash"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else><SleepTableSkeleton></SleepTableSkeleton></div>
    </div>
    <div v-else><h1 class="text-center mt-5">Пока нет данных</h1></div>
    <div v-if="sleepData.sleepList?.totalCount ?? 0 > 0">
      <h1 class="text-primary">График</h1>
      <div class="flex justify-content-center">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem w-screen" />
      </div>
    </div>
  </div>
</template>
