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
    <form @submit.prevent="searchUser" :class="['search__form', { 'search__form--error': validationError }]">
      <input
        v-model="username"
        placeholder="Search GitHub username..."
        class="search__input"
        required
        aria-label="Search GitHub username"
      />
      <div class="search__actions">
        <button v-if="username" type="button" class="search__clear" @click="username = ''" aria-label="Clear search">
          ✕
        </button>
        <button type="submit" class="search__btn">Search</button>
      </div>
    </form>

    <p v-if="validationError" class="search__error">{{ validationError }}</p>
  </div>
</template>

<style scoped>
/* container centers the extra-wide bar */
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.25rem 0 0.5rem;
}

/* big, wide, elevated */
.search__form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 1100px; /* ← wide desktop */
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search__form--error {
  border-color: var(--error-text);
}

.search__input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.05rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  outline: none;
}

.search__input::placeholder {
  color: var(--muted);
}

.search__input:focus {
  box-shadow: inset 0 0 0 1px var(--border);
}

/* buttons */
.search__actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search__clear {
  background: var(--button-bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 0.95rem;
  cursor: pointer;
  font-size: 0.95rem;
}

.search__clear:hover {
  filter: brightness(1.1);
}

.search__btn {
  background: var(--button-accent);
  color: #fff;
  border-radius: 8px;
  padding: 0.85rem 1.6rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.2s ease;
}

.search__btn:hover {
  filter: brightness(0.95);
}

/* error helper */
.search__error {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 0.6rem;
  width: 100%;
  max-width: 1100px;
}

/* responsive: stack nicely on small screens */
@media (max-width: 640px) {
  .search__form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
    max-width: 100%;
    padding: 0.8rem 0.9rem;
  }

  .search__actions {
    width: 100%;
  }

  .search__btn,
  .search__clear {
    width: 100%;
  }
}

/* reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  .search__form,
  .search__btn,
  .search__clear {
    transition: none;
  }
}
</style>
