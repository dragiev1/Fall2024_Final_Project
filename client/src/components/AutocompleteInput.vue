<script setup lang="ts">
import { ref, watch } from 'vue'
import { getAllUsersBySearch, type User } from '@/models/user'
import type { OptionsPropItem } from '@oruga-ui/oruga-next'

const searchTerm = ref('')
const options = ref<OptionsPropItem<User>[]>([])
const selected = ref<'' | null>(null)

watch(searchTerm, (newSearch) => {
  if (newSearch.length > 0) {
    fetchUsers(newSearch) // Call fetchUsers when searchTerm changes
  } else {
    options.value = [] // Clear options if searchTerm is empty
  }
})

async function fetchUsers(query: string) {
  const { data } = await getAllUsersBySearch(query)

  // Map the data to the correct format for the autocomplete component
  options.value = data.map((user: User) => {
    return {
      label: user.name, // Set label to the name of the user
      value: user // Set the full user object as the value
    }
  })
}
</script>
<template>
  <section>
    <o-field label="Search for a user!">
      <o-autocomplete
        v-model="selected"
        :options="options"
        @input="fetchUsers"
        rounded
        expanded
        placeholder="e.g. John Smith"
        icon="search"
        clearable
        open-on-focus
      >
        <template #empty>No results found</template>
      </o-autocomplete>
    </o-field>

    <p><b>Selected:</b> {{ selected }}</p>
  </section>
</template>

<style scoped></style>
