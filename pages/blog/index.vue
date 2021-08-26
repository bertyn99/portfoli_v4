<template>
  <main class="main">
    <div class="bg-gray-100 pt-24 pb-8 px-6 md:px-12 lg:px-20 mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 pt-2 flex flex-col">
          <card-article
            v-for="article of articles"
            :key="article.slug"
            :title="article.title"
            :description="article.description"
            :imgUrl="article.img"
            :slug="article.slug"
          ></card-article>
        </div>
        <div class="bg-indigo-600 flex flex-col"></div>
      </div>
    </div>
    <div class="mx-auto" v-if="articles.length > 5">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <nav
        class="
          border-t border-gray-200
          px-4
          flex
          items-center
          justify-between
          sm:px-0
        "
      >
        <div class="-mt-px w-0 flex-1 flex">
          <a
            href="#"
            class="
              border-t-2 border-transparent
              pt-4
              pr-1
              inline-flex
              items-center
              text-sm
              font-medium
              text-gray-500
              hover:text-gray-700
              hover:border-gray-300
            "
          >
            <!-- Heroicon name: solid/arrow-narrow-left -->
            <svg
              class="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Previous
          </a>
        </div>
        <div class="hidden md:-mt-px md:flex">
          <a
            href="#"
            class="
              border-transparent
              text-gray-500
              hover:text-gray-700
              hover:border-gray-300
              border-t-2
              pt-4
              px-4
              inline-flex
              items-center
              text-sm
              font-medium
            "
          >
            1
          </a>
          <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
          <a
            href="#"
            class="
              border-indigo-500
              text-indigo-600
              border-t-2
              pt-4
              px-4
              inline-flex
              items-center
              text-sm
              font-medium
            "
            aria-current="page"
          >
            2
          </a>
          <a
            href="#"
            class="
              border-transparent
              text-gray-500
              hover:text-gray-700
              hover:border-gray-300
              border-t-2
              pt-4
              px-4
              inline-flex
              items-center
              text-sm
              font-medium
            "
          >
            3
          </a>
        </div>
        <div class="-mt-px w-0 flex-1 flex justify-end">
          <a
            href="#"
            class="
              border-t-2 border-transparent
              pt-4
              pl-1
              inline-flex
              items-center
              text-sm
              font-medium
              text-gray-500
              hover:text-gray-700
              hover:border-gray-300
            "
          >
            Next
            <!-- Heroicon name: solid/arrow-narrow-right -->
            <svg
              class="ml-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  </main>
</template>

<script>
import CardArticle from '~/components/blog/CardArticle.vue'
export default {
  components: { CardArticle },
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    console.log(articles)
    return {
      articles,
    }
  },
}
</script>

<style>
</style>