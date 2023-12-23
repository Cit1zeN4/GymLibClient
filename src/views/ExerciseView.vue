<script setup lang="ts">
import type { ExerciseEntity } from '@/api/codegen'
import { exerciseStore } from '@/stores/exercise'
import type { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const exerciseData = exerciseStore()

let first = ref(0)
let take = ref(10)
let visible = ref(false)
const expandedRows = ref()

const searchText = ref<string>()
let selected = ref<ExerciseEntity | undefined>()

exerciseData.load(0, take.value, undefined)

function search() {
  exerciseData.load(0, take.value, searchText.value)
  first.value = 0
}

function upd(event: PageState) {
  exerciseData.load(event.first, event.rows, searchText.value)
}

function expand() {
  if (expandedRows.value.length > 1) {
    expandedRows.value = expandedRows.value.slice(-1)
  }
}
</script>

<template>
  <div class="mx-5">
    <h1 class="text-primary">Упражнения</h1>
    <div class="my-2 flex justify-content-end">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchText" @keyup.enter="search" placeholder="Поиск" />
      </span>
    </div>
    <div v-if="exerciseData.isLodaded">
      <div v-if="exerciseData.exercises?.totalCount">
        <DataTable
          dataKey="id"
          v-model:expandedRows="expandedRows"
          :value="exerciseData.exercises?.records"
          @row-expand="expand"
        >
          <Column expander style="width: 5rem" />
          <Column field="name" header="Название" />
          <Column field="tags" header="Группы мышц" />
          <template #expansion="slotProps">
            <h1>{{ slotProps.data.name }}</h1>
            <p>{{ slotProps.data.description }}</p>
            <p>{{ slotProps.data.begginer }}</p>
            <a :href="slotProps.data.source" class="text-primary" style="text-decoration: none"
              >источник</a
            >
          </template>
        </DataTable>
      </div>
      <div v-else>
        <h3 class="text-center color-primary">Упражнения не найдены</h3>
      </div>
    </div>
    <div v-else>
      <ExercisTableSkeleton />
    </div>

    <Paginator
      v-if="exerciseData.exercises?.totalCount"
      v-model:first="first"
      :rows="take"
      :totalRecords="exerciseData.exercises?.totalCount"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="upd"
    ></Paginator>
  </div>
</template>
