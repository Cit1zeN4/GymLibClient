<script setup lang="ts">
import { exerciseStore } from '@/stores/exercise'
import type { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const exerciseData = exerciseStore()
let first = ref(0)
let take = ref(10)
const searchText = ref<string>()

exerciseData.load(0, take.value, undefined)

function search() {
  exerciseData.load(0, take.value, searchText.value)
  first.value = 0
}

function upd(event: PageState) {
  exerciseData.load(event.first, event.rows, searchText.value)
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
        <DataTable :value="exerciseData.exercises?.records">
          <Column field="name" header="Название" />
          <Column field="tags" header="Группы мышц" />
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
