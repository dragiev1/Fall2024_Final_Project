<script setup lang="ts"></script>

<template>
  <body class="columns">
    <div class="column is-8 is-offset-2 py-6">
      <p class="title">Report an Issue</p>

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
        <label class="label">Message*</label>
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
  </body>
</template>

<style scoped>
.columns {
  padding-top: 10rem !important;
  height: 100vh;

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
