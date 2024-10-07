<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="navigation"
    style="background-color: var(--highlights-background)"
  >
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item px-4 mx-1 py-4">
        <img alt="Nadia logo" class="logo" src="@/assets/logo.png" />
      </RouterLink>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- NavBar -->
    <div class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item has-text-light">
          <i class="fas fa-home"></i>
          Home
        </RouterLink>
        <RouterLink to="" class="navbar-item has-text-light px-4"> Shop </RouterLink>
        <RouterLink to="" class="navbar-item has-text-light px-4"> Gallery </RouterLink>

        <!-- Dropdown Menu -->
        <div class="navbar-item has-dropdown is-hoverable">
          <RouterLink to="" class="navbar-link is-arrowless px-4"> More </RouterLink>

          <div class="navbar-dropdown">
            <RouterLink to="/about" class="navbar-item"> About Me </RouterLink>
            <RouterLink to="" class="navbar-item"> Reviews </RouterLink>
            <RouterLink to="" class="navbar-item"> Directions </RouterLink>
            <RouterLink to="" class="navbar-item"> Contact </RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="" class="navbar-item"> Report an issue </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink to="" class="button is-light">
              <strong>Sign up</strong>
            </RouterLink>
            <RouterLink to="" class="button is-light mx-1">
              <p>Login</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-dropdown {
  background-color: var(--highlights-background);
  margin: 0;
}

.navbar-dropdown .navbar-item {
  background-color: var(--highlights-background) !important;
  color: var(--primary-background) !important;
  margin: 0;
}

.navbar a.navbar-item:hover {
  background-color: var(--highlights-background-hover) !important;
}

.button:hover {
  background-color: var(--highlights-background-hover) !important;
  color: var(--primary-background);
}

.navbar-link {
  color: var(--primary-background);
}

.navbar-link:hover {
  background-color: var(--highlights-background-hover);
}

.navbar-link:focus {
  background-color: var(--highlights-background-hover)
}

.navbar-item:focus {
  background-color: var(--highlights-background-hover)
}

.navbar-item img {
  max-height: 30px;
}

.logo {
  object-fit: contain;
}
</style>
