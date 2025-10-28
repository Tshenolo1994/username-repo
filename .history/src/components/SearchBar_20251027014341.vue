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
  paddin
