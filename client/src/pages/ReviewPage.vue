<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type User, getAllUsers } from '@/models/user'
import { type Reply, getAllReplies, createReply } from '@/models/replies'
import { type Review, getAllReviews, createReview, removeReview } from '@/models/reviews'

// defining empty arrays of type User, Reply, and Review.
const allUsers = ref<User[]>([])
const allReplies = ref<Reply[]>([])
const allReviews = ref<Review[]>([])

// defining variables that are needed.
const userId = ref<number | null>(null)
const userEmail = ref<string | null>(null)
const isAdmin = ref(false)
const newReviewTitle = ref<string>('')
const newReviewText = ref<string>('')
const newReviewImage = ref<File | null>(null)
const newReplyText = ref<string>('')
const replyingTo = ref<number | null>(null)
const rating = ref<number | null>(null)
const hoverRatingValue = ref<number | null>(null)

// Fetching the data from the database.
async function fetchData() {
  try {
    const users = await getAllUsers()
    const replies = await getAllReplies()
    const reviews = await getAllReviews()
    allUsers.value = users.data
    allReplies.value = replies.data
    allReviews.value = reviews.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userId.value = loggedInUser.id || null
  userEmail.value = loggedInUser.email || null
  isAdmin.value = loggedInUser.email === 'admin@admin.com'

  await fetchData()
})

const loggedInUser = computed(() => allUsers.value.find((user) => user.email === userEmail.value))
const reversedReviews = computed(() => [...allReviews.value].reverse())

async function submitReview() {
  if (newReviewTitle.value && newReviewText.value) {
    try {
      const newReview: Review = {
        userId: userId.value!,
        title: newReviewTitle.value!,
        text: newReviewText.value!,
        rating: rating.value!,
        image: newReviewImage.value ? URL.createObjectURL(newReviewImage.value) : null
      }

      await createReview(newReview) // Add new review

      newReviewTitle.value = ''
      newReviewText.value = ''
      newReviewImage.value = null
      rating.value = null

      await fetchData()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }
}

async function submitReply(reviewId: number) {
  if (newReplyText.value) {
    try {
      const newReply: Reply = {
        id: Date.now(),
        userId: loggedInUser.value?.id!,
        reviewId,
        text: newReplyText.value,
        author: loggedInUser.value?.name || 'Unknown User'
      }

      await createReply(newReply) // Add new reply

      newReplyText.value = ''
      replyingTo.value = null

      await fetchData()
    } catch (error) {
      console.error('Error submitting reply:', error)
    }
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

function getUserName(userId: number) {
  const user = allUsers.value.find((user) => user.id === userId)
  return user ? user.name : 'Unknown User'
}

function setRating(star: number) {
  rating.value = star
}

function hoverRating(star: number) {
  hoverRatingValue.value = star
}

function resetHover() {
  hoverRatingValue.value = null
}

function getStarClass(star: number) {
  if (hoverRatingValue.value !== null && star <= hoverRatingValue.value) {
    return 'fas fa-star'
  }
  return star <= (rating.value || 0) ? 'fas fa-star' : 'far fa-star'
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    newReviewImage.value = target.files[0] || null
  }
}

function toggleReply(reviewId: number) {
  replyingTo.value = replyingTo.value === reviewId ? null : reviewId
}

if (!newReviewTitle.value || !newReviewText.value || !rating.value) {
  console.error('Please fill in all required fields!')
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
      <div v-for="review in reversedReviews" :key="review.userId" class="review-item">
        <h4 class="subtitle is-5" style="margin-bottom: 0.25rem">
          {{ review.title }}
        </h4>
        <h3>{{ getUserName(review.userId) }}</h3>
        <h3>Rating: <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span></h3>
        <h3><i class="fas fa-calendar-alt"></i> {{ review.date }}</h3>
        <p class="review-text my-2">{{ review.text }}</p>

        <div v-if="review.image">
          <img :src="review.image" alt="Review img" class="review-image" />
        </div>

        <!-- Display Replies -->
        <div v-if="allReplies && allReplies.length" class="replies mt-3">
          <h4>Replies:</h4>
          <div
            v-for="reply in allReplies.filter((reply) => reply.reviewId === review.id)"
            :key="reply.id"
            class="reply"
          >
            <p class="reply-title">{{ reply.author }} <br /></p>
            <p class="px-5">{{ reply.text }}</p>
            <button v-if="reply.userId === userId" class="button my-1">Delete Reply</button>
          </div>
        </div>

        <!-- Toggle Reply Textarea -->
        <button class="button my-1" @click="toggleReply(review.userId)">Reply</button>

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
          @click="deleteReview(Number(review.id))"
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
  background-color: var(--secondary-background);
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
