<script setup lang="ts">
import { ref } from 'vue'

// Define the types for the comment and reply
interface Reply {
  text: string
  author: string
  time: string
}

interface Comment {
  id: number
  text: string
  author: string
  time: string
  replies: Reply[]
  image?: string
}

const props = defineProps<{
  comment: Comment
}>()

const emit = defineEmits<(e: 'add-reply', reply: Reply) => void>()
const isImageModalOpen = ref(false)
const showReplyBox = ref<boolean>(false)
const replyText = ref<string>('')

// Function to add a reply
const addReply = (): void => {
  if (replyText.value.trim() !== '') {
    emit('add-reply', {
      text: replyText.value,
      author: 'Current User', // Change based on actual user
      time: new Date().toLocaleString()
    })
    replyText.value = ''
    showReplyBox.value = false
  }
}
</script>

<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.author }}</strong> <small>{{ comment.time }}</small>
            <br />
            {{ comment.text }}
          </p>
        </div>

        <!-- Image preview -->
        <div v-if="comment.image" class="box mt-2">
          <p><strong>Attached Image:</strong></p>
          <img
            :src="comment.image"
            alt="Image Preview"
            class="image-preview is-clickable"
            @click="isImageModalOpen = true"
          />
        </div>

        <!-- Image Modal Pop-Up -->
        <div class="modal" :class="{ 'is-active': isImageModalOpen }">
          <div class="modal-background" @click="isImageModalOpen = false"></div>
          <div class="modal-content">
            <img :src="comment.image" alt="Full Image Preview" class="full-image" />
          </div>
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="isImageModalOpen = false"
          ></button>
        </div>

        <div class="field">
          <p class="control">
            <button @click="showReplyBox = !showReplyBox" class="button is-small is-light">
              Reply
            </button>
          </p>
        </div>

        <div v-if="showReplyBox" class="box">
          <textarea v-model="replyText" class="textarea" placeholder="Write a reply..."></textarea>
          <button class="button is-small mt-1 is-light" @click="addReply">Submit Reply</button>
        </div>

        <div v-if="comment.replies.length > 0">
          <h5 class="title is-6">Replies:</h5>
          <div v-for="reply in comment.replies" :key="reply.id" class="box accent">
            <strong>{{ reply.author }}</strong> <small>{{ reply.time }}</small>
            <p>{{ reply.text }}</p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
strong {
  color: var(--highlights-background) !important;
}
.accent {
  background-color: var(--accent-background);
}
.box {
  margin-top: 0 !important;
}
.image-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
}

/* Styling for inputs */
.input,
.textarea {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.textarea:focus {
  border-color: var(--accent-background) !important;
  box-shadow: 4px 4px 4px var(--accent-background);
}
.input:focus ~ .icon i {
  color: var(--accent-background);
}
</style>
