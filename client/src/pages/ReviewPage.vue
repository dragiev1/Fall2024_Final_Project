<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type User, getAllUsers } from '@/models/user'
import { type Reply, getAllReplies, createReply, removeReply } from '@/models/replies'
import {
  type Review,
  getAllReviews,
  createReview,
  removeReview,
  updateReview
} from '@/models/reviews'
import { useAuth } from '@/models/useAuth'

const { isLoggedIn } = useAuth()

// Defining empty arrays of type User, Reply, and Review.
const allUsers = ref<User[]>([])
const allReplies = ref<Reply[]>([])
const allReviews = ref<Review[]>([])

// Defining variables that are needed.
const userId = ref<number>()
const userEmail = ref<string>()
const isAdmin = ref(false)
const newReviewTitle = ref<string>('')
const newReviewText = ref<string>('')
const newReviewImage = ref<File | null>(null)
const newReplyText = ref<string>('')
const replyingTo = ref<number | null>(null)
const rating = ref<number>()
const hoverRatingValue = ref<number | null>(null)
const isModalActive = ref(false)
const modalImage = ref<string | null>(null)
const editingReviewId = ref<number | null>(null)
const editedReviewText = ref<string>('')
const loggedInUser = computed(() => allUsers.value.find((user) => user.email === userEmail.value))
const reversedReviews = computed(() => [...allReviews.value].reverse())

// Stores and checks current logged in user's data.
onMounted(async () => {
  const storedUser = localStorage.getItem('loggedInUser')
  if (!storedUser) {
    console.error('No logged-in user found in localStorage!')
    return
  }
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  userId.value = loggedInUser.id
  userEmail.value = loggedInUser.email
  isAdmin.value = loggedInUser.email === 'admin@admin.com'
  await fetchData()
})

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
// Updating Review text body.
async function updateReviewText(reviewId: number) {
  if (!editedReviewText.value.trim()) {
    console.error('Review text cannot be empty')
    return
  }

  try {
    // Retrieve the full review object based on the reviewId
    const existingReview = allReviews.value.find((review) => review.id === reviewId)
    if (!existingReview) {
      console.error('Review not found')
      return
    }

    const updatedReview = {
      ...existingReview,
      text: editedReviewText.value // Update the text
    }
    console.log(updatedReview)
    // Call the update function with the additional 'review' argument
    const result = await updateReview(updatedReview)

    if (!result.isSuccess) {
      console.error('Failed to update review:', result.message)
      return
    }

    await fetchData() // Refresh the data
    closeEditingReview() // Exit editing mode
  } catch (error) {
    console.error('Error updating review:', error)
  }
}

function startEditingReview(reviewId: number, currentText: string) {
  editingReviewId.value = reviewId
  editedReviewText.value = currentText
}
function closeEditingReview() {
  editingReviewId.value = null
  editedReviewText.value = ''
}
function hasErrorReview() {
  // If a user did not fill in required fields.
  let hasError = false
  if (!newReviewTitle.value) {
    addGlowEffect('.input')
    hasError = true
  }
  if (!newReviewText.value) {
    addGlowEffect('.textarea')
    hasError = true
  }
  if (!rating.value) {
    addGlowEffect('.rating')
    hasError = true
  }
  if (hasError) return
}
function hasErrorReply() {
  let hasError = false
  if (!newReplyText.value) {
    addGlowEffect('.textarea.my-2')
    hasError = true
  }
  if (hasError) return
}
// Border glow effect for non-filled requirements when filling out a review.
function addGlowEffect(selector: string) {
  // Glow effect for missing fields.
  const element = document.querySelector(selector)
  if (element) {
    element.classList.add('error-glow')
    setTimeout(() => element.classList.remove('error-glow'), 500)
  }
}
// Submitting a review.
async function submitReview() {
  hasErrorReview()

  if (!userId.value) {
    // If user is not logged in, they can not make a review.
    console.error('User ID is missing. Cannot submit review.')
    return
  }

  if (!newReviewTitle.value || !newReviewText.value || !rating.value) {
    console.error('Please fill in all required fields!')
    return
  }

  if (newReviewTitle.value && newReviewText.value && rating.value) {
    try {
      console.log(userId.value, newReviewTitle.value, newReviewText.value, rating.value)
      const newReview: Review = {
        userId: userId.value!,
        title: newReviewTitle.value,
        text: newReviewText.value,
        rating: rating.value!,
        image: null
      }

      const result = await createReview(newReview)

      if (!result.isSuccess) {
        console.error('Review submission failed:', result.message)
        return
      }

      newReviewTitle.value = ''
      newReviewText.value = ''
      newReviewImage.value = null
      rating.value = 0

      await fetchData()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }
}
// Submitting a reply.
async function submitReply(reviewId: number) {
  hasErrorReply()
  if (newReplyText.value) {
    try {
      const newReply: Reply = {
        userId: loggedInUser.value?.id!,
        reviewId,
        text: newReplyText.value,
        author: loggedInUser.value?.name || 'Unknown User'
      }

      const result = await createReply(newReply)

      if (!result.isSuccess) {
        console.error('Reply submission failed:', result.message)
        return
      }

      newReplyText.value = ''
      replyingTo.value = null

      await fetchData()
    } catch (error) {
      console.error('Error submitting reply:', error)
    }
  }
}
// Deleting a review.
async function deleteReview(reviewId: number) {
  try {
    await removeReview(reviewId) // Delete review
    await fetchData()
  } catch (error) {
    console.error('Error deleting review:', error)
  }
}
// Deleting a reply.
async function deleteReply(replyId: number) {
  try {
    await removeReply(replyId) // Delete review
    await fetchData()
  } catch (error) {
    console.error('Error deleting review:', error)
  }
}

function getUserName(userId: number) {
  const user = allUsers.value.find((user) => user.id === userId)
  return user ? user.name : 'Unknown User'
}
function getProfilePic(userId: number) {
  const user = allUsers.value.find((user) => user.id === userId)
  return user ? user.profilePicture : 'Unknown User'
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
// Image upload handling.
// CANNOT SEND IMAGES YET WILL ADD AFTER FINAL.
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    newReviewImage.value = target.files[0] || null
  }
}
// Toggles reply textarea for when making a reply to a review.
function toggleReply(reviewId: number) {
  replyingTo.value = replyingTo.value === reviewId ? null : reviewId
}
// Function to open the modal.
function openModal(imageUrl: string) {
  modalImage.value = imageUrl
  isModalActive.value = true
}
// Function to close the modal.
function closeModal() {
  isModalActive.value = false
  modalImage.value = null
}
</script>

<template>
  <section class="section py-6">
    <div class="container">
      <h1 class="title has-text-centered">Reviews<i class="fas fa-comments mx-2"></i></h1>

      <!-- New Review Input -->
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
        <!-- Image Preview Trigger -->
        <div v-if="review.image != null" class="is-clickable" @click="openModal(review.image)">
          <img :src="review.image" alt="ReviewImg" class="review-image" />
        </div>

        <!-- Profile Picture and Info -->
        <div class="review-header">
          <img
            :src="getProfilePic(review.userId)"
            alt="ProfilePic"
            class="user-profile-picture-review"
          />
          <div class="review-info">
            <h4 class="subtitle is-5" style="margin-bottom: 0.25rem">
              {{ review.title }}
            </h4>
            <h3>
              {{ getUserName(review.userId) }}
            </h3>
          </div>
        </div>

        <!-- Rating and Date -->
        <h3>Rating: <span class="has-text-warning" v-for="n in review.rating" :key="n">★</span></h3>
        <h3><i class="fas fa-calendar-alt"></i> {{ review.date }}</h3>

        <!-- Review Text and Edit Options -->
        <p v-if="editingReviewId !== review.id" class="review-text my-2">
          {{ review.text }}
        </p>
        <div v-else>
          <textarea
            v-model="editedReviewText"
            class="textarea my-2"
            placeholder="Edit your review..."
          ></textarea>
          <button class="button is-success my-1" @click="updateReviewText(review.id!)">Save</button>
          <button class="button is-danger my-1 mx-1" @click="closeEditingReview()">Cancel</button>
        </div>

        <!-- Display All Replies -->
        <div v-if="allReplies && allReplies.length" class="replies mt-3">
          <h4 v-if="allReplies.length > 0">Replies:</h4>
          <div
            v-for="reply in allReplies.filter((reply) => reply.reviewId === review.id)"
            :key="reply.id"
            class="reply"
          >
            <!-- Display Reply -->
            <div class="reply-header">
              <img
                :src="getProfilePic(reply.userId)"
                alt="ProfilePic"
                class="user-profile-picture-reply mx-2"
              />
              <div class="reply-info">
                <p class="reply-title">{{ reply.author }}<br /></p>
                <p class="px-2">{{ reply.text }}</p>
              </div>
            </div>

            <!-- Delete Reply Button -->
            <button
              v-if="(reply.userId === userId || isAdmin) && isLoggedIn"
              class="button my-1"
              @click="deleteReply(Number(reply.id))"
            >
              Delete Reply
            </button>
          </div>
        </div>

        <!-- Toggle Reply Textarea -->
        <button v-if="isLoggedIn" class="button my-1" @click="toggleReply(review.id!)">
          <i class="fas fa-reply"></i>
        </button>

        <!-- Conditional Reply Form -->
        <div v-if="replyingTo === review.id">
          <textarea
            v-model="newReplyText"
            class="textarea my-2"
            placeholder="Add a reply..."
          ></textarea>
          <button class="button is-info my-1" @click="submitReply(review.id)">Submit Reply</button>
        </div>

        <!-- Delete Review -->
        <button
          v-if="(review.userId === userId || isAdmin) && isLoggedIn"
          class="button my-1"
          @click="deleteReview(Number(review.id))"
        >
          <i class="fas fa-trash"></i>
        </button>

        <button
          v-if="(review.userId === userId || isAdmin) && isLoggedIn"
          class="button my-1"
          @click="startEditingReview(review.id!, review.text)"
        >
          <i class="fas fa-pen-fancy"></i>
        </button>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': isModalActive }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <img :src="modalImage!" alt="Review" class="image" />
      </div>
      <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
    </div>
  </section>
</template>

<style scoped>
.user-profile-picture-review {
  height: 50px;
  width: 50px;
  border-radius: 20px;
  margin-right: 0.5rem;
  object-fit: cover;
  overflow: hidden;
}
.user-profile-picture-reply {
  height: 50px;
  width: 50px;
  border-radius: 20px;
  margin-right: 0.5rem;
  object-fit: cover;
  overflow: hidden;
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
.review-header {
  display: flex;
  align-items: center;
}
.reply-header {
  display: flex;
  align-items: center;
  background-color: var(--secondary-background);
  border-radius: 10px;
}
.reply-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.review-item {
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  min-height: 195px;
}
.review-image {
  width: 9rem;
  height: 9rem;
  float: right;
  object-fit: cover;
  border-radius: 10px;
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
.review-image:hover {
  opacity: 80%;
}

.review-date i {
  margin-right: 5px;
}

.button {
  background-color: var(--highlights-background);
  padding-left: 11px;
  padding-right: 11px;
}

.reply-title {
  color: rgba(104, 104, 104, 0.575);
}

p {
  padding: 3px;
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

.error-glow {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
  transition:
    box-shadow 0.2s ease,
    border 0.3s ease;
}

.modal .modal-content img {
  max-height: 80vh;
  object-fit: fit;
}
</style>
