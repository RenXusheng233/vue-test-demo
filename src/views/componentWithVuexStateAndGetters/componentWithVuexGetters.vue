<template>
  <div class="fullname">
    {{ fullname }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ComponentWithVuexGetters',

  computed: {
    // FEAT: 两种方式获取, 测试均可以通过
    // fullname() {
    //   return this.$store.getters.fullname
    // },
    ...mapGetters(['fullname']),
  },
}
</script>
