<template>
  <section id="contact" class="contact section">
    <h2 class="section-title">Contact</h2>
    <span class="section-subtitle"
      >Si vous avez des requêtes ou des questions n'hésiter pas à me
      contacter</span
    >

    <div class="contact-container container grid mx-auto px-4 sm:px-6 lg:px-8">
      <div class="">
        <div v-for="(c, i) in contact" :key="i" class="contact-information">
          <svg
            v-if="c.type == 'Telephone'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <svg
            v-if="c.type == 'Email'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <svg
            v-if="c.type == 'Localisation'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <h3 class="contact-title">{{ c.type }}</h3>
            <span class="contact-subtitle">{{ c.content }}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendEmails" class="contact-form grid">
        <div class="contact-inputs grid">
          <div class="contact-content">
            <label for="" class="contact-label"> Nom </label>
            <input type="text" placeholder="Jhon Doe" class="contact-input" v-model="formData.name" />
          </div>
          <div class="contact-content">
            <label for="" class="contact-label">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              class="contact-input"
              v-model="formData.email"
              required
            />
          </div>
        </div>
        <div class="contact-content">
          <label for="" class="contact-label">Projet</label>
          <input
            type="text"
            placeholder="Website,Serveur api ..."
            class="contact-input"
            v-model="formData.project"
            required
          />
        </div>
        <div class="contact-content">
          <label for="" class="contact-label">Message</label>
          <textarea
            placeholder="Ecrivez votre message"
            cols="0"
            rows="7"
            class="contact-input"
            v-model="formData.message"
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div>
          <button type="submit" class="button button-flex" :disabled="isLoading">
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer' }}
        <svg v-if="!isLoading" class="button-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const formData = reactive({
  name: '',
  email: '',
  project: '',
  message: ''
})
const contact= [
  { type: 'Telephone', content: '0659113907' },
  { type: 'Email', content: 'bboulikou@gmail.com' },
  { type: 'Localisation', content: 'France-Nantes' },
]


const isLoading = ref(false)
const errorMessage = ref('')  
const successMessage = ref('')

const config = useRuntimeConfig()

const emailService=emailjs

emailService.init({
  publicKey: config.public.EMAILJS_PUBLIC_KEY,
})

console.log(emailService)


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
console.log(  config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_OWNER_ID,
      templateParams,
    )
    await emailService.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_OWNER_ID,
      templateParams,
    )


    // Envoyer l'auto-réponse au client
    await emailService.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_REPLY_ID,{
      ...templateParams
    },
      config.public.EMAILJS_PUBLIC_KEY
    )

    successMessage.value = 'Message envoyé avec succès!'
    formData.name = ''
    formData.email = ''
    formData.project = ''
    formData.message = ''

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    errorMessage.value = 'Échec de l\'envoi du message. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="postcss">
.contact {
  &-container {
    @apply grid auto-rows-auto gap-12;
    @screen md {
      @apply grid-cols-2 gap-4 justify-center mx-auto;
    }
  }
  &-form {
    @screen xl {
      width: 460px;
    }
  }
  &-inputs {
    @screen xl {
      @apply grid-cols-2;
    }
  }
  &-form,
  &-inputs {
    @apply grid auto-rows-auto gap-12;
  }
  &-information {
    @apply flex mb-8;
  }
  &-icon {
    @apply text-3xl text-primary h-6 w-6 mb-3;
  }
  &-title {
    @apply text-lg font-medium;
  }

  &-subtitle {
    @apply text-sm text-primary-text;
  }
  &-content {
    @apply rounded-lg bg-primary-input pt-3 px-4 pb-1;
  }
  &-label {
    @apply text-xs text-primary-title;
  }
  &-input {
    @apply w-full bg-primary-input text-primary-text font-poppins border-none outline-none pt-1 px-2 pr-0;
  }
}
.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  text-align: center;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>