<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const auth = authStore()
const me = meStore()
const toast = useToast()

const newName = ref<string | undefined>(undefined)

onMounted(() => {
  me.getMe()
})

const letter = computed<string>(() => {
  let name = me.userData?.userName
  return name ? name[0].toUpperCase() : 'U'
})

function logout() {
  auth.logout()
  window.localStorage.clear()
  router.push('/')
}

function changeName() {
  if (newName.value) {
    me.changeName(newName.value)
      .then(() => {
        toast.add({
          severity: 'success',
          summary: 'Сохранено',
          detail: 'Ваше имя успешно изменено',
          closable: true,
          life: 1000
        })
        newName.value = undefined
        me.getMe()
      })
      .catch(() => {
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось изменить имя',
          closable: true,
          life: 3000
        })
      })
  }
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
      <AccordionTab header="Профиль">
        <div class="grid">
          <div class="col-12 md:col-4 lg:col-3">
            <h3>Сменить имя</h3>
          </div>
          <div class="col-12 md:col-8 lg:col-9">
            <div class="grid my-auto">
              <div class="col-9 md:col-10 lg:col-11">
                <InputText
                  v-model="newName"
                  type="text"
                  placeholder="Введите новое имя"
                  class="w-full"
                />
              </div>
              <div class="col-3 md:col-2 lg:col-1">
                <Button
                  :disabled="newName === undefined || newName === ''"
                  @click="changeName"
                  icon="pi pi-save"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-4 lg:col-3">
            <h3>Сменить пароль</h3>
          </div>
          <div class="col-12 md:col-8 lg:col-9">
            <div class="grid my-auto">
              <div class="col-12">
                <Password
                  promptLabel="Введите новый пароль"
                  placeholder="Введите новый пароль"
                  class="w-full"
                  inputClass="w-full"
                >
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Требования:</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>не менее 6 символов</li>
                      <li>хотя бы одну цифру</li>
                      <li>хотя бы один неалфавитно-цифровой символ</li>
                      <li>хотя бы одну строчную букву</li>
                      <li>хотя бы одну заглавную букву</li>
                    </ul>
                  </template>
                </Password>
              </div>
              <div class="col-9 md:col-10 lg:col-11">
                <Password
                  placeholder="Подтвердите пароль"
                  class="w-full"
                  inputClass="w-full"
                  :feedback="false"
                />
              </div>
              <div class="col-3 md:col-2 lg:col-1">
                <Button icon="pi pi-save" class="w-full" />
              </div>
            </div>
          </div>
        </div>
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
