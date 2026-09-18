<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'

const prefersReducedMotion = useReducedMotion()
const easeOut = [0.22, 1, 0.36, 1] as const
const { calculate } = useEstimate()

const stepLabels = ['Type', 'Fonctionnalités', 'Détails', 'Résumé'] as const

const stepHints: Record<number, string> = {
  1: 'Quel type de site ou d\'application souhaitez-vous créer ?',
  2: 'Cochez les options utiles à votre projet — vous pourrez tout ajuster ensuite.',
  3: 'Budget, délai et coordonnées pour personnaliser l\'estimation.',
  4: 'Vérifiez le récapitulatif avant d\'envoyer votre demande.',
}

const projectTypes = [
  { label: 'Site vitrine', icon: 'i-mdi:web', hint: 'Présentation & pages clés' },
  { label: 'Application web', icon: 'i-mdi:application-outline', hint: 'Outil métier ou SaaS' },
  { label: 'E-commerce', icon: 'i-mdi:cart-outline', hint: 'Vente en ligne' },
  { label: 'Landing page', icon: 'i-mdi:rocket-launch-outline', hint: 'Campagne ciblée' },
  { label: 'Refonte / Redesign', icon: 'i-mdi:palette-outline', hint: 'Site existant' },
  { label: 'Autre', icon: 'i-mdi:dots-horizontal', hint: 'Projet sur mesure' },
] as const

const featuresList = [
  'Design UI/UX sur mesure',
  'Responsive / Mobile-first',
  'CMS (gestion de contenu)',
  'Authentification utilisateurs',
  'Paiement en ligne',
  'SEO & référencement',
  'Analytics & tracking',
  'Multi-langue',
] as const

const budgetOptions = [
  '< 1 000 €',
  '1 000 - 3 000 €',
  '3 000 - 5 000 €',
  '5 000 - 10 000 €',
  '> 10 000 €',
  'À discuter',
] as const

const timelineOptions = [
  '< 1 mois',
  '1-2 mois',
  '2-4 mois',
  '> 4 mois',
  'Flexible',
] as const

const currentStep = ref(1)
const stepDirection = ref(1)
const isLoading = ref(false)
const errorMessage = ref('')
const submitted = ref(false)
const stepContainerRef = ref<HTMLElement | null>(null)

const form = reactive({
  projectType: '',
  features: [] as string[],
  budget: budgetOptions[1],
  timeline: timelineOptions[1],
  name: '',
  email: '',
  url: '',
  description: '',
})

const estimate = computed(() =>
  form.projectType ? calculate(form.projectType, form.features) : null,
)

const selectedTypeMeta = computed(() =>
  projectTypes.find((t) => t.label === form.projectType),
)

const formattedEstimate = computed(() => {
  if (!estimate.value) return null
  const { min, max } = estimate.value
  return `~ ${min.toLocaleString('fr-FR')} € – ${max.toLocaleString('fr-FR')} €`
})

const canGoNext = computed(() => {
  if (currentStep.value === 1) return Boolean(form.projectType)
  if (currentStep.value === 3) {
    return Boolean(form.name.trim() && form.email.trim() && form.budget && form.timeline)
  }
  return true
})

const stepperItems = stepLabels.map((title) => ({ title }))
const budgetItems = budgetOptions.map((opt) => ({ label: opt, value: opt }))
const timelineItems = timelineOptions.map((opt) => ({ label: opt, value: opt }))

const stepperIndex = computed({
  get: () => currentStep.value - 1,
  set: (value: string | number) => {
    currentStep.value = Number(value) + 1
  },
})

function selectProjectType(label: string) {
  form.projectType = label
}

function toggleFeature(feature: string) {
  const idx = form.features.indexOf(feature)
  if (idx >= 0) {
    form.features.splice(idx, 1)
  } else {
    form.features.push(feature)
  }
}

function isFeatureSelected(feature: string) {
  return form.features.includes(feature)
}

async function focusStepField() {
  await nextTick()
  const root = stepContainerRef.value
  if (!root) return
  const focusable = root.querySelector<HTMLElement>(
    'input:not([type="hidden"]), select, textarea, button[role="radio"]:not([aria-checked="false"])',
  )
  focusable?.focus()
}

function goNext() {
  if (!canGoNext.value || currentStep.value >= 4) return
  stepDirection.value = 1
  currentStep.value += 1
  focusStepField()
}

function goPrev() {
  if (currentStep.value <= 1) return
  stepDirection.value = -1
  currentStep.value -= 1
  focusStepField()
}

watch(currentStep, () => {
  focusStepField()
})

async function submitDevis() {
  if (!estimate.value) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/devis', {
      method: 'POST',
      body: {
        projectType: form.projectType,
        features: form.features,
        budget: form.budget,
        timeline: form.timeline,
        name: form.name,
        email: form.email,
        url: form.url || undefined,
        description: form.description || undefined,
        estimateMin: estimate.value.min,
        estimateMax: estimate.value.max,
      },
    })
    umTrackEvent('form-submit-devis', {
      projectType: form.projectType,
      budget: form.budget,
      timeline: form.timeline,
      featuresCount: form.features.length,
      estimateMin: estimate.value.min,
      estimateMax: estimate.value.max,
    })
    submitted.value = true
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

const stepMotionInitial = computed(() => {
  if (prefersReducedMotion.value) return { opacity: 1, x: 0 }
  return { opacity: 0, x: stepDirection.value > 0 ? 20 : -20 }
})

const stepMotionAnimate = computed(() => {
  if (prefersReducedMotion.value) return { opacity: 1, x: 0 }
  return { opacity: 1, x: 0 }
})
</script>

<template>
  <section class="shell-section devis-wizard" aria-labelledby="devis-wizard-heading">
    <h2 id="devis-wizard-heading" class="sr-only">Assistant devis</h2>

    <div class="container">
      <div
        v-if="submitted"
        class="devis-card mx-auto max-w-xl p-8 text-center md:p-10"
      >
        <div
          class="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/12 text-primary"
          aria-hidden="true"
        >
          <Icon name="i-mdi:check-circle" class="size-9" />
        </div>
        <p class="devis-card-title mb-2 text-xl font-black text-primary-title">Demande envoyée</p>
        <p class="mb-6 text-primary-text">
          Merci ! Votre estimation indicative vous a été transmise.
        </p>
        <div
          v-if="formattedEstimate"
          class="devis-estimate-hero mb-6 rounded-xl px-5 py-6"
        >
          <p class="devis-estimate-label mb-1">Fourchette estimée</p>
          <p class="devis-estimate-value text-2xl md:text-3xl">{{ formattedEstimate }}</p>
        </div>
        <p class="mb-8 text-sm text-primary-text">
          Je vous recontacte sous 48h pour affiner ce devis selon vos besoins réels.
        </p>
        <UButton
          to="https://cal.com/bertyn-boulikou"
          target="_blank"
          trailing-icon="i-mdi-calendar"
          aria-label="Réserver un entretien (ouvre Cal.com dans un nouvel onglet)"
        >
          Réserver un entretien pour affiner
        </UButton>
      </div>

      <div
        v-else
        class="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start lg:gap-10 xl:gap-12"
      >
        <div class="devis-card min-w-0 p-5 sm:p-6 md:p-8">
          <nav class="mb-8" aria-label="Étapes du devis">
            <UStepper
              v-model="stepperIndex"
              :items="stepperItems"
              color="primary"
              class="w-full"
              :linear="true"
            />
          </nav>

          <header class="mb-6 border-b border-primary/10 pb-6">
            <p class="text-xs font-semibold uppercase tracking-widest text-primary">
              Étape {{ currentStep }} / 4
            </p>
            <h3 class="mt-1 text-lg font-black text-primary-title sm:text-xl">
              {{ stepLabels[currentStep - 1] }}
            </h3>
            <p class="mt-2 max-w-prose text-sm leading-relaxed text-primary-text">
              {{ stepHints[currentStep] }}
            </p>
          </header>

          <div
            v-if="formattedEstimate"
            class="devis-estimate-hero mb-6 rounded-xl px-4 py-4 lg:hidden"
          >
            <p class="devis-estimate-label">Estimation en direct</p>
            <p class="devis-estimate-value text-xl">{{ formattedEstimate }}</p>
          </div>

          <div ref="stepContainerRef">
            <Motion
              :key="currentStep"
              as="div"
              :initial="stepMotionInitial"
              :animate="stepMotionAnimate"
              :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut }"
            >
              <div v-show="currentStep === 1">
                <div
                  class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
                  role="radiogroup"
                  aria-labelledby="devis-type-label"
                >
                  <p id="devis-type-label" class="sr-only">Type de projet</p>
                  <button
                    v-for="type in projectTypes"
                    :key="type.label"
                    type="button"
                    role="radio"
                    :aria-checked="form.projectType === type.label"
                    class="group relative rounded-xl border-2 p-4 text-left transition duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-body motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
                    :class="
                      form.projectType === type.label
                        ? 'border-primary bg-primary-lighter ring-2 ring-primary/30 shadow-md'
                        : 'border-primary/15 bg-primary-container'
                    "
                    @click="selectProjectType(type.label)"
                  >
                    <span
                      v-if="form.projectType === type.label"
                      class="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-white"
                      aria-hidden="true"
                    >
                      <Icon name="i-mdi:check" class="size-4" />
                    </span>
                    <span
                      class="mb-3 flex size-11 items-center justify-center rounded-lg border transition duration-300 motion-safe:group-hover:scale-[1.03]"
                      :class="
                        form.projectType === type.label
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/12 bg-primary/8 text-primary group-hover:border-primary/25'
                      "
                      aria-hidden="true"
                    >
                      <Icon :name="type.icon" class="size-6" />
                    </span>
                    <span class="block text-sm font-bold leading-snug text-primary-title">
                      {{ type.label }}
                    </span>
                    <span class="mt-1 block text-xs text-primary-textLight">
                      {{ type.hint }}
                    </span>
                  </button>
                </div>
              </div>

              <div v-show="currentStep === 2">
                <p id="devis-features-label" class="sr-only">Fonctionnalités souhaitées</p>
                <div
                  class="grid gap-2 sm:grid-cols-2"
                  role="group"
                  aria-labelledby="devis-features-label"
                >
                  <button
                    v-for="feature in featuresList"
                    :key="feature"
                    type="button"
                    class="flex items-center gap-2.5 rounded-lg border-2 px-3 py-3 text-left text-sm font-medium transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    :class="
                      isFeatureSelected(feature)
                        ? 'border-primary bg-primary-lighter text-primary-title ring-1 ring-primary/25'
                        : 'border-primary/15 bg-primary-container text-primary-text'
                    "
                    :aria-pressed="isFeatureSelected(feature)"
                    @click="toggleFeature(feature)"
                  >
                    <Icon
                      :name="isFeatureSelected(feature) ? 'i-mdi:check-circle' : 'i-mdi:circle-outline'"
                      class="size-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{{ feature }}</span>
                  </button>
                </div>
              </div>

              <div v-show="currentStep === 3" class="grid gap-5">
                <div class="grid gap-5 sm:grid-cols-2">
                  <UFormField label="Budget estimé" name="budget">
                    <USelect v-model="form.budget" :items="budgetItems" class="w-full" />
                  </UFormField>
                  <UFormField label="Délai souhaité" name="timeline">
                    <USelect v-model="form.timeline" :items="timelineItems" class="w-full" />
                  </UFormField>
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
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
                <UFormField label="URL actuelle" name="url" hint="Optionnel">
                  <UInput
                    v-model="form.url"
                    type="url"
                    placeholder="https://votresite.fr"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Description" name="description" hint="Optionnel">
                  <UTextarea
                    v-model="form.description"
                    :rows="4"
                    placeholder="Décrivez brièvement votre projet..."
                    class="w-full"
                  />
                </UFormField>
              </div>

              <div v-show="currentStep === 4" class="grid gap-6">
                <div class="rounded-xl border border-primary/12 bg-primary-container p-5 sm:p-6">
                  <div class="flex flex-wrap items-start gap-3 border-b border-primary/10 pb-4">
                    <span
                      v-if="selectedTypeMeta"
                      class="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary"
                      aria-hidden="true"
                    >
                      <Icon :name="selectedTypeMeta.icon" class="size-5" />
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="text-xs font-semibold uppercase tracking-wide text-primary-textLight">Projet</p>
                      <p class="font-bold text-primary-title">{{ form.projectType }}</p>
                    </div>
                  </div>

                  <dl class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt class="text-primary-textLight">Budget</dt>
                      <dd class="font-medium text-primary-title">{{ form.budget }}</dd>
                    </div>
                    <div>
                      <dt class="text-primary-textLight">Délai</dt>
                      <dd class="font-medium text-primary-title">{{ form.timeline }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt class="text-primary-textLight">Contact</dt>
                      <dd class="font-medium text-primary-title">{{ form.name }} · {{ form.email }}</dd>
                    </div>
                    <div v-if="form.url" class="sm:col-span-2">
                      <dt class="text-primary-textLight">Site actuel</dt>
                      <dd class="truncate font-medium text-primary">{{ form.url }}</dd>
                    </div>
                  </dl>

                  <div v-if="form.features.length" class="mt-4 flex flex-wrap gap-2 border-t border-primary/10 pt-4">
                    <span
                      v-for="f in form.features"
                      :key="f"
                      class="rounded-full border border-primary/15 bg-primary-body px-2.5 py-0.5 text-xs text-primary-text"
                    >
                      {{ f }}
                    </span>
                  </div>

                  <p v-if="form.description" class="mt-4 border-t border-primary/10 pt-4 text-sm text-primary-text">
                    {{ form.description }}
                  </p>
                </div>

                <div class="devis-estimate-hero rounded-xl px-5 py-6 lg:hidden">
                  <p class="devis-estimate-label">Estimation indicative</p>
                  <p v-if="formattedEstimate" class="devis-estimate-value text-2xl">{{ formattedEstimate }}</p>
                  <p class="devis-estimate-footnote mt-3">
                    Design, développement, tests et déploiement inclus.
                  </p>
                </div>
              </div>
            </Motion>
          </div>

          <div v-if="errorMessage" class="mt-5 text-center text-(--form-status-error)" role="alert">
            {{ errorMessage }}
          </div>

          <footer class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 pt-6">
            <UButton
              v-if="currentStep > 1"
              color="neutral"
              variant="ghost"
              leading-icon="i-mdi-arrow-left"
              @click="goPrev"
            >
              Précédent
            </UButton>
            <span v-else class="text-sm text-muted">Étape {{ currentStep }} sur 4</span>

            <UButton
              v-if="currentStep < 4"
              trailing-icon="i-mdi-arrow-right"
              :disabled="!canGoNext"
              @click="goNext"
            >
              Suivant
            </UButton>
            <UButton
              v-else
              trailing-icon="i-mdi-send"
              :loading="isLoading"
              :disabled="!estimate"
              @click="submitDevis"
            >
              {{ isLoading ? "Envoi en cours..." : "Demander mon devis" }}
            </UButton>
          </footer>
        </div>

        <aside
          class="devis-aside mt-8 lg:sticky lg:top-24 lg:mt-0"
          aria-label="Estimation du projet"
        >
          <div class="devis-aside-card p-5 sm:p-6">
            <div class="mb-4 flex items-center gap-2 text-primary">
              <Icon name="i-mdi:calculator-variant-outline" class="size-6" aria-hidden="true" />
              <span class="text-sm font-bold uppercase tracking-wide">Votre estimation</span>
            </div>

            <div v-if="formattedEstimate" class="devis-estimate-hero rounded-xl px-4 py-5">
              <p class="devis-estimate-label">Fourchette indicative</p>
              <p class="devis-estimate-value text-2xl xl:text-3xl">{{ formattedEstimate }}</p>
              <p class="devis-estimate-footnote mt-4">
                Design, développement, tests et déploiement.
              </p>
            </div>
            <div
              v-else
              class="rounded-xl border border-dashed border-primary/20 bg-primary-container px-4 py-8 text-center"
            >
              <Icon name="i-mdi:gesture-tap" class="mx-auto mb-3 size-10 text-primary/60" aria-hidden="true" />
              <p class="text-sm text-primary-text">
                Choisissez un type de projet pour voir l'estimation se mettre à jour en direct.
              </p>
            </div>

            <ul class="mt-6 space-y-3 border-t border-primary/10 pt-5" role="list">
              <li class="flex gap-2 text-xs text-primary-text">
                <Icon name="i-mdi:shield-check-outline" class="size-4 shrink-0 text-primary" aria-hidden="true" />
                Sans engagement — devis affiné après échange
              </li>
              <li class="flex gap-2 text-xs text-primary-text">
                <Icon name="i-mdi:clock-outline" class="size-4 shrink-0 text-primary" aria-hidden="true" />
                Réponse sous 48h ouvrées
              </li>
              <li class="flex gap-2 text-xs text-primary-text">
                <Icon name="i-mdi:credit-card-outline" class="size-4 shrink-0 text-primary" aria-hidden="true" />
                Paiement en 3 fois possible
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.devis-wizard {
  & .devis-card,
  & .devis-aside-card {
    @apply rounded-2xl border border-primary/12 bg-primary-body shadow-sm;
  }

  & .devis-step {
    @apply flex size-9 items-center justify-center rounded-full border-2 border-primary/15 bg-primary-container text-primary-textLight transition duration-300;

    &--active {
      @apply border-primary bg-primary text-white ring-4 ring-primary/20;
    }

    &--done {
      @apply border-primary bg-primary text-white;
    }
  }

  & .devis-estimate-hero {
    @apply bg-primary-second text-center;

    & .devis-estimate-label {
      @apply text-xs font-semibold uppercase tracking-widest text-white/75;
      font-family: var(--font-family-barlow);
    }

    & .devis-estimate-value {
      @apply font-black leading-tight text-white;
      font-family: var(--font-family-barlow);
    }

    & .devis-estimate-footnote {
      @apply text-xs leading-relaxed text-white/70;
    }
  }
}
</style>
