<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'ParallaxComponent',
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(): void {
      const parallaxImage = this.$el.querySelector('.parallax-image') as HTMLImageElement;
      if (parallaxImage) {
        const scrollPosition = window.scrollY;
        parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Change multiplier to control speed
      }
    },
  },
});

</script>

<template>
  <div class="parallax">
    <img src="@\assets\test.jpg" alt="Parallax Image" class="parallax-image" />
  </div>
  <div class="content">
    <h1>Hello</h1>
    <p>Scroll!</p>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.parallax {
  position: relative;
  overflow: hidden;
  height: 500px;
}

.parallax-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%; /* Adjust based on your needs */
  height: auto; /* Maintain aspect ratio */
  transform: translate(-50%, -50%);
  z-index: -1; /* Ensure the image is behind content */
  object-fit: cover; /* Cover the div completely */
}

.content {
  height: 1000px;
  padding: 20px;
  background: white;
}
</style>
