<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    style="background-color: #e6a4b4"
  >
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item px-4 mx-1 py-4">
        <img alt="Nadia logo" class="logo" src="@/assets/logo.png"/>
      </RouterLink>

      <RouterLink 
        to=""
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </RouterLink>
    </div>

    <!-- NavBar -->
    <div id="navbarBasicExample" class="navbar-menu">
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
  background-color: #e6a4b4;
}

.navbar-dropdown .navbar-item {
  background-color: #e6a4b4 !important;
  color: #F5EEE6 !important
}

.navbar a.navbar-item:hover {
  background-color: #c48b99 !important
}

.button:hover {
  background-color: #c48b99 !important;
  color: #f5eee6;
}

.navbar-link {
  color: #F5EEE6
}

.navbar-link:hover {
  background-color: #c48b99
}

.navbar-item img {
  max-height: 30px;
}

.logo {
  object-fit: contain;
}
</style>
