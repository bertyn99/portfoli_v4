<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui"
import { reactive, ref } from "vue"

const objectiveOptions = [
  { value: "Performance", label: "Performance", icon: "i-mdi-speedometer" },
  { value: "SEO", label: "SEO", icon: "i-mdi-magnify" },
  { value: "Accessibilité", label: "Accessibilité", icon: "i-mdi-wheelchair-accessibility" },
  { value: "Design / UX", label: "Design / UX", icon: "i-mdi-palette-outline" },
  { value: "Autre", label: "Autre", icon: "i-mdi-dots-horizontal" },
]

const auditPoints = [
  { icon: "i-mdi-speedometer", label: "Performance", text: "Core Web Vitals et temps de chargement" },
  { icon: "i-mdi-magnify", label: "SEO", text: "Balises, structure et indexation" },
  { icon: "i-mdi-wheelchair-accessibility", label: "Accessibilité", text: "Conformité WCAG et navigation clavier" },
  { icon: "i-mdi-palette-outline", label: "Design", text: "Hiérarchie visuelle et expérience utilisateur" },
] as const

const form = reactive({
  url: "",
  name: "",
  email: "",
  objectives: [] as string[],
  message: "",
})

const isLoading = ref(false)
const toast = useToast()

function validate(state: Partial<typeof form>): FormError[] {
  const errors: FormError[] = []
  if (!state.url?.trim()) {
    errors.push({ name: "url", message: "L’URL du site est requise." })
  }
  if (!state.name?.trim()) {
    errors.push({ name: "name", message: "Le nom est requis." })
  }
  if (!state.email?.trim()) {
    errors.push({ name: "email", message: "L’email est requis." })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ name: "email", message: "Indiquez un email valide." })
  }
  if (!state.objectives?.length) {
    errors.push({ name: "objectives", message: "Choisissez au moins un objectif." })
  }
  return errors
}

async function submitAudit(_event: FormSubmitEvent<typeof form>) {
  isLoading.value = true

  try {
    await $fetch("/api/audit", {
      method: "POST",
      body: {
        url: form.url,
        name: form.name,
        email: form.email,
        objectives: form.objectives,
        message: form.message || undefined,
      },
    })
    toast.add({
      title: "Demande envoyée",
      description: "Vous recevrez votre rapport sous 48h ouvrées.",
      color: "success",
    })
    umTrackEvent("form-submit-audit", {
      objectivesCount: form.objectives.length,
    })
    form.url = ""
    form.name = ""
    form.email = ""
    form.objectives = []
    form.message = ""
  } catch (err: unknown) {
    const data = err as { data?: { statusMessage?: string }; statusMessage?: string }
    toast.add({
      title: "Envoi impossible",
      description:
        data?.data?.statusMessage
        || data?.statusMessage
        || "Réessayez dans un instant.",
      color: "error",
    })
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

      <UForm
        :state="form"
        :validate="validate"
        class="grid w-full max-w-xl auto-rows-auto gap-6 justify-self-center md:max-w-none md:justify-self-stretch"
        @submit="submitAudit"
      >
        <UFormField label="URL du site" name="url" required>
          <UInput
            v-model="form.url"
            type="url"
            placeholder="https://votresite.fr"
            class="w-full"
          />
        </UFormField>

        <div class="grid gap-6 md:grid-cols-2">
          <UFormField label="Nom" name="name" required>
            <UInput
              v-model="form.name"
              autocomplete="name"
              placeholder="Jean Dupont"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="vous@exemple.fr"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField label="Objectifs" name="objectives" hint="Au moins un" required>
          <UCheckboxGroup
            v-model="form.objectives"
            :items="objectiveOptions"
            variant="card"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Message" name="message" hint="Optionnel">
          <UTextarea
            v-model="form.message"
            :rows="4"
            placeholder="Décrivez ce que vous souhaitez améliorer..."
            class="w-full"
          />
        </UFormField>

        <div>
          <UButton type="submit" :loading="isLoading" trailing-icon="i-mdi-send">
            {{ isLoading ? "Envoi en cours..." : "Demander mon audit gratuit" }}
          </UButton>
        </div>
      </UForm>
    </div>
  </section>
</template>
