<!-- <template>
    <section class="hero">
      <div class="glow" aria-hidden="true"></div>
  
      <h1 class="title">
        Explore <span class="accent">GitHub</span> Repositories
      </h1>
      <p class="sub">Search a username to browse repos, commits and diffs.</p>
  
      <form class="search" @submit.prevent="submit">
        <input
          v-model.trim="username"
          class="input"
          placeholder="e.g. octocat"
          :aria-invalid="!!err"
        />
        <button class="btn" type="submit">Search</button>
      </form>
  
      <small v-if="err" class="err">{{ err }}</small>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const emit = defineEmits<{ (e: 'submit', username: string): void }>()
  const username = ref(''); const err = ref('')
  
  function submit() {
    err.value = ''
    if (!username.value) return (err.value = 'Username is required')
    if (!/^[A-Za-z0-9-]{1,39}$/.test(username.value))
      return (err.value = 'Invalid GitHub username')
    emit('submit', username.value)
  }
  </script>
  
  <style scoped>
  .hero {
    position: relative;
    display: grid;
    gap: 1rem;
    justify-items: center;
    text-align: center;
    padding: 6rem 1rem 3rem;
    background: var(--bg);
    border-radius: 1rem;
  }
  .glow {
    position: absolute;
    inset: -12% -12% auto -12%;
    height: 300px;
    background: radial-gradient(1200px 320px at 50% 25%, rgba(124,58,237,.28), transparent 55%);
    filter: blur(8px);
    pointer-events: none;
  }
  .title {
    margin: 0;
    font-weight: 800;
    font-size: clamp(2rem,5vw,3rem);
    color: var(--text);
  }
  .accent {
    background: linear-gradient(90deg, #a78bfa, #7c3aed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .sub { color: var(--muted); max-width: 60ch; }
  .search {
    display: flex; gap: .6rem;
    width: min(720px,100%);
    margin-top: .5rem;
  }
  .input {
    flex: 1;
    padding: 1rem 1.1rem;
    border-radius: .75rem;
    border: 1px solid var(--border);
    background: var(--bg-elev);
    color: var(--text);
  }
  .btn {
    padding: 1rem 1.2rem;
    border-radius: .75rem;
    border: 1px solid var(--border);
    background: var(--link);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
  .err { color: #ef4444; }
  </style>
   -->