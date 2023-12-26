<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'
import { useToast } from 'primevue/usetoast'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import type { ApiError } from '@/api/codegen'

const router = useRouter()
const auth = authStore()
const me = meStore()
const toast = useToast()

const newName = ref<string | undefined>(undefined)

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .matches(
        /^(?=.*\d{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})(?=.*[^a-zA-Z0-9])(?!.*\s).{6,64}$/,
        'Пароль не соответсвует требованиям'
      )
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref<string>('password'), ''], 'Пароли должны совпать'),
    oldPassword: yup.string().required('Обязательное поле')
  })
})

const [password, passwordAttr] = defineField('password', { validateOnModelUpdate: false })
const [confirmPassword, confirmPasswordAttr] = defineField('confirmPassword', {
  validateOnModelUpdate: false
})
const [oldPassword, oldPasswordAttr] = defineField('oldPassword', { validateOnModelUpdate: false })

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

function changePassword(oldPasswordparam: string, newPassword: string) {
  console.log('start')
  console.log(me.changePassword)
  me.changePassword(oldPasswordparam, newPassword)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Сохранено',
        detail: 'Пароль успешно обнавлен',
        closable: true,
        life: 1000
      })
      oldPassword.value = null
      password.value = null
      confirmPassword.value = null
    })
    .catch((error: ApiError) => {
      if (error.status === 401)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неверный пароль',
          closable: true,
          life: 3000
        })
      else
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Ошибка смены пароля',
          closable: true,
          life: 3000
        })
    })
}

const canChangePassword = computed(() => {
  var isValid =
    errors.value.oldPassword === undefined &&
    errors.value.password === undefined &&
    errors.value.confirmPassword === undefined

  var isNotEmpty =
    oldPassword.value !== undefined &&
    oldPassword.value !== '' &&
    password.value !== undefined &&
    password.value !== '' &&
    confirmPassword.value !== undefined &&
    confirmPassword.value !== ''
  return !(isValid && isNotEmpty)
})
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
            <div class="grid">
              <div class="col-12">
                <Password
                  toggleMask
                  v-model="oldPassword"
                  v-bind="oldPasswordAttr"
                  placeholder="Введите старый пароль"
                  class="h-full w-full"
                  inputClass="my-auto w-full"
                  :feedback="false"
                  :class="{ 'p-invalid': errors.oldPassword }"
                />
                <small class="p-error" id="text-error">{{ errors.oldPassword || '&nbsp;' }}</small>
              </div>
              <div class="col-12">
                <Password
                  toggleMask
                  v-model="password"
                  v-bind="passwordAttr"
                  weakLabel="Слишком простой"
                  mediumLabel="Норальный"
                  strongLabel="Отличный"
                  promptLabel="Введите новый пароль"
                  placeholder="Введите новый пароль"
                  class="h-full w-full"
                  inputClass="my-auto w-full"
                  :class="{ 'p-invalid': errors.password }"
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
                <small class="p-error" id="text-error">{{ errors.password || '&nbsp;' }}</small>
              </div>
              <div class="col-9 md:col-10 lg:col-11">
                <Password
                  toggleMask
                  v-model="confirmPassword"
                  v-bind="confirmPasswordAttr"
                  placeholder="Подтвердите пароль"
                  class="h-full w-full"
                  inputClass="my-auto w-full"
                  :feedback="false"
                  :class="{ 'p-invalid': errors.confirmPassword }"
                />
                <small class="p-error" id="text-error">{{
                  errors.confirmPassword || '&nbsp;'
                }}</small>
              </div>
              <div class="col-3 md:col-2 lg:col-1 flex align-item-center">
                <Button
                  @click="changePassword(oldPassword, password)"
                  :disabled="canChangePassword"
                  icon="pi pi-save"
                  class="my-auto w-full"
                />
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
