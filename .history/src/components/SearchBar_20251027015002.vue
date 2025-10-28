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
  <div class="search">
    <form @submit.prevent="searchUser" class="search__form">
      <input
        v-model="username"
        placeholder="Search GitHub username..."
        class="search__input"
        :class="{ 'has-error': validationError }"
        required
      />
      <button type="submit" class="search__btn">Search</button>
    </form>
    <p v-if="validationError" class="search__error">{{ validationError }}</p>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

/* full-width bar centered */
.search__form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  flex-wrap: nowrap;
}

/* long input */
.search__input {
  flex: 1 1 auto;
  min-width: 0;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  outline: none;
}

.search__input::placeholder {
  color: var(--muted);
}

.search__input:focus {
  outline: none;
  box-shadow: none;
}

/* green button fixed width */
.search__btn {
  background: var(--button-accent);
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.search__btn:hover {
  background: #2ea043;
}

/* error styling */
.search__error {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

/* wider on desktop */
@media (min-width: 768px) {
  .search__form {
    max-width: 1100px;
  }
}

/* responsive stacking on mobile */
@media (max-width: 640px) {
  .search__form {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem;
  }

  .search__btn {
    width: 100%;
  }
}
</style>
