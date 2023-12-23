<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'

const router = useRouter()
const auth = authStore()
const me = meStore()

const letter = computed<string>(() => {
  let name = me.userData?.userName
  return name ? name[0].toUpperCase() : 'U'
})

function logout() {
  auth.logout()
  window.localStorage.clear()
  router.push('/')
}
</script>

<template>
  <div class="mx-5">
    <div class="mt-5">
      <div class="flex justify-content-center">
        <Avatar
          :label="letter"
          class="w-8rem h-8rem"
          size="xlarge"
          shape="circle"
          style="font-size: 3.5rem"
        />
      </div>
      <h2 class="text-center">{{ me.userData?.userName }}</h2>
      <div class="flex justify-content-center mb-3">
        <Button :label="`Подписчики: ${me.userData?.followersCount}`" size="small" class="mr-2" />
        <Button :label="`Подписки: ${me.userData?.followingCount}`" size="small" />
      </div>
    </div>

    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionTab header="Header I">
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </AccordionTab>
      <AccordionTab header="Выход">
        <p class="text-center mb-4">
          При нажатии на кнопку "Выйти" вы совершите выход из вашего аккаунта. Вы уверены что хотите
          выйти?
        </p>
        <div class="flex justify-content-center">
          <Button @click="logout" severity="danger" label="Выйти" icon="pi pi-sign-out" />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
