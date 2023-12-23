<script setup lang="ts">
import { ref } from 'vue'

const productMock = ref(new Array(10))
</script>

<template>
  <DataTable :value="productMock">
    <Column field="name" header="Название">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="tags" header="Группы мышц">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>
</template>
