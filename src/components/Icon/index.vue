<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default {
  components: { Loading, Copy },
  props: {
    name: { type: String, required: true }
  }
}
</script>
