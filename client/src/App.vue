<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Parallax from './components/ParallaxComponent.vue'
</script>

<template>
  <div data-theme="light">
    <header>
      <NavBar />
    </header>

    <RouterView />
  </div>

  <body>
    <Parallax />
    <div class="container">
      Hello Pooper
    </div>
  </body>
</template>

<style scoped>

  .container {
    background-color: var(--primary-background);
    min-height: 100vh;
  }
</style>
