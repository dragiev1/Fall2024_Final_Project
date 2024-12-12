<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const parallaxStyle = ref({})

const handleScroll = () => {
  const scrollPosition = window.scrollY
  parallaxStyle.value = {
    backgroundPosition: `center ${scrollPosition * -0.06}px`
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
    <!-- Going to put a contact card component here -->
    <div class="columns">
      <div class="column is-4 is-offset-2 is-mobile-2">
        <div class="box">
          <p class="title has-text-centered">Contact Us!</p>
          <div class="field">
            <div class="label">Name*</div>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>

          <div class="field">
            <div class="label">Email*</div>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="example@gmail.com" />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-danger"></p>
          </div>

          <div class="field">
            <div class="label">Message</div>
            <div class="control">
              <textarea class="textarea" placeholder="Share a thought..."></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link submit">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3 is-offset-1">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <br />
              Follow us on Facebook for even sweeter time!
              <a href="https://www.facebook.com/profile.php?id=100067544509274" target="_blank"
                ><i class="fab fa-lg fa-facebook px-3 icon"></i
              ></a>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  color: var(--highlights-background);
}
.icon:hover {
  color: var(--highlights-background-hover);
}
.box {
  align-items: center;
  justify-content: center;
  opacity: 80%;
  background-color: black;
}
.column {
  padding-top: 5rem;
  @media (max-width: 768px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}
.column.is-3 {
  padding-top: 20rem;
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
    padding-top: 1rem;
  }
}
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.card-content {
  padding-top: 0 !important;
  font-family: italic;
  font-style: italic;
  font-size: larger;
}
.title,
.label {
  font-style: italic;
  font-family: italic;
  color: white;
}
.button {
  background-color: var(--highlights-background);
  color: white;
}
.bgimg-1 {
  background-image: url('@/assets/parallaxImage3.png') !important;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0 !important;
  min-height: 70vh;
  filter: contrast(1.3) brightness(0.9);
  overflow: hidden;
  @media (max-width: 768px) {
    background-image: url('@/assets/parallaxImage3.png') !important;
    background-attachment: local;
  }
}
.input,
.textarea {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Styling for inputs */
.textarea:focus {
  box-shadow: 0 4px 8px var(--primary-background);
  border-color: var(--primary-background);
}
.input:focus {
  border-color: var(--primary-background);
  box-shadow: 0 0 8px var(--primary-background);
}
.icon i {
  transition: color 0.4s ease;
}
.input:focus ~ .icon i {
  color: var(--highlights-background);
}
</style>
