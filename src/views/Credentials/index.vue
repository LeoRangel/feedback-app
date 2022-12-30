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
        <span v-if="state.hasError">Error loading api key</span>
        <span v-else id="apikey">{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!state.hasError" class="flex ml-20 mr-5">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApiKey"
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
        <span v-if="state.hasError">Error loading script</span>
        <pre v-else>
          &lt;script src="https://leorangel-feedbacker-widget.netlify.app/apiKey={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;
        </pre>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import palette from '../../../palette'
import useStore from '@/hooks/useStore'
import ContentLoader from '@/components/ContentLoader'
import HeaderLogged from '@/components/HeaderLogged'
import Icon from '@/components/Icon'
import services from '@/services'
import { setApiKey } from '@/store/user'

export default {
  components: {
    ContentLoader,
    HeaderLogged,
    Icon
  },
  setup () {
    const state = reactive({
      hasError: false,
      isLoading: false
    })
    const store = useStore()

    // verifica se tem api key quando houver request na página
    // define o erro quando não está carregando e não foi gerada a api key
    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApikey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey
    }
  }
}
</script>
