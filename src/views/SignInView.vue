<script setup lang="ts">
import * as yup from 'yup'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'
import type { ApiError } from '@/api/codegen'

const router = useRouter()
const toast = useToast()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Некорректный формат').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле')
  })
})

const [email, emailAttr] = defineField<any, string>('email', { validateOnModelUpdate: false })
const [password, passwordAttr] = defineField<any, string>('password', {
  validateOnModelUpdate: false
})

const checked = ref(true)
const auth = authStore()
const me = meStore()

function toSignUp() {
  router.push('/signup')
}

function canLogin(): boolean {
  const hasValidationError = errors.value.email || errors.value.password
  const hasData = email.value !== undefined && password.value !== undefined
  return !hasValidationError && hasData
}

function login() {
  if (!canLogin()) {
    toast.add({
      severity: 'warn',
      summary: 'Внимание',
      detail: 'Введены некорректные данные',
      closable: true,
      life: 3000
    })
    return
  }

  auth
    .login(email.value, password.value)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Вы успешно авторизованы. Получаем данные профиля...',
        closable: true,
        life: 1000
      })
      me.getMe().then(() => {
        // TODO: CHANGE
        router.push('/')
      })
    })
    .catch((error: ApiError) => {
      if (error.status === 401)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неверный логин или пароль',
          closable: true,
          life: 3000
        })
    })
}
</script>

<template>
  <div class="flex justify-content-center align-items-center min-h-screen">
    <div class="surface-card p-4 shadow-2 border-round w-auto sm:w-8 md:w-7 lg:w-4">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toSignUp"
          >Create today!</a
        >
      </div>

      <div>
        <div class="mb-2">
          <label for="email" class="block text-900 font-medium">Email</label>
          <InputText
            v-model="email"
            v-bind="emailAttr"
            id="email"
            type="text"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.email }"
          />
          <div>
            <small class="p-error" id="text-error">{{ errors.email }}</small>
          </div>
        </div>

        <div class="mb-2">
          <label for="password" class="block text-900 font-medium">Password</label>
          <InputText
            v-model="password"
            v-bind="passwordAttr"
            id="password"
            type="password"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.email }"
          />
          <div>
            <small class="p-error" id="text-error">{{ errors.email }}</small>
          </div>
        </div>

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox v-model="checked" id="rememberme" :binary="true" class="mr-2"></Checkbox>
            <label for="rememberme">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button @click.prevent="login" label="Sign In" icon="pi pi-user" class="w-full"></Button>
      </div>
    </div>
  </div>
</template>
