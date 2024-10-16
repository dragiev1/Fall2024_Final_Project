<script setup lang="ts">
import Parallax from '@/components/ParallaxComponent.vue'
</script>

<template>
  <body>
    <Parallax />
    <div class="container">Hello Pooper</div>
  </body>
</template>
<style scoped>
.container {
  background-color: var(--primary-background);
  min-height: 100vh;
}
</style>
