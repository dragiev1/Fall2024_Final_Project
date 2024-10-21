<script setup lang="ts">
import type { Product } from '@/models/products'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="cell">
    <img :src="product.thumbnail" alt="product.name" />
    <h3 class="title">{{ product.title }}</h3>
    <p>{{ product.price }}</p>
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
</style>
