<template>
  <main>
    <div class="relative pt-24 pb-14 mx-auto bg-white overflow-hidden">
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          class="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        ></div>
      </div>
      <div class="w-full h-72">
        <div class="mx-auto w-full max-w-3xl h-full rounded-md overflow-hidden">
          <img
            :src="article.img"
            class="h-full w-full object-cover"
            :alt="article.title"
          />
        </div>
      </div>
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="
                mt-2
                block
                text-3xl text-center
                leading-8
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-4xl
              "
              >{{ article.title }}</span
            >
          </h1>
          <!--   <p class="mt-8 text-xl text-gray-500 leading-8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p> -->
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <nuxt-content :document="article"></nuxt-content>
        </div>
      </div>
      <div
        class="
          py-10
          px-8
          mt-12
          mx-auto
          max-w-2xl
          rounded-xl
          leading-6
          text-left text-gray-900
          bg-purple-100
          box-border
        "
      >
        <div class="flex justify-center items-center text-left box-border">
          <img
            src="/img/bertyn.png"
            alt=""
            class="
              mr-8
              w-24
              h-24
              text-gray-900
              align-middle
              bg-white
              border-none
              box-border
              rounded-full
              objetc-cover
            "
          />
          <div class="flex-1 text-gray-900 box-border">
            <a
              href="#"
              class="
                inline-block
                text-gray-700
                no-underline
                bg-transparent
                cursor-pointer
                box-border
                hover:text-indigo-600
                hover:no-underline
                focus:no-underline
              "
              style="transition: all 0.5s ease 0s; outline: none medium"
            >
              <h4
                class="mt-0 mb-2 text-base text-gray-500 font-medium box-border"
                style="line-height: 1.2"
              >
                Bertyn Boulikou
              </h4>
            </a>
            <p
              class="
                my-0
                font-sans
                text-sm
                font-light
                leading-7
                text-gray-700
                box-border
              "
            >
              Developper web fan de manga et de music à mes heures perdu
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return {
      article,
    }
  },
}
</script>

<style>
</style>