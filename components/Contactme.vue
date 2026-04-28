<template>
  <section id="contact" class="@container shell-section">
    <h2 class="section-title">Contact</h2>
    <span class="section-subtitle">Une question ou un projet : écrivez-moi</span>

    <div
      class="container mx-auto grid max-w-6xl auto-rows-auto gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16 lg:px-8">
      <div class="md:max-w-md">
        <div v-for="(c, i) in contact" :key="i" class="mb-8 flex gap-4 items-start last:mb-0">
          <svg v-if="c.kind === 'phone'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 text-primary"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <svg v-else-if="c.kind === 'email'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 text-primary"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg v-else-if="c.kind === 'location'" xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <h3 class="text-lg font-medium">{{ c.label }}</h3>
            <span class="text-sm text-primary-text">{{ c.content }}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendEmails"
        class="grid w-full max-w-xl auto-rows-auto gap-6 justify-self-center md:max-w-none md:justify-self-stretch lg:justify-self-center">
        <div class="grid auto-rows-auto gap-6 md:grid-cols-2">
          <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
            <label for="contact-name" class="text-sm font-medium text-primary-title">Nom</label>
            <input id="contact-name" v-model="formData.name" type="text" name="name" autocomplete="name"
              placeholder="Jean Dupont"
              class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 pr-0 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input" />
          </div>
          <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
            <label for="contact-email" class="text-sm font-medium text-primary-title">Courriel</label>
            <input id="contact-email" v-model="formData.email" type="email" name="email" autocomplete="email"
              placeholder="vous@exemple.fr" required
              class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 pr-0 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input" />
          </div>
        </div>
        <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
          <label for="contact-project" class="text-sm font-medium text-primary-title">Projet</label>
          <input id="contact-project" v-model="formData.project" type="text" name="subject" autocomplete="off"
            placeholder="Site vitrine, API, …" required
            class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 pr-0 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input" />
        </div>
        <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
          <label for="contact-message" class="text-sm font-medium text-primary-title">Message</label>
          <textarea id="contact-message" v-model="formData.message" name="message" placeholder="Écrivez votre message"
            rows="7" required
            class="w-full resize-y rounded-sm border-none bg-primary-input px-2 pt-1 pr-0 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input" />
        </div>
        <div v-if="errorMessage" class="mt-1 text-center text-(--form-status-error)" role="alert">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mt-1 text-center text-(--form-status-success)" role="status">
          {{ successMessage }}
        </div>
        <div>
          <button type="submit"
            class="button inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isLoading">
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer' }}
            <Icon :name="isLoading ? 'i-mdi:loading' : 'i-mdi:send'" class="button-icon"
              :class="{ 'motion-safe:animate-spin': isLoading }" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'

const formData = reactive({
  name: '',
  email: '',
  project: '',
  message: ''
})

const contact = [
  { kind: 'phone' as const, label: 'Téléphone', content: '0659113907' },
  { kind: 'email' as const, label: 'Courriel', content: 'bboulikou@gmail.com' },
  { kind: 'location' as const, label: 'Localisation', content: 'France — Nantes' },
]

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const config = useRuntimeConfig()

const emailService = emailjs

emailService.init({
  publicKey: config.public.EMAILJS_PUBLIC_KEY,
})

const sendEmails = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      title: formData.project,
      message: formData.message,
    }
    await emailService.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_OWNER_ID,
      templateParams,
    )

    await emailService.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_REPLY_ID,
      {
        ...templateParams
      },
      config.public.EMAILJS_PUBLIC_KEY
    )

    successMessage.value = 'Message envoyé avec succès !'
    formData.name = ''
    formData.email = ''
    formData.project = ''
    formData.message = ''

  } catch {
    errorMessage.value = 'Échec de l\'envoi du message. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
