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

  const usernamePattern = /^[a-zA-Z0-9-]+$/;
  if (!usernamePattern.test(username.value)) {
    validationError.value = 'Username can only contain letters, numbers, and hyphens';
    return;
  }

  const user = username.value.trim();
  router.push(`/repos/${user}`);
  username.value = '';
};
</script>

<template>
  <div class="search-container">
    <form @submit.prevent="searchUser" class="search-form">
      <input
        v-model="username"
        placeholder="Search GitHub username..."
        class="search-input"
        :class="{ 'has-error': validationError }"
        required
      />
      <button type="submit" class="search-btn">Search</button>
    </form>
    <p v-if="validationError" class="error-message">{{ validationError }}</p>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  max-width: 550px;
  margin: 2rem auto;
  text-align: center;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: var(--muted);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.1);
}

.search-input.has-error {
  border: 1px solid var(--error-text);
}

.search-btn {
  background: var(--button-accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-btn:hover {
  background: #2ea043;
}

.error-message {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 0.75rem;
}
</style>
