<template>
  <section id="contact" class="shell-section">
    <UContainer>
      <header class="section-heading">
        <h2 class="section-title">Contact</h2>
        <p class="section-subtitle">Une question ou un projet: écrivez-moi.</p>
      </header>
    </UContainer>

    <UContainer class="grid auto-rows-auto gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
      <div class="md:max-w-md">
        <div v-for="(c, i) in contact" :key="i" class="mb-8 flex gap-4 items-start last:mb-0">
          <UIcon :name="c.icon" class="h-6 w-6 shrink-0 text-primary" />
          <div>
            <h3 class="text-lg font-medium">{{ c.label }}</h3>
            <span class="text-sm text-muted">{{ c.content }}</span>
          </div>
        </div>
      </div>

      <UForm
        :state="formData"
        :validate="validate"
        class="grid w-full max-w-xl auto-rows-auto gap-6 justify-self-center md:max-w-none md:justify-self-stretch lg:justify-self-center"
        @submit="sendEmails"
      >
        <div class="grid auto-rows-auto gap-6 md:grid-cols-2">
          <UFormField label="Nom" name="name">
            <UInput
              id="contact-name"
              v-model="formData.name"
              autocomplete="name"
              placeholder="Jean Dupont"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Courriel" name="email" required>
            <UInput
              id="contact-email"
              v-model="formData.email"
              type="email"
              autocomplete="email"
              placeholder="vous@exemple.fr"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField label="Projet" name="project" required>
          <UInput
            id="contact-project"
            v-model="formData.project"
            placeholder="Site vitrine, API, …"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Message" name="message" required>
          <UTextarea
            id="contact-message"
            v-model="formData.message"
            placeholder="Écrivez votre message"
            :rows="7"
            class="w-full"
          />
        </UFormField>
        <div>
          <UButton type="submit" :loading="isLoading" trailing-icon="i-mdi-send">
            {{ isLoading ? "Envoi en cours..." : "Envoyer" }}
          </UButton>
        </div>
      </UForm>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui"
import emailjs from "@emailjs/browser"

const formData = reactive({
  name: "",
  email: "",
  project: "",
  message: "",
})

const contact = [
  { icon: "i-mdi-phone", label: "Téléphone", content: "0659113907" },
  { icon: "i-mdi-email-outline", label: "Courriel", content: "bboulikou@gmail.com" },
  { icon: "i-mdi-map-marker-outline", label: "Localisation", content: "France, Nantes" },
]

const isLoading = ref(false)
const toast = useToast()
const config = useRuntimeConfig()

emailjs.init({
  publicKey: config.public.EMAILJS_PUBLIC_KEY,
})

function validate(state: Partial<typeof formData>): FormError[] {
  const errors: FormError[] = []
  if (!state.email?.trim()) {
    errors.push({ name: "email", message: "Le courriel est requis." })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ name: "email", message: "Indiquez un courriel valide." })
  }
  if (!state.project?.trim()) {
    errors.push({ name: "project", message: "Indiquez le projet." })
  }
  if (!state.message?.trim()) {
    errors.push({ name: "message", message: "Le message est requis." })
  }
  return errors
}

async function sendEmails(_event: FormSubmitEvent<typeof formData>) {
  isLoading.value = true

  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      title: formData.project,
      message: formData.message,
    }
    await emailjs.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_OWNER_ID,
      templateParams,
    )

    await emailjs.send(
      config.public.EMAILJS_SERVICE_ID,
      config.public.EMAILJS_TEMPLATE_REPLY_ID,
      templateParams,
      config.public.EMAILJS_PUBLIC_KEY,
    )

    toast.add({
      title: "Message envoyé",
      description: "Je vous réponds dès que possible.",
      color: "success",
    })
    umTrackEvent("form-submit-contact")
    formData.name = ""
    formData.email = ""
    formData.project = ""
    formData.message = ""
  } catch {
    toast.add({
      title: "Envoi impossible",
      description: "Réessayez dans un instant.",
      color: "error",
    })
  } finally {
    isLoading.value = false
  }
}
</script>
