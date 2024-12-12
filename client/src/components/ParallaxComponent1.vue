<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuth } from '@/models/useAuth'

const { isLoggedIn } = useAuth()
const parallaxStyle = ref({})
const userName = ref<string | null>(null)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  parallaxStyle.value = {
    backgroundPosition: `center ${scrollPosition * -0.5}px`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userName.value = loggedInUser.name || null
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bgimg-1" :style="parallaxStyle">
    <div v-if="isLoggedIn" class="caption">
      <span class="border">Welcome Back,<br />{{ userName }} !</span>
    </div>
    <div v-else class="caption">
      <span class="border">Made with Love </span>
      <p class="subtitle has-text-right mx-6">By Nadia</p>
      <div class="container my-2">Exquisite Chocolates & Desserts</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--highlights-background);
  position: absolute;
  color: rgba(0, 0, 0, 0.932);
  text-align: left;
  top: 100%;
  max-width: 19rem !important;
  padding: 5px 10px 5px 10px;
  font-family: italic;
  font-style: italic;
  font-size: 20px;
}
.subtitle {
  color: white;
  opacity: 85%;
  font-size: 20px;
}
.bgimg-1 {
  background-image: url('@/assets/parallaxImage.jpg') !important;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 50px;
  min-height: 700px;
  filter: contrast(1.25) brightness(1);
}
.caption {
  max-width: 40%;
  position: absolute;
  font-family: italic;
  font-style: italic;
  background-color: black;
  opacity: 0.75;
  top: 45%;
  width: 100%;
  text-align: center;
  margin-left: 2rem;
  padding: 2px 10px 2px 0px;
}
.caption span.border {
  color: var(--secondary-background);
  font-size: 40px;
  letter-spacing: 10px;
}
.caption span.text {
  color: var(--secondary-background) !important;
  padding: 18px;
  font-size: 30px;
  letter-spacing: 15px;
}
</style>
