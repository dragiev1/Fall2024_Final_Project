<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const parallaxStyle = ref({})

const handleScroll = () => {
  const scrollPosition = window.scrollY
  parallaxStyle.value = {
    backgroundPosition: `center ${scrollPosition * -0.8}px`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bgimg-1" :style="parallaxStyle">
    <div class="caption">
      <span class="border">Made with Love </span>
      <span class="text">By</span>
      <span class="text">Nadia</span>
      <div class="container my-2">Exquisite Chocolates and Desserts</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--highlights-background);
  position: absolute;
  color: var(--primary-background);
  text-align: left;
  top: 100%;
  max-width: 60% !important;
  padding: 5px 10px 5px 10px;
  font-family: italic;
  font-style: italic;
  font-size: 20px;
}

.bgimg-1 {
  display: flex;
  background-image: url('@/assets/parallaxImage.jpg') !important;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 50px;
  min-height: 650px;
  filter: contrast(1.2) brightness(0.9);
}
.caption {
  max-width: 40%;
  position: absolute;
  font-family: italic;
  font-style: italic;
  background-color: black;
  opacity: 0.65;
  top: 45%;
  width: 100%;
  text-align: center;
  margin-left: 2rem;
}
.caption span.border {
  color: var(--highlights-background);
  padding: 18px;
  font-size: 40px;
  letter-spacing: 10px;
}
.caption span.text {
  color: white !important;
  opacity: 100%;
  padding: 18px;
  font-size: 30px;
  letter-spacing: 15px;
}
</style>
