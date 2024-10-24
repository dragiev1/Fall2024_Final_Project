<script setup lang="ts">
import { ref } from 'vue'

// Define the types for the comment and reply
interface Reply {
  text: string;
  author: string;
  time: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  time: string;
  replies: Reply[];
}

const props = defineProps<{
  comment: Comment;
}>()

const emit = defineEmits<(e: 'add-reply', reply: Reply) => void>()

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
  <body>
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
          <div class="field">
            <p class="control">
              <button @click="showReplyBox = !showReplyBox" class="button is-small is-light">
                Reply
              </button>
            </p>
          </div>

          <div v-if="showReplyBox" class="box">
            <textarea
              v-model="replyText"
              class="textarea"
              placeholder="Write a reply..."
            ></textarea>
            <button class="button is-small is-info mt-1" @click="addReply">Submit Reply</button>
          </div>

          <div v-if="comment.replies.length > 0">
            <h5 class="title is-6">Replies:</h5>
            <div v-for="reply in comment.replies" :key="reply.id" class="box">
              <strong>{{ reply.author }}</strong> <small>{{ reply.time }}</small>
              <p>{{ reply.text }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </body>
</template>

<style scoped>
strong {
  color: var(--highlights-background) !important;
}
.box {
  margin-top: 0 !important;
}
</style>
