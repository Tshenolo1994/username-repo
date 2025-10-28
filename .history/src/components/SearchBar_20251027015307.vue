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
        placeholder="Search GitHub username…"
        class="search__input"
        required
      />
      <button type="submit" class="search__btn">Search</button>
    </form>
    <p v-if="validationError" class="search__error">{{ validationError }}</p>
  </div>
</template>

<style scoped>
/* Center the bar and let it breathe horizontally */
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;            /* prevents edge clipping on tiny screens */
  margin: 2rem 0;
}

/* SUPER WIDE: span up to 1280px, no wrap so input can't shrink */
.search__form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: min(100%, 1280px);   /* ← wider overall */
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.25rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.18);
  flex-wrap: nowrap;          /* ← do not wrap (prevents input squeeze) */
}


.search__input {
  flex: 999 1 0;              /* ← huge grow, zero basis */
  min-width: 0;               /* ← allow flexbox to stretch fully */
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1rem;
  padding: 0.9rem 1.1rem;
  border-radius: 0.6rem;
  outline: none;
}
.search__input::placeholder { color: var(--muted); }
.search__input:focus { box-shadow: inset 0 0 0 1px var(--border); }

/* KEEP BUTTON COMPACT */
.search__btn {
  flex: 0 0 auto;             /* ← never grow, never shrink */
  min-width: 140px;           /* ← fixed feel; adjust if you want smaller */
  background: var(--button-accent);
  color: #fff;
  padding: 0.9rem 1.25rem;
  font-weight: 700;
  border-radius: 0.6rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: filter .15s ease;
}
.search__btn:hover { filter: brightness(0.95); }


.search__error {
  color: var(--error-text);
  background: var(--error-bg);
  padding: 0.55rem 0.8rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  margin-top: 0.6rem;
  width: min(100%, 1280px);
  text-align: center;
}

@media (max-width: 640px) {
  .search__form { flex-direction: column; align-items: stretch; padding: 0.5rem; }
  .search__btn { width: 100%; min-width: 0; }
}
</style>
