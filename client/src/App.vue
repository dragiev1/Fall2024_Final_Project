<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div data-theme="light">
    <header>
      <NavBar />
    </header>

    <RouterView />
  </div>
</template>

<style scoped>

</style>
