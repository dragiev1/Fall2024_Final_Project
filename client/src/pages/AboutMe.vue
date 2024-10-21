<script setup lang="ts"></script>

<template>
  <body
    class="content-wrapper column is-two-thirds is-offset-one-fifth"
    style="padding-top: 5rem !important"
  >
    <div class="container">
      <section class="hero is-medium">
        <div class="hero-head has-text-centered my-5">
          <p class="title">~ About Made with Love ~</p>
          <p class="subtitle">* by Nadia *</p>

          <i class="fas fa-circle px-1" style="color: var(--highlights-background)"></i>
          <i class="fas fa-circle px-1" style="color: var(--highlights-background)"></i>
          <i class="fas fa-circle px-1" style="color: var(--highlights-background)"></i>
        </div>

        <div class="hero-body">
          <div class="container has-text-left has-text-dark is-flex is-align-items-start">
            <div class="column is-two-fifths text-column has-text-centered">
              <br />
              My name is Nadia, half Bulgarian, half Russian. I moved to the USA 20 years ago and
              discovered my passion for creating desserts. I realized my creations are unique and
              now I'm excited to share my devotion for desserts with you!
              <br />
              <br />Do you have a special occasion, or do you want to treat yourself or your friends
              and family to a one-of-a-kind dessert? If you're looking for non-traditional cakes and
              desserts that will impress and exceed your expectations, then Made with Love by Nadia
              is the right place for you.
              <br />

              <br />
              I hope you find my creations as exciting and special as I do! Each product is crafted
              with love and care using only the finest ingredients. Inspired by French culinary
              recipes, my cakes feature unique combinations of layers and cream, resulting in light
              and moist desserts made just for you.
              <br />

              <br />
              I know we're all craving delicious desserts! :) Join me on this journey and let me
              know what creation you or your loved ones would like to experience. <br />
            </div>
            <div class="column is-three-fifths image-column" style="padding-top: 30px">
              <img src="\src\assets\nadia.jpg" class="responsive-image" alt="Cake" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </body>
</template>

<style scoped>
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.hero-body {
  padding-top: 0 !important;
  padding-bottom: 2rem !important;
}
.column .is-two-fifths {
  font-size: 16px;
  padding-bottom: 3rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: normal;
  line-height: 33px;
  letter-spacing: -0.7px;
  background-color: var(--highlights-background);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.content-wrapper {
  padding-top: 7rem; /* Adjusting the body height to compensate for NavBar component */
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-family: italic;
  font-style: italic;
}
.hero {
  background-color: var(--accent-background);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .is-flex {
    flex-direction: column; /* Change flex direction to column */
  }
  .image-column {
    order: 1; /* Set image column to appear first */
  }
  .text-column {
    order: 2; /* Set text column to appear second */
  }
}
</style>
