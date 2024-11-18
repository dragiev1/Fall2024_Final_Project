<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type User, getAll, type Reply, type Review, type ReviewWithReplies } from '@/models/user'

const allUsers = ref<User[]>([])
allUsers.value = getAll().data

const userId = ref<string | null>(null)
const userEmail = ref<string | null>(null)
const isAdmin = ref(false) // For admin purposes.
const newReviewTitle = ref<string>('')
const newReviewText = ref<string>('')
const newReviewImage = ref<File | null>(null)
const newReplyText = ref<string>('')
const replyingTo = ref<number | null>(null)

onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userId.value = loggedInUser.id || null
  userEmail.value = loggedInUser.email || null
  isAdmin.value = loggedInUser.email === 'admin@admin.com'
})

const userReviews = computed<ReviewWithReplies[]>(() => {
  return allUsers.value.flatMap((user) =>
    user.reviews.map((review) => ({
      ...(review as ReviewWithReplies), // Cast each review as ReviewWithReplies
      userId: user.name,
      replies: review.replies || [] // Provide default empty array
    }))
  )
})

const reversedReviews = computed(() => {
  return [...userReviews.value].reverse()
})

function deleteReview(userId: string, reviewId: string) {
  const user = allUsers.value.find((user) => user.id === Number(userId))
  if (user) {
    user.reviews = user.reviews.filter((review) => String(review.id) !== reviewId)
  }
}

const rating = ref<number | null>(null) // Holds the current rating
const hoverRatingValue = ref<number | null>(null) // Holds the hovered rating

// Function to set the rating when a star is clicked
function setRating(star: number) {
  rating.value = star
}

// Function to handle mouseover to show the hovered rating
function hoverRating(star: number) {
  hoverRatingValue.value = star
}

// Function to reset the hovered rating when mouse leaves
function resetHover() {
  hoverRatingValue.value = null
}

// Function to determine the class of the star based on the rating
function getStarClass(star: number) {
  if (hoverRatingValue.value !== null && star <= hoverRatingValue.value) {
    return 'fas fa-star' // Filled star on hover
  }
  return star <= (rating.value || 0) ? 'fas fa-star' : 'far fa-star' // Filled or empty star
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    newReviewImage.value = target.files[0] || null
  }
}

function submitReview() {
  if (newReviewTitle.value && newReviewText.value && rating.value) {
    const newReview: Review = {
      id: Date.now(),
      title: newReviewTitle.value,
      text: newReviewText.value,
      rating: rating.value,
      date: new Date().toLocaleDateString(),
      image: newReviewImage.value ? URL.createObjectURL(newReviewImage.value) : null
    }

    const user = allUsers.value.find((user) => user.id === Number(userId.value))
    if (user) {
      user.reviews.push(newReview)
      newReviewTitle.value = ''
      newReviewText.value = ''
      newReviewImage.value = null
      rating.value = null
    }
  }
}
function getUserName(userId: string) {
  const user = allUsers.value.find((user) => user.id == Number(userId))
  return user ? user.name : 'Unknown User'
}

function submitReply(reviewId: number) {
  const review = userReviews.value.find((review) => review.id === reviewId)
  if (review) {
    const newReply: Reply = {
      id: Date.now(),
      text: newReplyText.value,
      author: getUserName(userId.value || ''),
      time: new Date().toLocaleString()
    }
    review.replies.push(newReply)
    newReplyText.value = ''
    replyingTo.value = null
  }
}

function toggleReply(reviewId: number) {
  if (replyingTo.value === reviewId) {
    replyingTo.value = null // Hide the textarea if it's already open for this review
  } else {
    replyingTo.value = reviewId // Show the textarea for this specific review
  }
}
</script>

<template>
  <section class="section py-6">
    <div class="container">
      <h1 class="title has-text-centered">Reviews<i class="fas fa-comments mx-2"></i></h1>

      <!-- New Comment Input -->
      <div class="box">
        <div class="rating">
          <h2 class="text mr-2">Rating:</h2>
          <span
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            @mouseover="hoverRating(star)"
            @mouseleave="resetHover"
            class="star"
          >
            <i :class="getStarClass(star)"></i>
          </span>
        </div>
        <input v-model="newReviewTitle" class="input my-1" type="text" placeholder="Title" />
        <textarea
          v-model="newReviewText"
          class="textarea"
          placeholder="Submit a Review!"
        ></textarea>
        <button class="button is-info mt-2" @click="submitReview">Submit Review</button>
        <button class="button hide-background is-info mt-2 mx-2 my-2">
          <input type="file" class="is-clickable px-1" @change="handleFileUpload" />
        </button>
      </div>

      <!-- Comment List -->
      <div v-for="review in reversedReviews" :key="review.id" class="review-item">
        <h4 class="subtitle is-5" style="margin-bottom: 0.25rem">
          {{ review.title }}
        </h4>
        <h3>{{ getUserName(review.userId) }}</h3>
        <h3>Rating: <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span></h3>
        <h3><i class="fas fa-calendar-alt"></i> {{ review.date }}</h3>
        <p class="review-text my-2">{{ review.text }}</p>

        <div v-if="review.image">
          <img :src="review.image" alt="Review Image" class="review-image" />
        </div>

        <!-- Display Replies -->
        <div v-if="review.replies && review.replies.length" class="replies mt-3">
          <h4>Replies:</h4>
          <div v-for="reply in review.replies" :key="reply.id" class="reply">
            <p class="reply-title">
              {{ reply.author }} <br />
              ({{ reply.time }}):
            </p>
            <p class="px-5">{{ reply.text }}</p>
          </div>
        </div>

        <!-- Toggle Reply Textarea -->
        <button class="button my-1" @click="toggleReply(review.id)">Reply</button>

        <!-- Conditional Reply Form -->
        <div v-if="replyingTo === review.id">
          <textarea
            v-model="newReplyText"
            class="textarea my-2"
            placeholder="Add a reply..."
          ></textarea>
          <button class="button is-info my-1" @click="submitReply(review.id)">Submit Reply</button>
        </div>

        <button
          v-if="review.userId === userId"
          class="button my-1"
          @click="deleteReview(review.userId, String(review.id))"
        >
          Delete Review
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  min-height: 195px;
}

.review-date,
.review-text,
.review-rating {
  font-size: 1rem;
  background-color: var(--primary-background);
  padding: 7px;
  color: black;
  padding-left: 1rem;
}

.review-date i {
  margin-right: 5px;
}

.button {
  background-color: var(--highlights-background);
}

.reply-title {
  color: rgba(104, 104, 104, 0.575);
}

p {
  background-color: var(--accent-background);
  padding: 7px;
  color: black;
}

section {
  margin-top: 3.5rem;
}

.title {
  font-style: italic;
  font-family: italic;
  font-size: 50px;
}

.subtitle {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  letter-spacing: 2px;
}

.input,
.textarea {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.input:focus,
.textarea:focus {
  border-color: var(--accent-background) !important;
  box-shadow: 0 4px 8px var(--accent-background);
}

.input:focus ~ .icon i {
  color: var(--accent-background);
}

.rating {
  display: flex;
  cursor: pointer;
}
.text,
.star {
  font-size: 1.5rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.replies {
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 1rem;
}

.reply {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}
</style>
