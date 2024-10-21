<script setup lang="ts"></script>

<template>
  <body>
    <section>
      <div class="column is-4 is-offset-4">
        <div
          class="hero is-medium is-flex is-justify-content-center is-align-items-center"
          style="background-color: var(--highlights-background)"
        >
          <div class="hero-head">
            <div class="title has-text-centered py-5 has-text-light">Sign Up</div>
          </div>
          <div class="subtitle">
            <i class="fas fa-circle px-1 has-text-white"></i>
            <i class="fas fa-circle px-1 has-text-white"></i>
            <i class="fas fa-circle px-1 has-text-white"></i>
          </div>
          <div class="hero-body">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button">Sign Up!</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<style scoped>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
section {
  width: 100%;
}
.title {
  font-family: italic;
  font-style: italic;
  font-size: 40px;
}
.hero {
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.hero-body {
  padding-top: 4rem !important;
  padding-bottom: 6rem !important;
}
.button:hover {
  border-color: var(--highlights-background-hover);
}

/* Styling for inputs */
.input,
.textarea {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.input:focus {
  border-color: var(--accent-background);
  box-shadow: 0 0 8px var(--primary-background);
}
.icon i {
  transition: color 0.4s ease;
}
.input:focus ~ .icon i {
  color: var(--accent-background);
}
</style>
