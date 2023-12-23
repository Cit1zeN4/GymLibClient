<script setup lang="ts">
import ProductTableSkeleton from '@/components/ProductTableSkeleton.vue'
import { productStore } from '@/stores/products'
import type { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const productData = productStore()

let first = ref(0)
let take = ref(10)
const searchText = ref<string>()

productData.load(0, take.value, undefined)

function search() {
  productData.load(0, take.value, searchText.value)
  first.value = 0
}

function upd(event: PageState) {
  productData.load(event.first, event.rows, searchText.value)
}
</script>

<template>
  <div class="mx-5">
    <h1 class="text-primary">Продукты</h1>
    <div class="my-2 flex justify-content-end">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchText" @keyup.enter="search" placeholder="Поиск" />
      </span>
    </div>
    <div v-if="productData.isLodaded">
      <div v-if="productData.products?.totalCount">
        <DataTable :value="productData.products?.records">
          <Column field="name" header="Название" />
          <Column field="proteins" header="Белки на 100г">
            <template #body="slotProps">
              {{ `${slotProps.data.proteins} г.` }}
            </template>
          </Column>
          <Column field="fats" header="Жиры на 100г">
            <template #body="slotProps">
              {{ `${slotProps.data.fats} г.` }}
            </template>
          </Column>
          <Column field="carbohydrates" header="Углеводы на 100г">
            <template #body="slotProps">
              {{ `${slotProps.data.carbohydrates} г.` }}
            </template>
          </Column>
          <Column field="kcal" header="Килокалории на 100г">
            <template #body="slotProps">
              {{ `${slotProps.data.kcal} ккал` }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <h3 class="text-center color-primary">Продукты не найдены</h3>
      </div>
    </div>
    <div v-else>
      <ProductTableSkeleton />
    </div>

    <Paginator
      v-if="productData.products?.totalCount"
      v-model:first="first"
      :rows="take"
      :totalRecords="productData.products?.totalCount"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="upd"
    ></Paginator>
  </div>
</template>
