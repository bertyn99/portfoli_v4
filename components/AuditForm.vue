<script setup lang="ts">
import { reactive, ref } from 'vue'

const objectiveOptions = [
  { id: 'performance', label: 'Performance', icon: 'i-mdi:speedometer' },
  { id: 'seo', label: 'SEO', icon: 'i-mdi:magnify' },
  { id: 'accessibility', label: 'Accessibilité', icon: 'i-mdi:wheelchair-accessibility' },
  { id: 'design', label: 'Design / UX', icon: 'i-mdi:palette-outline' },
  { id: 'other', label: 'Autre', icon: 'i-mdi:dots-horizontal' },
] as const

const auditPoints = [
  { icon: 'i-mdi:speedometer', label: 'Performance', text: 'Core Web Vitals et temps de chargement' },
  { icon: 'i-mdi:magnify', label: 'SEO', text: 'Balises, structure et indexation' },
  { icon: 'i-mdi:wheelchair-accessibility', label: 'Accessibilité', text: 'Conformité WCAG et navigation clavier' },
  { icon: 'i-mdi:palette-outline', label: 'Design', text: 'Hiérarchie visuelle et expérience utilisateur' },
] as const

const form = reactive({
  url: '',
  name: '',
  email: '',
  objectives: [] as string[],
  message: '',
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function toggleObjective(label: string) {
  const idx = form.objectives.indexOf(label)
  if (idx >= 0) {
    form.objectives.splice(idx, 1)
  } else {
    form.objectives.push(label)
  }
}

function isObjectiveChecked(label: string) {
  return form.objectives.includes(label)
}

async function submitAudit() {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch('/api/audit', {
      method: 'POST',
      body: {
        url: form.url,
        name: form.name,
        email: form.email,
        objectives: form.objectives,
        message: form.message || undefined,
      },
    })
    successMessage.value =
      'Demande envoyée ! Vous recevrez votre rapport sous 48h ouvrées.'
    umTrackEvent('form-submit-audit', {
      objectivesCount: form.objectives.length,
    })
    form.url = ''
    form.name = ''
    form.email = ''
    form.objectives = []
    form.message = ''
  } catch (err: unknown) {
    const data = err as { data?: { statusMessage?: string }; statusMessage?: string }
    errorMessage.value =
      data?.data?.statusMessage ||
      data?.statusMessage ||
      'Échec de l\'envoi. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="shell-section" aria-labelledby="audit-form-heading">
    <h2 id="audit-form-heading" class="sr-only">Formulaire d'audit gratuit</h2>

    <div class="container grid gap-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
      <div class="md:max-w-md">
        <p class="mb-6 text-primary-text">
          Un rapport personnalisé couvrant les axes essentiels pour améliorer votre présence en ligne.
        </p>
        <ul class="mb-8 grid gap-4" role="list">
          <li
            v-for="point in auditPoints"
            :key="point.label"
            class="flex gap-3"
          >
            <Icon :name="point.icon" class="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <span class="font-medium text-primary-title">{{ point.label }}</span>
              <p class="text-sm text-primary-text">{{ point.text }}</p>
            </div>
          </li>
        </ul>
        <blockquote class="rounded-lg border border-primary/12 bg-primary-body px-4 py-3 text-sm italic text-primary-text">
          « Des recommandations claires et actionnables, livrées rapidement. »
        </blockquote>
      </div>

      <form
        class="grid w-full max-w-xl auto-rows-auto gap-6 justify-self-center md:max-w-none md:justify-self-stretch"
        @submit.prevent="submitAudit"
      >
        <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
          <label for="audit-url" class="text-sm font-medium text-primary-title">URL du site</label>
          <input
            id="audit-url"
            v-model="form.url"
            type="url"
            name="url"
            required
            placeholder="https://votresite.fr"
            class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
            <label for="audit-name" class="text-sm font-medium text-primary-title">Nom</label>
            <input
              id="audit-name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              required
              placeholder="Jean Dupont"
              class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input"
            />
          </div>
          <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
            <label for="audit-email" class="text-sm font-medium text-primary-title">Email</label>
            <input
              id="audit-email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              required
              placeholder="vous@exemple.fr"
              class="w-full rounded-sm border-none bg-primary-input px-2 pt-1 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input"
            />
          </div>
        </div>

        <fieldset>
          <legend id="audit-objectives-label" class="mb-3 text-sm font-medium text-primary-title">
            Objectifs <span class="text-primary-text">(au moins un)</span>
          </legend>
          <div
            class="grid gap-3 sm:grid-cols-2"
            role="group"
            aria-labelledby="audit-objectives-label"
          >
            <label
              v-for="opt in objectiveOptions"
              :key="opt.id"
              class="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-3 py-2 transition"
              :class="
                isObjectiveChecked(opt.label)
                  ? 'border-primary bg-primary/8'
                  : 'border-primary/12'
              "
            >
              <input
                type="checkbox"
                class="sr-only"
                :checked="isObjectiveChecked(opt.label)"
                @change="toggleObjective(opt.label)"
              />
              <Icon :name="opt.icon" class="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span class="text-sm font-medium text-primary-title">{{ opt.label }}</span>
            </label>
          </div>
        </fieldset>

        <div class="rounded-lg bg-primary-input px-4 pt-3 pb-2">
          <label for="audit-message" class="text-sm font-medium text-primary-title">Message (optionnel)</label>
          <textarea
            id="audit-message"
            v-model="form.message"
            name="message"
            rows="4"
            placeholder="Décrivez ce que vous souhaitez améliorer..."
            class="w-full resize-y rounded-sm border-none bg-primary-input px-2 pt-1 font-family-poppins text-primary-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-input"
          />
        </div>

        <div v-if="errorMessage" class="text-center text-(--form-status-error)" role="alert">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-center text-(--form-status-success)" role="status">
          {{ successMessage }}
        </div>

        <div>
          <button
            type="submit"
            class="button button-flex inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isLoading || form.objectives.length === 0"
          >
            {{ isLoading ? 'Envoi en cours...' : 'Demander mon audit gratuit' }}
            <Icon
              :name="isLoading ? 'i-mdi:loading' : 'i-mdi:send'"
              class="button-icon"
              :class="{ 'motion-safe:animate-spin': isLoading }"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
