<script setup lang="ts">
import { computed, ref } from 'vue'
import Comments from '@/components/Comments.vue'

// Define the types for comments and replies
interface Reply {
  id: number
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
}

// Sample data for initial comments
const comments = ref<Comment[]>([
  {
    id: 1,
    text: 'This is the first comment!',
    author: 'Alice',
    time: new Date().toLocaleString(),
    replies: []
  },
  {
    id: 2,
    text: 'Another comment to demonstrate replies.',
    author: 'Bob',
    time: new Date().toLocaleString(),
    replies: []
  }
])

const newCommentText = ref<string>('')

// Add a new comment
const addComment = (): void => {
  if (newCommentText.value.trim() !== '') {
    comments.value.push({
      id: comments.value.length + 1,
      text: newCommentText.value,
      author: 'Current User', // Change based on actual user
      time: new Date().toLocaleString(),
      replies: []
    })
    newCommentText.value = ''
  }
}

// Handle adding replies to a specific comment
const handleAddReply = (commentId: number, reply: Reply): void => {
  console.log({
    commentId,
    reply
  })
  const comment = comments.value.find((c) => c.id === commentId)
  if (comment) {
    comment.replies.push({
      id: comment.replies.length + 1,
      text: reply.text,
      author: reply.author,
      time: reply.time
    })
  }
}

const reversedComments = computed(() => {
  return [...comments.value].reverse();
})
</script>

<template>
  <section class="section py-6">
    <div class="container">
      <h1 class="title has-text-centered">Reviews</h1>

      <!-- New Comment Input -->
      <div class="box">
        <textarea
          v-model="newCommentText"
          class="textarea"
          placeholder="Add a comment..."
        ></textarea>
        <button class="button is-info mt-2" @click="addComment">Submit Review</button>
      </div>

      <!-- Comment List -->
      <div v-for="comment in reversedComments" :key="comment.id" class="comment-section">
        <Comments :comment="comment" @add-reply="(reply) => handleAddReply(comment.id, reply)" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.button {
  background-color: var(--highlights-background);
}
.media {
  background-color: var(--highlights-background);
  border-radius: 10px;
  color: black;
  overflow: hidden;
}
.media-content,
p {
  background-color: var(--highlights-background);
  margin-right: 3rem;
  border-color: none;
  padding-top: 5rem;
  padding-bottom: 0.5rem;
}
section {
  margin-top: 3.5rem;
}
.comment-section {
  margin-bottom: 20px;
}
.title {
  font-style: italic;
  font-family: italic;
  font-size: 50px;
}
</style>
