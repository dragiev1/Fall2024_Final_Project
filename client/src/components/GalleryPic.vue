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
    <img :src="product.images" loading="lazy" alt="product.name" />
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
  margin-top: 1rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  @media (max-width: 768px) {
    transform: scale(1.3);
    margin-top: 5rem;
  }
}
.cell:hover {
  opacity: 0.8;
}
img {
  background-color: var(--accent-background);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
