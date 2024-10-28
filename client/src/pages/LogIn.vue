<script setup lang="ts">
import router from '../router'
import { ref } from 'vue'
import { useAuth } from '../models/useAuth'
import { getAll, type User } from '@/models/user'

const users = ref<User[]>([])
const { isLoggedIn, login } = useAuth()
users.value = getAll().data

const email = ref<string>('')
const password = ref<string>('')
const loginError = ref<string>('')

const handleLogin = (): void => {
  const user = users.value.find((u) => u.email === email.value)

  if (!user) {
    loginError.value = 'User not found!'
  } else if (user.password !== password.value && user.email === email.value) {
    loginError.value = 'Invalid Password.'
  } else {
    localStorage.setItem('userToken', user.id)
    console.log(isLoggedIn.value)
    login()
    console.log(isLoggedIn.value)
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        telephone: user.telephone,
        profilePicture: user.profilePicture,
        reviews: user.reviews,
        numOfReviews: user.numOfReviews
      })
    )
    router.push({ path: '/' })
  }
}
</script>

<template>
  <body>
    <section>
      <div class="column is-4 is-offset-4">
        <div
          class="hero is-medium is-flex is-justify-content-center is-align-items-center"
          style="background-color: var(--highlights-background)"
        >
          <div class="hero-head">
            <div class="title has-text-centered py-5 has-text-light">Log in</div>
          </div>
          <div class="subtitle is-6">
            <i class="fas fa-circle px-1 has-text-white"></i>
            <i class="fas fa-circle px-1 has-text-white"></i>
            <i class="fas fa-circle px-1 has-text-white"></i>
          </div>
          <div class="hero-body">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  @keyup.enter="handleLogin"
                  required
                />
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
                <input
                  class="input"
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  @keyup.enter="handleLogin"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <RouterLink to="/SignUp" class="subtitle is-6 is-underlined"
              >No Account? Sign up!</RouterLink
            >
            <div class="field">
              <p class="control">
                <button class="button" @click="handleLogin">Login</button>
              </p>
            </div>

            <!-- Login Error Message -->>
            <p v-if="loginError" class="has-text-danger px-3">{{ loginError }}</p>
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
.subtitle {
  color: var(--primary-background);
  font-style: italic;
  font-size: small;
}
.subtitle:hover {
  color: rgba(0, 0, 0, 0.364);
  font-style: italic;
  font-size: small;
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
