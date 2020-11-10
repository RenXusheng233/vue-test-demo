<template>
  <ChildWithAsyncCall />
</template>

<script>
import ChildWithAsyncCall from './childWithAsyncCall.vue'

export default {
  name: 'ParentWithAPICallChild',

  components: {
    ChildWithAsyncCall,
  },
}
</script>
