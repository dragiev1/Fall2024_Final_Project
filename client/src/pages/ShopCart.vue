<script setup lang="ts">
import MenuItem from '@/components/MenuItem.vue'
import { getAllProducts, type Product } from '@/models/products'
import { computed, onMounted, ref, watch } from 'vue'

// Defining things needed.
const products = ref<Product[]>([])
const visibleProducts = ref<Product[]>([])
const visibleCakeProducts = ref<Product[]>([])
const visibleChocoProducts = ref<Product[]>([])
const currentIndex = ref<number>(8)

// Grabs all products.
onMounted(async () => {
  const fetchedProducts = await getAllProducts() // Get all products using the function from products.ts
  products.value = fetchedProducts.data // Assign the fetched data to the products list
  visibleProducts.value = products.value // Display the first set of products
})

// Sorts all products into categories.
const cakeProducts = computed(() =>
  visibleProducts.value.filter((product) => product.category === 'cake' && 'ginger')
)
const meringueProducts = computed(() =>
  visibleProducts.value.filter((product) => product.category === 'cookies')
)
const chocolateProducts = computed(() =>
  visibleProducts.value.filter((product) => product.category === 'chocolate')
)
const baklavaProducts = computed(() =>
  visibleProducts.value.filter((product) => product.category === 'baklava')
)
const macaronsProducts = computed(() =>
  visibleProducts.value.filter((product) => product.category === 'macarons')
)

watch(visibleProducts, () => {
  visibleCakeProducts.value = cakeProducts.value.slice(0, 8)
  visibleChocoProducts.value = chocolateProducts.value.slice(0, 8)
})

const loadMoreCake = () => {
  currentIndex.value += 12
  visibleCakeProducts.value = cakeProducts.value.slice(0, currentIndex.value)
}
const loadMoreChoco = () => {
  currentIndex.value += 12
  visibleChocoProducts.value = chocolateProducts.value.slice(0, currentIndex.value)
}
</script>

<template>
  <body>
    <div class="column is-8 is-offset-2">
      <aside class="menu">
        <p class="title has-text-centered">DESSERTS</p>
        <div class="subtitle has-text-centered is-6 py-2">
          <i class="fas fa-circle px-1"></i>
          <i class="fas fa-circle px-1"></i>
          <i class="fas fa-circle px-1"></i>
        </div>
        <p class="menu-label">Cakes<i class="fas fa-birthday-cake px-2"></i></p>
        <div class="shelf">
          <MenuItem
            v-for="product in visibleCakeProducts"
            :key="product.id"
            :product="product"
          ></MenuItem>
        </div>
        <div class="button-container mt-5">
          <button
            v-if="currentIndex < cakeProducts.length"
            @click="loadMoreCake"
            class="button is-large"
          >
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
        <p class="menu-label">Chocolates <i class="fas fa-cookie-bite px-1"></i></p>
        <div class="shelf">
          <MenuItem
            v-for="product in visibleChocoProducts"
            :key="product.id"
            :product="product"
          ></MenuItem>
        </div>
        <div class="button-container mt-5">
          <button
            v-if="currentIndex < chocolateProducts.length"
            @click="loadMoreChoco"
            class="button is-large"
          >
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
        <p class="menu-label">Meringue Cookies</p>
        <div class="shelf">
          <MenuItem
            v-for="product in meringueProducts"
            :key="product.id"
            :product="product"
          ></MenuItem>
        </div>
        <p class="menu-label">Baklava</p>
        <div class="shelf">
          <MenuItem
            v-for="product in baklavaProducts"
            :key="product.id"
            :product="product"
          ></MenuItem>
        </div>
        <p class="menu-label">Macarons <i class="fas fa-stroopwafel"></i></p>
        <div class="shelf">
          <MenuItem
            v-for="product in macaronsProducts"
            :key="product.id"
            :product="product"
          ></MenuItem>
        </div>
      </aside>
    </div>
  </body>
</template>

<style scoped>
body {
  height: 100%;
}
.button {
  align-items: center;
  justify-content: center;
  font-family: italic;
  font-style: italic;
  background-color: var(--highlights-background);
  width: 17px;
}
.button-container {
  display: flex;
  justify-content: center;
}
.shelf {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 700px) {
    .shelf > * {
      flex: 1 1 calc(100% - 1rem); /* One item per row on phones */
      max-width: calc(100% - 1rem);
    }
  }
}
.column {
  margin-top: 3.5rem;
}
.title {
  font-style: italic;
  font-family: italic;
  font-size: 30px;
  padding-top: 1rem;
}
.menu-label {
  font-size: 20px;
}
</style>
