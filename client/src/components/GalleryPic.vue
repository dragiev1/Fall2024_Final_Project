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
    <img class="i" :src="product.images" alt="product.name" />
  </div>
  <!-- Modal to display image in higher resolution -->
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-content">
      <p class="image is-4by3">
        <img :src="product.images" alt="product.name" />
      </p>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
  </div>
</template>

<style scoped>
h3 {
  font-style: italic;
  font-family: italic;
  font-weight: bold;
  font-size: medium;
  color: var(--highlights-background-hover);
}
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
  box-shadow: 0 4px 8px black 0.2;
  @media (max-width: 768px) {
    transform: scale(1.3);
  }
}
.cell:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px 1 black;
}
img {
  background-color: var(--accent-background);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
