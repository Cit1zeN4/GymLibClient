<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

import { authStore } from '@/stores/auth'
const auth = authStore()

if (auth.isAuth) router.push('/feed')

function toSignIn() {
  router.push('/signin')
}

function toSignUp() {
  router.push('/signup')
}
</script>

<template>
  <div v-if="!auth.isAuth">
    <!-- HERO -->
    <div>
      <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <section>
            <span class="block text-6xl font-bold mb-1">Create the screens your</span>
            <div class="text-6xl text-primary font-bold mb-3">visitors deserve to see</div>
            <p class="mt-0 mb-4 text-700 line-height-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <Button
              @click="toSignUp"
              label="Sign Up"
              type="button"
              class="mr-3 p-button-raised"
            ></Button>
            <Button
              @click="toSignIn"
              label="Sign In"
              type="button"
              class="p-button-outlined"
            ></Button>
          </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden ltr">
          <img
            src="@/assets/images/hero-1.jpg"
            alt="Image"
            class="md:ml-auto hidden md:block md:max-h-screen"
            style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
          />
        </div>
      </div>
    </div>
    <!-- FEATURES -->
    <div>
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
        <div class="mb-3 font-bold text-3xl">
          <span class="text-900">One Product, </span>
          <span class="text-primary-600">Many Solutions</span>
        </div>
        <div class="text-700 mb-6">
          Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
        </div>
        <div class="grid">
          <div class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-desktop text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Built for Developers</div>
            <span class="text-700 line-height-3"
              >Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.</span
            >
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-lock text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
            <span class="text-700 line-height-3"
              >Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam
              ultrices sagittis.</span
            >
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-check-circle text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span class="text-700 line-height-3"
              >Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt
              vitae semper.</span
            >
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-globe text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
            <span class="text-700 line-height-3"
              >Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span
            >
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-github text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Open Source</div>
            <span class="text-700 line-height-3"
              >Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique
              risus nec feugiat.
            </span>
          </div>
          <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
              <i class="pi pi-shield text-4xl text-primary-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Trusted Security</div>
            <span class="text-700 line-height-3"
              >Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam
              eleifend.</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- ABOUT -->
    <div>
      <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 overflow-hidden rtl">
          <img
            src="@/assets/images/hero-1.jpg"
            alt="Image"
            class="md:ml-auto hidden md:block md:max-h-screen"
            style="clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%)"
          />
        </div>
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <section>
            <div class="flex flex-row flex-wrap justify-content-center">
              <span class="block text-6xl font-bold mb-1">About</span>
              <div class="text-6xl text-primary font-bold mb-3 ml-2">Us</div>
            </div>

            <p class="mt-0 mb-4 text-700 line-height-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat beatae excepturi
              dignissimos nihil reprehenderit necessitatibus sit a sint illo. Porro sequi recusandae
              debitis sit quibusdam quos necessitatibus enim perferendis doloremque!
            </p>
          </section>
        </div>
      </div>
    </div>
    <!-- COMMUNITY -->
    <div>
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="text-700 text-center">
          <div class="text-primary-600 font-bold mb-3">
            <i class="pi pi-discord"></i>&nbsp;POWERED BY DISCORD
          </div>
          <div class="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
          <div class="text-700 text-2xl mb-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.
          </div>
          <Button
            label="Join Now"
            icon="pi pi-discord"
            class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
