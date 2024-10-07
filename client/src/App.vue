<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Parallax from './components/Parallax.vue';
</script>

<template>
  <html data-theme="light">
  <header>
    <NavBar />
    <Parallax />
  </header>
  <RouterView />
  </html>
</template>

<style scoped>

</style>