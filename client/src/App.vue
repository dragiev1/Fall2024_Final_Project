<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { ref, watchEffect } from 'vue'

const route = useRoute()
const isHiddenPage = ref(false)

watchEffect(() => {
  isHiddenPage.value = route.path === '/LogIn' || route.path === '/SignUp'
})
</script>

<template>
  <div data-theme="light">
    <header>
      <NavBar v-if="!isHiddenPage" />
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
