<script setup lang="ts">
import { ref } from 'vue'

const sleepMock = ref(new Array(5))
</script>

<template>
  <DataTable :value="sleepMock">
    <Column field="date" header="Дата" class="w-25rem">
      <template #body="slotProps">
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="value" header="Время">
      <template #body="slotProps">
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <div class="flex justify-content-end">
          <Skeleton></Skeleton>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
