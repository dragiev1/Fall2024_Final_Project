<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-reply'])
const showReplyBox = ref(false)
const replyText = ref('')

const addReply = () => {
  if (replyText.value.trim() !== '') {
    emit('add-reply', {
      text: replyText.value,
      author: 'Current User',
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
            <strong>{{ comment.author }}</strong> <small>{{ comment.time }}</small> <br />
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
          <textarea v-model="replyText" placeholder="Write a reply..." class="textarea"></textarea>
          <button class="button is-small mt-2" @click="addReply"><i class="fas fa-paper-plane"></i></button>
        </div>

        <div v-if="comment.replies.length > 0">
            <h5 class="title is-6 mt-4">Replies:</h5>
            <div v-for="reply in comment.replies" :key="reply.id" class="box ml-4">
                <strong>{{ reply.author }}</strong> <small>{{ reply.time }}</small>
                <p>{{ reply.text }}</p>
            </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped></style>
