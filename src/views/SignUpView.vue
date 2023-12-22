<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { authStore } from '@/stores/auth'
import { meStore } from '@/stores/me'
import * as yup from 'yup'
import { useToast } from 'primevue/usetoast'
import type { ApiError } from '@/api/codegen'

const router = useRouter()
const toast = useToast()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Некорректный формат').required('Обязательное поле'),
    password: yup
      .string()
      .matches(
        /^(?=.*\d{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})(?=.*[^a-zA-Z0-9])(?!.*\s).{6,64}$/,
        'Пароль должен содержать: ' +
          'не менее 6 символов; ' +
          'хотя бы один неалфавитно-цифровой символ;' +
          'хотя бы одну цифру; ' +
          'хотя бы одну строчную букву' +
          'хотя бы одну заглавную букву'
      )
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref<string>('password'), ''], 'Пароли должны совпать')
  })
})

const [email, emailAttr] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordAttr] = defineField('password', { validateOnModelUpdate: false })
const [confirmPassword, confirmPasswordAttr] = defineField('confirmPassword', {
  validateOnModelUpdate: false
})

const auth = authStore()
const me = meStore()

function toSignIn() {
  router.push('/signin')
}

function canRegister(): boolean {
  const hasValidationError =
    errors.value.email || errors.value.password || errors.value.confirmPassword
  const hasData =
    email.value !== undefined && password.value !== undefined && confirmPassword.value !== undefined
  return !hasValidationError && hasData
}

function register() {
  if (!canRegister()) {
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
    .register(email.value, password.value)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Вы успешно зарегистрированы. Получаем данные профиля...',
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
          detail: 'Ошибка регистрации',
          closable: true,
          life: 3000
        })
    })
}
</script>

<template>
  <div class="flex justify-content-center align-items-center min-h-screen">
    <div class="surface-card p-4 shadow-2 border-round sm:max-w-8 md:max-w-7 lg:max-w-4">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Already have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toSignIn"
          >Sing In</a
        >
      </div>

      <div>
        <div class="mb-4">
          <div class="mb-3">
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText
              v-model="email"
              v-bind="emailAttr"
              id="email"
              type="text"
              class="w-full mb-1"
              :class="{ 'p-invalid': errors.email }"
            />
            <div>
              <small class="p-error" id="text-error">{{ errors.email }}</small>
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <InputText
              v-model="password"
              v-bind="passwordAttr"
              id="password"
              type="password"
              class="w-full mb-1"
              :class="{ 'p-invalid': errors.password }"
            />
            <div>
              <small class="p-error" id="text-error">{{ errors.password }}</small>
            </div>
          </div>

          <div class="mb-3">
            <label for="confirm-password" class="block text-900 font-medium mb-2"
              >Repeat password</label
            >
            <InputText
              v-model="confirmPassword"
              v-bind="confirmPasswordAttr"
              id="confirm-password"
              type="password"
              class="w-full mb-1"
              :class="{ 'p-invalid': errors.confirmPassword }"
            />
            <div>
              <small class="p-error" id="text-error">{{ errors.confirmPassword }}</small>
            </div>
          </div>
        </div>

        <Button @click="register" label="Sign Up" icon="pi pi-user" class="w-full"></Button>
      </div>
    </div>
  </div>
</template>
