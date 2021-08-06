<template>
  <section id="graduate" class="graduate section">
    <h2 class="section-title">Diplomes et Certifications</h2>
    <span class="section-subtitle"> Mon parcours personel </span>

    <div class="graduate-container container mx-auto px-6">
      <div class="graduate-tabs">
        <div class="graduate-button flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          Education
        </div>
        <div class="graduate-button flex">
          <svg
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Emploi
        </div>

        <div class="graduate-section">
          <div class="graduate-content">
            <div v-for="(edu, i) in educations" :key="i" class="graduate-data">
              <div>
                <h3 class="graduate-title">{{ edu.grades }}</h3>
                <span class="graduate-subtitle"
                  >{{ edu.city }} - {{ edu.school }}</span
                >
                <div class="graduate-calendar">
                  <svg
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ edu.time }}
                </div>
              </div>

              <div>
                <span class="graduate-rounder"></span>
                <span class="graduate-line"></span>
              </div>
            </div>
          </div>
          <div class="graduate-content">
            <div v-for="(work, i) in works" :key="i" class="graduate-data">
              <div>
                <h3 class="graduate-title">{{ work.post }}</h3>
                <span class="graduate-subtitle"
                  >{{ work.city }} - {{ work.entreprise }}</span
                >
                <div class="graduate-calendar">
                  <svg
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ work.time }}
                </div>
              </div>

              <div>
                <span class="graduate-rounder"></span>
                <span class="graduate-line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      educations: [
        {
          school: 'Lycée Privée Sacrée Coeur',
          grades: 'Bac S',
          city: 'Nantes',
          time: '2012-2017',
        },
        {
          school: 'Université des Sciences',
          grades: 'Licence 1 MIP',
          city: 'Nantes',
          time: '2017-2019',
        },
        {
          school: 'The Hacking Project',
          grades: 'Certification développeur fullstack',
          city: 'Nantes',
          time: '2018',
        },
      ],
      works: [
        {
          entreprise: 'Hawabowls',
          post: 'Web developpeur stagiaire',
          city: 'Nantes',
          time: '2021',
        },
      ],
    }
  },
}
</script>

<style lang="postcss">
.qualification {
  &-tabs {
    @apply flex justify-evenly mb-8;
  }

  &-button {
    @apply text-2xl font-medium cursor-pointer;
    &:hover {
      @apply text-primary;
    }
  }
  &-icon {
    @apply text-3xl mb-1;
  }
  &-data {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    column-gap: 1.5rem;
  }
}
</style>