<template>
  <div>
    <h1>Nested Route</h1>
    <div class="username">{{ $route.params.username }}</div>
  </div>
</template>

<script>
import { bustCache } from '@/bust-cache.js'
export default {
  name: 'NestedRoute',

  beforeRouteLeave(to, from, next) {
    bustCache()
    next()
  },
}
</script>
