<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const validationError = ref('');

const searchUser = () => {
  validationError.value = '';
  
  if (!username.value.trim()) {
    validationError.value = 'Please enter a username';
    return;
  }

  // Validate GitHub username format
  const usernamePattern = /^[a-zA-Z0-9-]+$/;
  if (!usernamePattern.test(username.value)) {
    validationError.value = 'Username can only contain letters, numbers, and hyphens';
    return;
  }

  const user = username.value.trim();
  
  // Just navigate - the RepoView page will fetch using Pinia
  router.push(`/repos/${user}`);
  username.value = '';
};
</script>

<template>
  <div class="search-container">
    <form @submit.prevent="searchUser" class="search-form">
      <input
        v-model="username"
        placeholder="Search username..."
        class="search-input"
        :class="{ 'has-error': validationError }"
        required
      />
      <button type="submit" class="search-btn">
        Search
      </button>
    </form>
    <p v-if="validationError" class="error-message">{{ validationError }}</p>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--button-bg);
  color: var(--text);
  border: 1px solid var(--border);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--link);
}

.search-input.has-error {
  border-color: var(--error-text);
}

.search-input::placeholder {
  color: var(--muted);
}

.search-btn {
  background: var(--button-accent);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  white-space: nowrap;
}

.search-btn:hover {
  background: #2ea043;
}

.error-message {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
</style>