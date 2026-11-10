<script setup lang="ts">
import { computed, nextTick, onUnmounted, reactive, ref, watch } from 'vue'
import { AnimatePresence, LayoutGroup, animate, useReducedMotion } from 'motion-v'
import type { CheckboxGroupItem, RadioGroupItem, StepperItem } from '@nuxt/ui'

const prefersReducedMotion = useReducedMotion()
const easeOut = [0.23, 1, 0.32, 1] as const
const { calculate, projectTypes, featuresForType } = useEstimate()
const route = useRoute()

const stepLabels = ['Type', 'Fonctionnalités', 'Détails', 'Résumé'] as const

const stepHints: Record<number, string> = {
  1: 'Quel type de site, d\'application ou d\'automatisation souhaitez-vous créer ?',
  2: 'Cochez les options utiles à votre projet. La liste s\'adapte au type choisi.',
  3: 'Budget, délai et coordonnées pour personnaliser l\'estimation.',
  4: 'Vérifiez le récapitulatif avant d\'envoyer votre demande.',
}

const projectTypeItems = projectTypes.map((type) => ({
  label: type.label,
  value: type.label,
  glyph: type.icon,
  hint: type.hint,
})) satisfies (RadioGroupItem & { glyph: string; hint: string })[]

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

const initialType =
  route.query.from === 'ia' || route.query.type === 'ia'
    ? 'Reprise app IA'
    : ''

const form = reactive({
  projectType: initialType,
  subtype: '',
  features: [] as string[],
  budget: budgetOptions[1],
  timeline: timelineOptions[1],
  name: '',
  email: '',
  url: '',
  description: '',
})

const selectedTypeMeta = computed(() =>
  projectTypes.find((t) => t.label === form.projectType),
)

const currentSubtypes = computed(() => selectedTypeMeta.value?.subtypes ?? [])

const availableFeatures = computed(() =>
  form.projectType ? featuresForType(form.projectType) : [],
)

const featureItems = computed(() =>
  availableFeatures.value.map((feature) => ({
    label: feature.label,
    description: feature.hint,
    value: feature.label,
  })) satisfies CheckboxGroupItem[],
)

const estimate = computed(() =>
  form.projectType
    ? calculate(form.projectType, form.features, form.subtype || undefined)
    : null,
)

watch(
  () => form.projectType,
  (type) => {
    const allowedSubtypes = projectTypes.find((item) => item.label === type)?.subtypes ?? []
    if (!(allowedSubtypes as readonly string[]).includes(form.subtype)) {
      form.subtype = ''
    }
    const allowed = new Set(featuresForType(type).map((feature) => feature.label))
    form.features = form.features.filter((feature) => allowed.has(feature))
  },
)

const displayMin = ref(estimate.value?.min ?? 0)
const displayMax = ref(estimate.value?.max ?? 0)
let minTween: { stop: () => void } | null = null
let maxTween: { stop: () => void } | null = null

watch(
  estimate,
  (next, prev) => {
    minTween?.stop()
    maxTween?.stop()
    if (!next) {
      displayMin.value = 0
      displayMax.value = 0
      return
    }
    if (prefersReducedMotion.value || !prev) {
      displayMin.value = next.min
      displayMax.value = next.max
      return
    }
    minTween = animate(displayMin.value, next.min, {
      duration: 0.2,
      ease: easeOut,
      onUpdate: (value) => {
        displayMin.value = Math.round(value)
      },
    })
    maxTween = animate(displayMax.value, next.max, {
      duration: 0.2,
      ease: easeOut,
      onUpdate: (value) => {
        displayMax.value = Math.round(value)
      },
    })
  },
  { immediate: true },
)

onUnmounted(() => {
  minTween?.stop()
  maxTween?.stop()
})

const formattedMin = computed(() => displayMin.value.toLocaleString('fr-FR'))
const formattedMax = computed(() => displayMax.value.toLocaleString('fr-FR'))

const formattedEstimate = computed(() => {
  if (!estimate.value) return null
  return `~ ${formattedMin.value} € - ${formattedMax.value} €`
})

const estimateLiveText = computed(() =>
  formattedEstimate.value
    ? `Estimation indicative : ${formattedEstimate.value}`
    : 'Aucune estimation. Choisissez un type de projet.',
)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

const canGoNext = computed(() => {
  if (currentStep.value === 1) return Boolean(form.projectType)
  if (currentStep.value === 3) {
    return Boolean(form.name.trim() && isValidEmail(form.email) && form.budget && form.timeline)
  }
  return true
})

const stepperItems = computed<StepperItem[]>(() =>
  [
    { title: 'Type' },
    { title: 'Fonctionnalités' },
    { title: 'Détails' },
    { title: 'Résumé' },
  ].map((item, index) => {
    const stepNumber = index + 1
    const isPastOrCurrent = stepNumber <= currentStep.value
    const isNextUnlocked = stepNumber === currentStep.value + 1 && canGoNext.value
    return {
      ...item,
      disabled: !isPastOrCurrent && !isNextUnlocked,
    }
  }),
)

const budgetItems = budgetOptions.map((opt) => ({ label: opt, value: opt }))
const timelineItems = timelineOptions.map((opt) => ({ label: opt, value: opt }))

const stepperIndex = computed({
  get: () => currentStep.value - 1,
  set: (value: string | number) => {
    const next = Number(value) + 1
    if (next === currentStep.value) return
    if (next > currentStep.value && !canGoNext.value) return
    stepDirection.value = next > currentStep.value ? 1 : -1
    currentStep.value = next
  },
})

const radioGroupUi = {
  fieldset: 'grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3',
  item: 'devis-type-item relative !items-start !justify-start',
  wrapper: 'devis-type-wrapper w-full min-w-0',
  label: 'w-full',
  description: 'sr-only',
}

const checkboxGroupUi = {
  fieldset: 'grid w-full grid-cols-1 gap-2 sm:grid-cols-2',
  item: 'devis-feature-item',
}

async function focusStepField() {
  await nextTick()
  const root = stepContainerRef.value
  if (!root) return
  const focusable = root.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([tabindex="-1"]), select, textarea, [data-state="checked"]',
  )
  focusable?.focus()
}

function goNext() {
  if (!canGoNext.value || currentStep.value >= 4) return
  stepDirection.value = 1
  currentStep.value += 1
}

function goPrev() {
  if (currentStep.value <= 1) return
  stepDirection.value = -1
  currentStep.value -= 1
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
        projectSubtype: form.subtype || undefined,
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
      projectSubtype: form.subtype || undefined,
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

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: prefersReducedMotion.value ? 0 : 12 * direction,
  }),
  show: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: prefersReducedMotion.value ? 0 : -12 * direction,
  }),
}

const stepTransition = computed(() =>
  prefersReducedMotion.value
    ? { duration: 0.16, ease: easeOut }
    : { duration: 0.22, ease: easeOut },
)
</script>

<template>
  <section class="devis-wizard" aria-labelledby="devis-wizard-heading">
    <h2 id="devis-wizard-heading" class="sr-only">Assistant devis</h2>

    <UContainer>
      <div
        v-if="submitted"
        class="mx-auto max-w-xl rounded-xl bg-elevated p-8 ring-1 ring-primary/12 md:p-10"
      >
        <Motion
          as="div"
          class="mx-auto mb-5 flex size-14 items-center justify-center rounded-lg bg-primary/12 text-primary"
          aria-hidden="true"
          :initial="prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: easeOut }"
        >
          <UIcon name="i-lucide-circle-check" class="size-9" />
        </Motion>
        <p class="mb-2 text-xl font-black text-highlighted">Demande envoyée</p>
        <p class="mb-6 text-muted">
          Merci. Votre estimation indicative vous a été transmise.
        </p>
        <div
          v-if="formattedEstimate"
          class="mb-6 rounded-lg bg-muted px-5 py-5 text-center"
        >
          <p class="devis-estimate-label mb-1">Fourchette estimée</p>
          <p class="devis-estimate-value text-2xl md:text-3xl">{{ formattedEstimate }}</p>
        </div>
        <p class="mb-8 text-sm text-muted">
          Je vous recontacte sous 48h pour affiner ce devis selon vos besoins réels.
        </p>
        <UButton
          to="https://cal.com/bertyn-boulikou"
          target="_blank"
          trailing-icon="i-lucide-calendar"
          aria-label="Réserver un entretien (ouvre Cal.com dans un nouvel onglet)"
        >
          Réserver un entretien
        </UButton>
      </div>

      <div
        v-else
        class="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] lg:items-start lg:gap-10 xl:gap-14"
      >
        <div class="min-w-0">
          <nav class="mb-6" aria-label="Étapes du devis">
            <UStepper
              v-model="stepperIndex"
              :items="stepperItems"
              color="primary"
              size="sm"
              class="w-full"
              :linear="true"
            />
          </nav>

          <div
            v-if="formattedEstimate"
            class="mb-5 rounded-lg bg-muted px-4 py-3 lg:hidden"
          >
            <p class="devis-estimate-label">Estimation en direct</p>
            <p class="devis-estimate-value text-xl">{{ formattedEstimate }}</p>
          </div>

          <div ref="stepContainerRef" class="relative overflow-hidden">
            <AnimatePresence mode="wait" :initial="false" :custom="stepDirection">
              <Motion
                :key="currentStep"
                as="div"
                :custom="stepDirection"
                :variants="stepVariants"
                initial="enter"
                animate="show"
                exit="exit"
                :transition="stepTransition"
              >
                <header class="mb-5">
                  <h3 class="text-lg font-bold text-highlighted sm:text-xl">
                    {{ stepLabels[currentStep - 1] }}
                  </h3>
                  <p class="mt-1 max-w-prose text-sm leading-relaxed text-muted">
                    {{ stepHints[currentStep] }}
                  </p>
                </header>

                <div v-if="currentStep === 1">
                  <LayoutGroup id="devis-type">
                    <URadioGroup
                      v-model="form.projectType"
                      :items="projectTypeItems"
                      value-key="value"
                      variant="card"
                      indicator="hidden"
                      size="lg"
                      color="primary"
                      legend="Type de projet"
                      :ui="{
                        ...radioGroupUi,
                        legend: 'sr-only',
                        description: 'sr-only',
                      }"
                    >
                      <template #label="{ item }">
                        <span class="devis-type-copy">
                          <span class="devis-type-glyph" aria-hidden="true">
                            <UIcon :name="item.glyph" class="size-5" />
                          </span>
                          <span class="devis-type-text">
                            <span class="devis-type-title">{{ item.label }}</span>
                            <span class="devis-type-hint">{{ item.hint }}</span>
                          </span>
                          <Motion
                            v-if="form.projectType === item.value"
                            as="span"
                            layout-id="devis-type-check"
                            class="devis-type-check"
                            :initial="prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }"
                            :animate="{ opacity: 1, scale: 1 }"
                            :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.16, ease: easeOut }"
                          >
                            <UIcon name="i-lucide-circle-check" class="size-4" aria-hidden="true" />
                            <span class="sr-only">Sélectionné</span>
                          </Motion>
                        </span>
                      </template>
                    </URadioGroup>
                  </LayoutGroup>

                  <AnimatePresence>
                    <Motion
                      v-if="currentSubtypes.length"
                      :key="`subtypes-${form.projectType}`"
                      as="div"
                      class="mt-4"
                      :initial="prefersReducedMotion ? false : { opacity: 0, y: -6 }"
                      :animate="{ opacity: 1, y: 0 }"
                      :exit="prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }"
                      :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.16, ease: easeOut }"
                    >
                      <p class="mb-2 text-sm font-medium text-highlighted">
                        Précisez le format
                        <span class="font-normal text-muted">(optionnel)</span>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <UButton
                          v-for="subtype in currentSubtypes"
                          :key="subtype"
                          size="sm"
                          :color="form.subtype === subtype ? 'primary' : 'neutral'"
                          :variant="form.subtype === subtype ? 'subtle' : 'outline'"
                          @click="form.subtype = form.subtype === subtype ? '' : subtype"
                        >
                          {{ subtype }}
                        </UButton>
                      </div>
                    </Motion>
                  </AnimatePresence>
                </div>

                <div v-else-if="currentStep === 2">
                    <UCheckboxGroup
                      v-model="form.features"
                      :items="featureItems"
                      value-key="value"
                      variant="card"
                      size="md"
                      color="primary"
                      legend="Fonctionnalités souhaitées"
                      :ui="{
                        ...checkboxGroupUi,
                        legend: 'sr-only',
                        description: 'text-xs text-muted',
                      }"
                    />
                </div>

                <div v-else-if="currentStep === 3" class="grid gap-5">
                  <div class="grid gap-5 lg:grid-cols-2">
                    <UFormField label="Budget estimé" name="budget">
                      <USelect v-model="form.budget" :items="budgetItems" class="w-full" />
                    </UFormField>
                    <UFormField label="Délai souhaité" name="timeline">
                      <USelect v-model="form.timeline" :items="timelineItems" class="w-full" />
                    </UFormField>
                  </div>
                  <div class="grid gap-5 lg:grid-cols-2">
                    <UFormField label="Nom" name="name" required>
                      <UInput
                        v-model="form.name"
                        autocomplete="name"
                        placeholder="Camille Moreau"
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

                <div v-else class="grid gap-6">
                  <div class="rounded-lg bg-muted/60 p-5 sm:p-6">
                    <div class="flex flex-wrap items-start gap-3 border-b border-default pb-4">
                      <span
                        v-if="selectedTypeMeta"
                        class="flex size-10 items-center justify-center rounded-md bg-primary/8 text-primary"
                        aria-hidden="true"
                      >
                        <UIcon :name="selectedTypeMeta.icon" class="size-5" />
                      </span>
                      <div class="min-w-0 flex-1">
                        <p class="text-xs font-medium text-muted">Projet</p>
                        <p class="font-bold text-highlighted">{{ form.projectType }}</p>
                        <p v-if="form.subtype" class="mt-0.5 text-sm text-muted">{{ form.subtype }}</p>
                      </div>
                    </div>

                    <dl class="mt-4 grid gap-3 text-sm lg:grid-cols-2">
                      <div>
                        <dt class="text-muted">Budget</dt>
                        <dd class="font-medium text-highlighted">{{ form.budget }}</dd>
                      </div>
                      <div>
                        <dt class="text-muted">Délai</dt>
                        <dd class="font-medium text-highlighted">{{ form.timeline }}</dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt class="text-muted">Contact</dt>
                        <dd class="font-medium text-highlighted">{{ form.name }} · {{ form.email }}</dd>
                      </div>
                      <div v-if="form.url" class="sm:col-span-2">
                        <dt class="text-muted">Site actuel</dt>
                        <dd class="truncate font-medium text-primary">{{ form.url }}</dd>
                      </div>
                    </dl>

                    <div v-if="form.features.length" class="mt-4 flex flex-wrap gap-2 border-t border-default pt-4">
                      <UBadge
                        v-for="f in form.features"
                        :key="f"
                        color="neutral"
                        variant="subtle"
                        size="sm"
                        :label="f"
                      />
                    </div>

                    <p v-if="form.description" class="mt-4 border-t border-default pt-4 text-sm text-muted">
                      {{ form.description }}
                    </p>
                  </div>

                  <div class="rounded-lg bg-muted px-5 py-5 lg:hidden">
                    <p class="devis-estimate-label">Estimation indicative</p>
                    <p v-if="formattedEstimate" class="devis-estimate-value text-2xl">{{ formattedEstimate }}</p>
                    <p class="mt-3 text-xs leading-relaxed text-muted">
                      Design, développement, tests et déploiement inclus.
                    </p>
                  </div>
                </div>
              </Motion>
            </AnimatePresence>
          </div>

          <div v-if="errorMessage" class="mt-5">
            <UAlert
              color="error"
              variant="subtle"
              icon="i-lucide-circle-alert"
              :title="errorMessage"
            />
          </div>

          <footer
            class="mt-8 flex flex-wrap items-center gap-3 border-t border-default pt-5"
            :class="currentStep > 1 ? 'justify-between' : 'justify-end'"
          >
            <UButton
              v-if="currentStep > 1"
              color="neutral"
              variant="ghost"
              leading-icon="i-lucide-arrow-left"
              @click="goPrev"
            >
              Précédent
            </UButton>

            <UButton
              v-if="currentStep < 4"
              trailing-icon="i-lucide-arrow-right"
              :disabled="!canGoNext"
              @click="goNext"
            >
              Suivant
            </UButton>
            <UButton
              v-else
              trailing-icon="i-lucide-send"
              :loading="isLoading"
              :disabled="!estimate"
              @click="submitDevis"
            >
              {{ isLoading ? 'Envoi en cours...' : 'Demander mon devis' }}
            </UButton>
          </footer>
        </div>

        <aside
          class="devis-aside mt-8 hidden lg:sticky lg:top-24 lg:mt-0 lg:block"
          aria-label="Estimation du projet"
        >
          <p class="mb-3 text-sm font-semibold text-primary">Votre estimation</p>

          <p class="sr-only" aria-live="polite">{{ estimateLiveText }}</p>

          <div v-if="formattedEstimate">
            <p class="text-sm text-muted">Fourchette indicative</p>
            <p class="devis-estimate-value mt-1 text-2xl xl:text-[1.65rem]">
              ~ {{ formattedMin }} € - {{ formattedMax }} €
            </p>
            <p class="mt-3 text-xs leading-relaxed text-muted">
              Design, développement, tests et déploiement.
            </p>
          </div>
          <UAlert
            v-else
            color="neutral"
            variant="subtle"
            icon="i-lucide-layout-template"
            title="Choisissez un type"
            description="La fourchette s'affiche ici dès la sélection."
          />

          <ul class="mt-6 space-y-3 border-t border-default pt-5" role="list">
            <li class="flex gap-2 text-xs text-muted">
              <UIcon name="i-lucide-shield-check" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              Sans engagement. Devis affiné après échange.
            </li>
            <li class="flex gap-2 text-xs text-muted">
              <UIcon name="i-lucide-clock" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              Réponse sous 48h ouvrées
            </li>
            <li class="flex gap-2 text-xs text-muted">
              <UIcon name="i-lucide-credit-card" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              Paiement en 3 fois possible
            </li>
          </ul>
        </aside>
      </div>
    </UContainer>
  </section>
</template>

<style lang="postcss">
.devis-wizard {
  @apply bg-primary-body pt-4 md:pt-6;
  padding-bottom: 1.5rem;
}

.devis-type-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--container-color);
  padding: 1rem 1.125rem 1.125rem;
  text-align: left;
  transition:
    transform 160ms var(--ease-out),
    background-color 160ms ease,
    border-color 160ms ease;

  .devis-type-wrapper {
    display: block;
    width: 100%;
    min-width: 0;
    text-align: left;
  }

  &:hover:not(:has([data-state='checked'])) {
    border-color: color-mix(in oklch, var(--first-color) 38%, var(--ui-border, currentColor));
    background-color: color-mix(in oklch, var(--first-color) 4%, var(--container-color));
  }

  &:active {
    transform: scale(0.985);
  }

  .devis-type-copy {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    column-gap: 0.75rem;
    align-items: start;
    width: 100%;
  }

  .devis-type-glyph {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: color-mix(in oklch, var(--first-color) 10%, var(--container-color));
    color: var(--first-color);
    transition: background-color 160ms ease, color 160ms ease;
  }

  .devis-type-text {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.15rem;
    padding-top: 0.1rem;
  }

  .devis-type-title {
    font-weight: 600;
    line-height: 1.3;
    color: var(--title-color);
  }

  .devis-type-hint {
    font-size: 0.8125rem;
    line-height: 1.35;
    color: var(--text-color-light);
  }

  .devis-type-check {
    display: inline-flex;
    color: var(--first-color);
    margin-top: 0.15rem;
  }

  &:has([data-state='checked']) {
    background-color: color-mix(in oklch, var(--first-color) 8%, var(--container-color));
    border-color: var(--first-color);

    .devis-type-glyph {
      background-color: var(--first-color);
      color: #fff;
    }
  }
}

.dark .devis-type-item {
  &:hover:not(:has([data-state='checked'])) {
    background-color: color-mix(in oklch, var(--first-color) 8%, var(--container-color));
  }

  &:has([data-state='checked']) {
    background-color: color-mix(in oklch, var(--first-color) 16%, var(--container-color));

    .devis-type-glyph {
      background-color: var(--first-color);
      color: hsl(var(--hue-color), 28%, 12%);
    }
  }
}

.devis-feature-item:has([data-state='checked']) {
  background-color: var(--first-color-lighter);
  border-color: var(--first-color);
}

.dark .devis-feature-item:has([data-state='checked']) {
  background-color: color-mix(in oklch, var(--first-color) 22%, var(--container-color));
}

.devis-estimate-label {
  @apply text-xs font-medium text-muted;
}

.devis-estimate-value {
  @apply font-black leading-tight text-highlighted;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-family-barlow);
}

@media (prefers-reduced-motion: reduce) {
  .devis-type-item {
    transition: background-color 160ms ease, border-color 160ms ease;

    &:active {
      transform: none;
    }
  }
}
</style>
