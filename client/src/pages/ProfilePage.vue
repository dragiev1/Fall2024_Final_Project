<script setup lang="ts">
import { getAll, type User, type Review } from '@/models/user'
import { onMounted, ref } from 'vue'

const userName = ref<string | null>(null)
const userUsername = ref<string | null>(null)
const userEmail = ref<string | null>(null)
const userPhone = ref<string | null>(null)
const userProfilePic = ref<string | null>(null)
const userReviews = ref<Review[] | null>(null)
const isAdmin = ref(false) // For admin purposes.

const allUsers = ref<User[]>([])
allUsers.value = getAll().data

onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userName.value = loggedInUser.name || null
  userUsername.value = loggedInUser.username || null
  userEmail.value = loggedInUser.email || null
  userPhone.value = loggedInUser.telephone || null
  userProfilePic.value = loggedInUser.profilePicture
  userReviews.value = loggedInUser.reviews || []

  isAdmin.value = loggedInUser.email === 'admin@admin.com'
})
</script>

<template>
  <body>
    <section class="section my-6">
      <div class="container">
        <div class="box profile-box">
          <div class="profile-image">
            <img :src="userProfilePic" alt="User Profile Picture" />
          </div>
          <h2 class="title is-4">{{ userName }}</h2>

          <div class="profile-info">
            <p class="subtitle is-6"><i class="fas fa-envelope"></i>{{ userEmail }}</p>
            <p><i class="fas fa-phone"></i> {{ userPhone }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Review History Section -->
    <div v-if="!isAdmin" class="review-history-container">
      <div class="box review-history-box">
        <h3 class="title is-5">Recent Reviews: ({{ userReviews?.length }})</h3>
        <div v-if="userReviews?.length" class="reviews">
          <div v-for="review in userReviews" :key="review.id" class="review-item">
            <h4 class="title is-6">{{ review.title }}</h4>
            <p class="review-date"><i class="fas fa-calendar-alt"></i> {{ review.date }}</p>
            <p class="review-text">{{ review.text }}</p>
            <p v-if="review.rating" class="review-rating">
              Rating:
              <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span>
            </p>
          </div>
        </div>
        <p v-else>No reviews yet.</p>
      </div>
    </div>

    <!-- Admin Section for Viewing All Users -->
    <div v-else class="admin-section">
      <div class="box all-users-box">
        <h3 class="title is-5 px-4">All Users:</h3>
        <div class="grid">
          <div v-for="user in allUsers" :key="user.id" class="cell user-item">
            <div class="box review-history-box">
              <h3 class="title is-5">{{ user.name }}: ({{ user.reviews?.length }})</h3>
              <h2 class="subtitle is-6 my-2"><i class="fas fa-envelope"></i> {{ user.email }}
            <br><i class="fas fa-phone"></i> {{ user.telephone }}</h2>
              
              <div v-if="user.reviews?.length" class="reviews">
                <div v-for="review in user.reviews" :key="review.id" class="review-item">
                  <h4 class="title is-6">{{ review.title }}</h4>
                  <p class="review-date"><i class="fas fa-calendar-alt"></i> {{ review.date }}</p>
                  <p class="review-text">{{ review.text }}</p>
                  <p v-if="review.rating" class="review-rating">
                    Rating:
                    <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span>
                  </p>
                  <button class="button">Delete Review</button>
                </div>
              </div>
              <p v-else>No reviews yet.</p>
              <button class="button is-bottom">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  min-height: 100vh;
}

.button {
    margin-top: 1rem;
    width: 100%;
    height: 35px;
    display: inline-flex; /* Allows you to center items vertically */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin: 0;
}

.profile-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  background-color: var(--highlights-background);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid #fff;
}

.profile-info p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.profile-info i {
  color: var(--secondary-background);
  margin-right: 8px;
}

.review-history-box {
  display: grid;
  flex-direction: column;
  background-color: var(--secondary-background);
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgb(0, 0, 0, 0.4);
  min-width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  overflow: hidden
}

.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem; /* space between grid items */
  width: 100%;
  margin: 0; 
  overflow-y: auto;
  max-height: 300px;
}

.review-item {
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: var(--primary-background);
  border-radius: 10px;
  overflow: hidden;
  min-height: 195px;
}

.review-date,
.review-text,
.review-rating {
  font-size: 0.9rem;
}

.review-date i {
  margin-right: 5px;
}

.review-rating {
  margin-top: 0.5rem;
  color: var(--highlight);
}

.user-item {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0.5rem;
}
</style>
