<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Parallax from '@/components/ParallaxComponent1.vue'
import Parallax2 from '@/components/ParallaxComponent2.vue'
</script>

<template>
  <body>
    <Parallax />
    <section class="hero is-medium is-link" style="background-color: var(--primary-background)">
      <div class="hero-head py-1">
        <div class="container has-text-centered my-1" style="color: #75535c; font-size: 20px">
          BITE INTO BLISS
        </div>
        <div class="container has-text-centered">
          <i class="fas fa-circle px-1"></i>
          <i class="fas fa-circle px-1"></i>
          <i class="fas fa-circle px-1"></i>
        </div>
      </div>
      <div class="hero-body has-text-centered">
        <div class="column is-three-fifths is-offset-one-fifth">
          <div class="fixed-grid has-3-cols">
            <div class="grid">
              <div class="cell is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\cake1.jpg" alt="Cake" />
                  <div class="overlay-text">CAKES</div></RouterLink
                >
              </div>
              <div class="cell is-row-from-end-1 is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\chocolates.jpg" alt="Chocolates" />
                  <div class="overlay-text">CHOCOLATES</div></RouterLink
                >
              </div>
              <div class="cell is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\meringueCookies.jpg" alt="Meringue Cookies" />
                  <div class="overlay-text large-title">MERINGUE COOKIES</div></RouterLink
                >
              </div>
              <div class="cell is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\macarons.jpg" alt="Macarons" />
                  <div class="overlay-text">MACARONS</div></RouterLink
                >
              </div>
              <div class="cell is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\napCake.jpg" alt="Napoleon Cake" />
                  <div class="overlay-text large-title">NAPOLEON CAKE</div></RouterLink
                >
              </div>
              <div class="cell is-clickable">
                <RouterLink to="/ShopCart">
                  <img src="\src\assets\baklava.jpg" alt="Baklava" />
                  <div class="overlay-text">BAKLAVA</div></RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div>
      <GMapMap
        :center="{ lat: 42.25445688744328, lng: -73.89891615767105 }"
        :zoom="16"
        style="width: 100%; height: 400px"
      >
        <GMapMarker :position="{ lat: 42.25445688744328, lng: -73.89891615767105 }"></GMapMarker>
      </GMapMap>
    </div>

    <Parallax2 />
  </body>
</template>
<style scoped>
body {
  height: 100vh;
}
.hero {
  font-family: italic;
  font-style: italic;
}
.hero-body {
  padding: 19px !important;
}
.hero-head {
  justify-content: center;
  align-items: center;
}
.cell {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
img {
  filter: brightness(0.8);
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: auto;
}
img:hover {
  filter: brightness(0.9);
  opacity: 0.9;
  transform: scale(1.1);
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
    font-size: 13px;
  }
}
.large-title {
  top: 35%;
}
</style>
