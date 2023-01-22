<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Copy from './Copy.vue'
import Loading from './Loading.vue'
import ChevronDown from './ChevronDown.vue'

export default {
  components: { Loading, Copy, ChevronDown },
  props: {
    name: { type: String, required: true }
  }
}
</script>
