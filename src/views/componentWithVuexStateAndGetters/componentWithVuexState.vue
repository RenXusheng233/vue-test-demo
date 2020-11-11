<template>
  <div>
    <div class="username">
      {{ username }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentWithVuexState',

  data() {
    return {
      username: this.$store.state.username,
    }
  },
}
</script>
