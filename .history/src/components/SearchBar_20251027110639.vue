<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref("")
const error = ref("")

function onSubmit() {
  error.value = ""
  const u = username.value.trim()
  if (!u) { error.value = "Please enter a username"; return }
  if (!/^[a-zA-Z0-9-]+$/.test(u)) {
    error.value = "Username can only contain letters, numbers, and hyphens"
    return
  }
  router.push({ name: "repos", params: { username: u } })
  username.value = ""    // optional reset
}
</script>

<template>
  <div class="search">
    <form class="search__form" @submit.prevent="onSubmit" role="search" aria-label="GitHub username">
      <input
        v-model="username"
        class="search__input"
        placeholder="e.g. octocat"
        autocomplete="off"
        spellcheck="false"
        aria-invalid="false"
      />
      <button type="submit" class="search__btn">View Repos</button>
    </form>
    <p v-if="error" class="search__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.search { width: 100%; display:flex; justify-content:center; padding:0 1rem; margin:2rem 0; }
.search__form {
  display:flex; align-items:center; gap:.5rem; width:min(100%, 720px);
  background: var(--bg-elev); border:1px solid var(--border);
  border-radius:.75rem; padding:.35rem; box-shadow:0 2px 10px rgba(0,0,0,.18);
}
.search__input {
  flex:1; min-width:0; background:transparent; border:none; color:var(--text);
  font-size:1rem; padding:.9rem 1rem; border-radius:.6rem; outline:none;
}
.search__input::placeholder { color: var(--muted); }
.search__input:focus { box-shadow: inset 0 0 0 1px var(--border); }
.search__btn {
  flex:0 0 auto; min-width:140px; background: var(--button-accent);
  color:#fff; padding:.9rem 1.1rem; font-weight:700; border-radius:.6rem;
  font-size:1rem; border:none; cursor:pointer; transition:filter .15s ease;
}
.search__btn:hover { filter: brightness(.95); }
.search__error {
  color: var(--error-text); background: var(--error-bg);
  padding:.55rem .8rem; border-radius:.6rem; font-size:.9rem; margin-top:.6rem;
  width:min(100%, 720px); text-align:center;
}
@media (max-width:640px){
  .search__form { flex-direction:column; align-items:stretch; padding:.5rem; }
  .search__btn { width:100%; min-width:0; }
}
</style>
