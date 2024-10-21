<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isOpen = ref(false)
const hoveredMenu = ref<string | null>(null)
</script>

<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="navigation"
    style="background-color: var(--highlights-background)"
  >
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item px-4 mx-1 py-4">
        <img alt="Nadia logo" class="logo" src="@/assets/logo.png" />
      </RouterLink>

      <button
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
      </button>
    </div>

    <!-- NavBar -->
    <div class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item has-text-light px-5">
          <i class="fas fa-home"></i>
          Home
        </RouterLink>

        <RouterLink to="/Gallery" class="navbar-item has-text-light px-6"> Gallery </RouterLink>
        <div
          class="navbar-item has-dropdown is-hoverable"
          @mouseenter="hoveredMenu = 'shop'"
          @mouseleave="hoveredMenu = null"
        >
          <RouterLink to="/ShopCart" class="navbar-link is-arrowless px-6">
            <p>Shop</p>
            <i
              class="is-mobile"
              :class="hoveredMenu === 'shop' ? 'fas fa-sort-down' : 'fas fa-caret-right'"
            ></i
          ></RouterLink>

          <div class="navbar-dropdown">
            <RouterLink to="/ShopCart" class="navbar-item"> Cakes </RouterLink>
            <RouterLink to="/ShopCart" class="navbar-item"> Chocolates </RouterLink>
            <RouterLink to="/ShopCart" class="navbar-item"> Meringue Cookies </RouterLink>
            <RouterLink to="/ShopCart" class="navbar-item"> Baklava </RouterLink>
            <RouterLink to="/ShopCart" class="navbar-item"> Macarons </RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/Gallery" class="navbar-item"> Gallery </RouterLink>
          </div>
        </div>

        <!-- Dropdown Menu -->
        <div
          class="navbar-item has-dropdown is-hoverable"
          @mouseenter="hoveredMenu = 'more'"
          @mouseleave="hoveredMenu = null"
        >
          <RouterLink to="" class="navbar-link is-arrowless px-6">
            More
            <i
              class="is-mobile"
              :class="hoveredMenu === 'more' ? 'fas fa-sort-down' : 'fas fa-caret-right'"
              style="margin-right: 5px"
            ></i
          ></RouterLink>

          <div class="navbar-dropdown">
            <RouterLink to="/AboutMe" class="navbar-item"> About Me </RouterLink>
            <a
              href="https://www.google.com/maps/place/1064+Main+St,+Catskill,+NY+12414/@42.2543338,-73.9014696,17z/data=!3m1!4b1!4m6!3m5!1s0x89ddbc2fdc0144d9:0xb5da01bb992aa3cc!8m2!3d42.2543338!4d-73.8988947!16s%2Fg%2F11gsbq8khm?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              class="navbar-item"
            >
              Directions
            </a>
            <RouterLink to="/ContactMe" class="navbar-item"> Contact </RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/ReportAnIssue" class="navbar-item"> Report an issue </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink to="/LogIn" class="button is-light">
              <strong><i class="fas fa-sign-in-alt" style="margin-right: 5px"></i>Login</strong>
            </RouterLink>
            <RouterLink to="/SignUp" class="button is-light">
              <strong><i class="fas fa-user" style="margin-right: 5px"></i>Sign up</strong>
            </RouterLink>
          </div>
        </div>

        <div class="navbar-item">
          <div class="field is-grouped" style="margin: -6px; margin-left: -20px">
            <div class="navbar-item px-3">
              <a
                href="https://www.google.com/maps/place/1064+Main+St,+Catskill,+NY+12414/@42.2543338,-73.9014696,17z/data=!3m1!4b1!4m6!3m5!1s0x89ddbc2fdc0144d9:0xb5da01bb992aa3cc!8m2!3d42.2543338!4d-73.8988947!16s%2Fg%2F11gsbq8khm?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
              >
                <i
                  class="fas fa-location-arrow"
                  style="color: var(--primary-background) !important"
                ></i>
              </a>
            </div>
            <div class="navbar-item px-3">
              <RouterLink to="/ShopCart">
                <i
                  class="fas fa-shopping-cart"
                  style="color: var(--primary-background) !important"
                ></i>
              </RouterLink>
            </div>
            <div class="navbar-item px-3">
              <RouterLink to="/">
                <i class="fas fa-phone-alt" style="color: var(--primary-background) !important"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-menu.is-active {
  background-color: var(--highlights-background-hover);
}

.navbar-burger {
  color: var(--primary-background);
}

.navbar-burger:hover {
  background-color: var(--primary-background-hover);
}

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
  background-color: var(--highlights-background-hover);
}

.navbar-item:focus {
  background-color: var(--highlights-background-hover);
}

.navbar-item {
  padding-left: 20px;
  padding-right: 20px;
  color: var(--primary-background);
}
.navbar-end .navbar-item {
  color: var(--primary-background);
}

.navbar-item img {
  max-height: 30px;
}

.logo {
  object-fit: contain;
}
</style>
