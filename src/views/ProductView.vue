<script setup lang="ts">
import ProductTableSkeleton from '@/components/ProductTableSkeleton.vue'
import { productStore } from '@/stores/products'
import type { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const productData = productStore()
let take = ref(10)

productData.load(0, take.value)

function upd(event: PageState) {
  productData.load(event.first, event.rows)
}
</script>

<template>
  <div class="mx-5">
    <h1>Продукты</h1>
    <div v-if="productData.isLodaded">
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
            {{ `${slotProps.data.kcal} г.` }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else>
      <ProductTableSkeleton />
    </div>

    <Paginator
      :rows="take"
      :totalRecords="productData.products?.totalCount"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="upd"
    ></Paginator>
  </div>
</template>
