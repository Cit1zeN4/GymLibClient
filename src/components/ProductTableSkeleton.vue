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
    <Column field="proteins" header="Белки на 100г">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="fats" header="Жиры на 100г">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="carbohydrates" header="Углеводы на 100г">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="kcal" header="Килокалории на 100г">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>
</template>
