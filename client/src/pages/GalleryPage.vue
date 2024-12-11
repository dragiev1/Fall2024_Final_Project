<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAll, type Product } from '@/models/products'
import GalleryModal from '@/components/GalleryModal.vue'

const products = ref<Product[]>([])
const visibleProducts = ref<Product[]>([])
const currentIndex = ref<number>(12)

onMounted(async () => {
  const fetchedProducts = await getAll() // Get all products using the function from products.ts
  products.value = fetchedProducts.data // Assign the fetched data to the products list
  visibleProducts.value = products.value.slice(0, currentIndex.value) // Display the first set of products
})
visibleProducts.value = products.value.slice(0, 12)

const loadMore = () => {
  currentIndex.value += 12
  visibleProducts.value = products.value.slice(0, currentIndex.value)
}
</script>

<template>
  <body>
    <div class="title has-text-centered">
      <i class="fas fa-birthday-cake px-2"></i>Gallery<i class="fas fa-birthday-cake px-2"></i>
    </div>
    <div class="subtitle has-text-centered is-6 py-2">
      <i class="fas fa-circle px-1"></i>
      <i class="fas fa-circle px-1"></i>
      <i class="fas fa-circle px-1"></i>
    </div>
    <div class="shelf">
      <GalleryModal v-for="product in visibleProducts" :key="product.id" :product="product" />
    </div>
    <div class="button-container mt-5">
      <button v-if="currentIndex < products.length" @click="loadMore" class="button is-large my-5">
        Show More
      </button>
    </div>
  </body>
</template>

<style scoped>
.fa-circle {
  background-color: var(--primary-background) !important;
}
body {
  margin-top: 3.5rem;
  height: 100%;
}
.title {
  padding-top: 3.5rem;
  font-family: italic;
  font-style: italic;
  font-size: 40px;
}
.subtitle {
  margin-bottom: 5rem;
}
.shelf {
  margin-top: -3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.button {
  align-items: center;
  justify-content: center;
  font-family: italic;
  font-style: italic;
  background-color: var(--highlights-background);
}
.button-container {
  display: flex;
  justify-content: center;
}
</style>
