<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'
import { ref } from 'vue'

const router = useRouter()
const auth = authStore()
const me = meStore()

const items = ref([
  {
    label: 'Лента',
    icon: 'feed',
    command: () => {
      router.push('/feed')
    }
  },
  {
    label: 'Тренировки',
    icon: 'directions_run',
    command: () => {
      router.push('/trainig')
    }
  },
  {
    label: 'Упражнения',
    icon: 'fitness_center',
    command: () => {
      router.push('/exercise')
    }
  },
  {
    label: 'Питание',
    icon: 'local_dining',
    command: () => {
      router.push('/food')
    }
  },
  {
    label: 'Продукты',
    icon: 'menu_book',
    command: () => {
      router.push('/product')
    }
  },
  {
    label: 'Cон',
    icon: 'bedtime',
    command: () => {
      router.push('/sleep')
    }
  }
])

function toProfile() {
  router.push('/profile')
}
</script>

<template>
  <Toast position="bottom-center" />
  <Menubar :model="items" v-if="auth.isAuth">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span class="material-icons-round">{{ item.icon }}</span>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="material-icons-round">{{ item.icon }}</span>
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <div class="flex align-items-center justify-content-center">
          <h5 @click="toProfile" class="mr-2 pointer">{{ me.userData?.userName }}</h5>
          <Button
            @click="toProfile"
            class="p-1 w-2rem h-2rem border-circle flex align-items-center justify-content-center"
            size="small"
          >
            <span class="pi pi-user"></span>
          </Button>
        </div>
      </div>
    </template>
  </Menubar>

  <RouterView />
</template>
