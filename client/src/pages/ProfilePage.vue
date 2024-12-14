<script setup lang="ts">
import { getAllUsers, type User, removeUser } from '@/models/user'
import { getAllReplies, type Reply, removeReply } from '@/models/replies'
import { getAllReviews, type Review, removeReview } from '@/models/reviews'
import { computed, onMounted, ref } from 'vue'

// defining empty arrays of type User, Reply, and Review.
const allUsers = ref<User[]>([])
const allReplies = ref<Reply[]>([])
const allReviews = ref<Review[]>([])

// defining variables that are needed.
const userId = ref<number>()
const userName = ref<string>()
const userEmail = ref<string>()
const userPhone = ref<string>()
const userProfilePic = ref<string>()
const userReviews = ref<Review[]>()
const currentPage = ref(1) // Track current page
const usersPerPage = 12 // Number of users to display per page
const isAdmin = ref(false) // For admin purposes.

async function fetchData() {
  try {
    const users = await getAllUsers()
    const reviews = await getAllReviews()
    const replies = await getAllReplies()
    allUsers.value = users.data
    allReplies.value = replies.data
    allReviews.value = reviews.data
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}

const totalRatings = computed(() => allReviews.value.length)

//  Average Ratings
const avgReviews = computed(() => {
  if (allReviews.value.length === 0) return 0

  const sumOfRatings = allReviews.value.reduce((sum, review) => sum + (review.rating || 0), 0)
  const average = sumOfRatings / allReviews.value.length

  return Math.floor(average * 1000) / 1000
})

async function deleteUser(userId: number) {
  try {
    await removeUser(userId)
    await fetchData()
  } catch (error) {
    console.log('Error deleting user: ', error)
  }
}

async function deleteReview(reviewId: number) {
  try {
    await removeReview(reviewId) // Delete review
    await fetchData()
  } catch (error) {
    console.error('Error deleting review:', error)
  }
}

async function deleteReply(replyId: number) {
  try {
    await removeReply(replyId) // Delete reply
    await fetchData()
  } catch (error) {
    console.error('Error deleting reply:', error)
  }
}

onMounted(async () => {
  const storedUser = localStorage.getItem('loggedInUser')
  if (!storedUser) {
    console.error('No logged-in user found!')
    return
  }
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userId.value = loggedInUser.id
  userName.value = loggedInUser.name
  userEmail.value = loggedInUser.email
  userPhone.value = loggedInUser.telephone
  userProfilePic.value = loggedInUser.profilePicture
  isAdmin.value = loggedInUser.email === 'admin@admin.com'
  await fetchData()
})

function getNumOfReviews(userId: number): number {
  return allReviews.value.filter((review) => review.userId === userId).length
}

function deleteSingleReview(reviewId: string) {
  userReviews.value = userReviews.value?.filter((review) => String(review.id) !== reviewId) || []
}

const paginatedUsers = computed(() => {
  const startIndex = 0
  const endIndex = currentPage.value * usersPerPage
  return allUsers.value.slice(startIndex, endIndex)
})

function loadMoreUsers() {
  currentPage.value += 1
}
</script>

<template>
  <body>
    <section class="section my-6">
      <div class="container">
        <div class="box profile-box">
          <div class="profile-image">
            <img :src="userProfilePic" alt="img" />
          </div>
          <h2 class="title is-4" style="margin-bottom: 2px">{{ userName }}</h2>
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
            <button class="button is-light" @click="deleteSingleReview(String(review.id))">
              Delete Review
            </button>
          </div>
        </div>
        <p v-else>No reviews yet.</p>
      </div>
    </div>

    <!-- Admin Section for Viewing All Users -->
    <div class="admin-section">
      <div class="box all-users-box">
        <h3 class="title is-4 px-4">All Users: ({{ allUsers.length }})</h3>
        <h4 class="subtitle px-4">
          Average Stars: {{ avgReviews }} <br />Total Reviews: {{ totalRatings }}
        </h4>
        <div class="grid">
          <!-- Loop through paginated users -->
          <div v-for="user in paginatedUsers" :key="user.id" class="cell user-item">
            <div class="box review-history-box">
              <h3 class="title is-5">{{ user.name }}: ({{ getNumOfReviews(user.id!) }})</h3>
              <h2 class="subtitle is-6 my-2">
                <i class="fas fa-envelope"></i> {{ user.email }} <br /><i class="fas fa-phone"></i>
                {{ user.telephone }}
              </h2>

              <div v-if="allReviews" class="reviews">
                <div
                  v-for="review in allReviews.filter((review) => review.userId === user.id)"
                  :key="review.id"
                  class="review-item"
                >
                  <h4 class="title is-6">{{ review.title }}</h4>
                  <p class="review-date"><i class="fas fa-calendar-alt"></i> {{ review.date }}</p>
                  <p class="review-text">{{ review.text }}</p>
                  <p v-if="review.rating" class="review-rating">
                    Rating:
                    <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span>
                  </p>
                  <button class="button" @click="deleteReview(Number(review.id))">
                    Delete Review
                  </button>
                </div>
                <div
                  v-for="reply in allReplies.filter((reply) => reply.userId === user.id)"
                  :key="reply.id"
                  class="reply-item"
                >
                  <p class="review-text">{{ reply.text }}</p>
                  <button class="button" @click="deleteReply(Number(reply.id))">
                    Delete Reply
                  </button>
                </div>
              </div>
              <p v-else>No reviews yet.</p>
              <button
                v-if="user.email !== 'admin@admin.com'"
                class="button is-bottom"
                @click="deleteUser(Number(user.id))"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
        <!-- Load More Button -->
        <div class="load-more-container">
          <button
            v-if="paginatedUsers.length < allUsers.length"
            class="button"
            @click="loadMoreUsers"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  min-height: 100vh;
  overflow-x: hidden;
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
  width: 150px;
  height: 150px;
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
  min-width: 105%;
  margin: 0 auto;
  flex-grow: 1;
  overflow: hidden;
}

.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem; /* space between grid items */
  width: 125%;
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
  min-height: 200px;
  width: 17rem;
}

.reply-item {
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: var(--primary-background);
  border-radius: 10px;
  overflow: hidden;
  height: 100px;
  width: 17rem;
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
