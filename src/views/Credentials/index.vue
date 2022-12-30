<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credentials
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Installation guide and generation of your credentials
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">

      <h1 class="text-3xl font-black text-brand-darkgray">
        Installation and configuration
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        This is your api key
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2"
      >
        <span id="apikey">{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            id="generate-apikey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Place the script below on your website to start getting feedback
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <pre>
          &lt;script src="https://leorangel-feedbacker-widget.netlify.app/apiKey={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;
        </pre>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import palette from '../../../palette'
import useStore from '@/hooks/useStore'
import ContentLoader from '@/components/ContentLoader'
import HeaderLogged from '@/components/HeaderLogged'
import Icon from '@/components/Icon'

export default {
  components: {
    ContentLoader,
    HeaderLogged,
    Icon
  },
  setup () {
    const state = reactive({
      isLoading: false
    })
    const store = useStore()

    return {
      state,
      store,
      brandColors: palette.brand
    }
  }
}
</script>
