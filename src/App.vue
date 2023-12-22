<script setup lang="ts">
import { RouterView } from 'vue-router'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'

const auth = authStore()
const me = meStore()
</script>

<template>
  <Toast position="bottom-center" />
  <Menubar v-if="auth.isAuth">
    <template #end>
      <div class="flex align-items-center gap-2">
        <h5>{{ me.userData?.userName }}</h5>
      </div>
    </template>
  </Menubar>

  <RouterView />
</template>

<style scoped></style>
