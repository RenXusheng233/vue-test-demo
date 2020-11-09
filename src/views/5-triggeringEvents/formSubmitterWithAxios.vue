<template>
  <div>
    <form @submit.prevent="handleSubmitAsync">
      <input v-model="username" data-username />
      <input type="submit" />
    </form>
    <div class="message" v-if="submitted">
      Thank you for your submission, {{ username }}.
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSubmitterByAxios',
  data() {
    return {
      username: '',
      submitted: false,
    }
  },
  methods: {
    handleSubmitAsync() {
      // 模拟封装 axios
      return this.$http
        .get('/api/v1/register', { username: this.username })
        .then(() => {
          this.submitted = true
        })
        .catch((err) => {
          throw Error('something went wrong', err)
        })
    },
  },
}
</script>

<style></style>
