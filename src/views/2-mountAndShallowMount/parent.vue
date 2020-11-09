<template>
  <div class="parent">
    <div>I'm Parent</div>
    <Child />
  </div>
</template>

<script>
import Child from './child'

export default {
  name: 'Parent',
  components: {
    Child,
  },
}
</script>
