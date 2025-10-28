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

/* Wide container, dark elevation */
.search__form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  padding: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

/* Make input dominate the width */
.search__input {
  flex: 1 1 100%;
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
  box-shadow: inset 0 0 0 1px var(--border);
}

/* Keep button compact on the right */
.search__btn {
  flex-shrink: 0;
  background: var(--button-accent);
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-left: 0.25rem;
  transition: background 0.2s ease;
}

.search__btn:hover {
  background: #2ea043;
}

/* wider on large screens */
@media (min-width: 1024px) {
  .search__form {
    max-width: 1100px;
  }
}

/* Mobile stacking for smaller screens */
@media (max-width: 640px) {
  .search__form {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem;
  }

  .search__btn {
    width: 100%;
    margin-left: 0;
  }
}

/* Error state */
.search__error {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
