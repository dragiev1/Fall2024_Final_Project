<script setup lang="ts">
import type { Product } from '@/models/products'
import { ref } from 'vue'

defineProps<{
  product: Product
}>()

const isModalActive = ref(false)

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}
</script>

<template>
  <div class="cell is-clickable" @click="toggleModal">
    <img :src="product.images" alt="product.name" />
    <div class="overlay-text">{{ product.title }}</div>
    <div class="overlay-text price">${{ product.price }}</div>
  </div>
  <!-- Modal to display image in higher resolution -->
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-content">
      <p class="image">
        <img :src="product.images" alt="product.name" />
      </p>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
  </div>
</template>

<style scoped>
.cell {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 15px;
  margin-top: 5rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;
  @media (max-width: 768px) {
    transform: scale(1.3);
  }
}
.cell:hover {
  transform: scale(1.1);
}
.price {
  bottom: 30% !important;
}
img {
  background-color: var(--accent-background);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay-text {
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 2rem;
  font-style: normal;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  letter-spacing: 3px;
  text-align: center;
  width: 80%;
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 30px;
  }
}
</style>
