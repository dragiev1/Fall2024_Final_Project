<script setup lang="ts"></script>

<template>
  <body class="columns">
    <div class="column is-6 is-offset-3 has-text-centered py-6">
      <section class="hero is-medium">
        <div class="hero-head">
          <p class="title py-6">Contact Us!</p>
        </div>
        <div class="hero-body has-text-left">
          <div class="field">
            <label class="label">Name*</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>

          <div class="field">
            <label class="label">Email*</label>
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
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" placeholder="Lorem ipsum..."></textarea>
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
      </section>
    </div>
  </body>
</template>

<style scoped>
.hero-body {
  padding-top: 0 !important;
  padding-bottom: 5rem !important;
}
.column {
  padding-top: 9rem !important;
  height: 110vh;
}
.title,
.label {
  font-style: italic;
  font-family: italic;
  color: var(--highlights-background);
}
.button {
  background-color: var(--highlights-background);
  color: var(--secondary-background);
}

/* Styling for inputs */
.input,
.textarea {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.input:focus, .textarea:focus {
  border-color: var(--accent-background);
  box-shadow: 0 0 8px var(--highlights-background);
}
.icon i {
  transition: color 0.4s ease;
}
.input:focus ~ .icon i {
  color: var(--accent-background);
}
</style>
