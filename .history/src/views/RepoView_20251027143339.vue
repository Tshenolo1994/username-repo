<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRepoStore } from '@/store/useRepoStore'

const route = useRoute()
const router = useRouter()
const store = useRepoStore()

const username = computed(() => route.params.username as string)

onMounted(() => {
  if (username.value) store.fetchRepos(username.value)
})

const repos = computed(() => store.repos)

function openCommits(repoName: string) {
  router.push({ name: 'commits', params: { username: username.value, repo: repoName } })
}
</script>

<template>
  <div class="repo-view">
    <h1 class="title">Repositories of {{ username }}</h1>

    <div v-if="store.repoStatus === 'loading'" class="status">Loading repositories…</div>
    <div v-else-if="store.repoStatus === 'error'" class="status error">{{ store.repoError }}</div>
    <div v-else-if="!repos.length" class="status">No repositories found.</div>

    <div class="repo-grid" v-else>
      <article
        v-for="repo in repos"
        :key="repo.id"
        class="card glass repo-card"
      >
        <header class="repo-header">
          <h3 class="repo-name">{{ repo.name }}</h3>
          <span class="stars">⭐ {{ repo.stargazers_count }}</span>
        </header>

        <p class="repo-desc">{{ repo.description || 'No description' }}</p>

        <footer class="repo-meta">
          <span class="lang">{{ repo.language || 'Unknown' }}</span>

          <!-- 🔗 this triggers navigation to CommitView -->
          <router-link
            class="btn"
            :to="{ name: 'commits', params: { username, repo: repo.name } }"
          >
            View commits →
          </router-link>

          <!-- If you prefer programmatic navigation:
          <button class="btn" @click="openCommits(repo.name)">View commits →</button>
          -->
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
.repo-view {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text);
}
.title {
  font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;
}
.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.repo-card { display: grid; gap: .6rem; }
.repo-header { display: flex; justify-content: space-between; align-items: baseline; gap: .75rem; }
.repo-name { margin: 0; font-weight: 700; }
.stars { color: var(--muted); font-size: .9rem; }
.repo-desc { color: var(--muted); font-size: 0.95rem; min-height: 2.2rem; }
.repo-meta { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.lang { color: var(--muted); font-size: .9rem; }
.btn {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: .45rem .7rem;
  border-radius: .5rem;
  text-decoration: none;
}
.status { text-align: center; font-size: 1rem; color: var(--muted); }
.status.error { color: var(--error-text); }
</style>us