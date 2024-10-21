<script setup>
import { ref } from 'vue'
import Comments from '@/components/Comments.vue'

// Sample data for initial comments
const comments = ref([
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

const newCommentText = ref('')

// Add a new comment
const addComment = () => {
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
const handleAddReply = (commentId) => (reply) => {
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
</script>

<template>
  <section class="section py-6">
    <div class="container">
      <h1 class="title">Comments</h1>

      <!-- New Comment Input -->
      <div class="box">
        <textarea
          v-model="newCommentText"
          class="textarea"
          placeholder="Add a comment..."
        ></textarea>
        <button class="button is-info mt-2" @click="addComment">Submit Comment</button>
      </div>

      <!-- Comment List -->
      <div v-for="comment in comments" :key="comment.id" class="comment-section">
        <Comment :comment="comment" @add-reply="handleAddReply(comment.id)" />
      </div>
    </div>
  </section>
</template>

<style scoped>
body {
  height: 100vh;
}
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
</style>
