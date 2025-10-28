<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRepoStore } from '@/store/useRepoStore'

const route = useRoute()
const store = useRepoStore()
const username = computed(() => route.params.username as string)

onMounted(() => {
  if (username.value) {
    store.fetchRepos(username.value)
  }
})

const repos = computed(() => store.repos)
</script>

<template>
  <div class="repo-view">
    <h1 class="title">Repositories of {{ username }}</h1>

    <div v-if="store.repoStatus === 'loading'" class="status">Loading repositories…</div>
    <div v-else-if="store.repoStatus === 'error'" class="status error">{{ store.repoError }}</div>
    <div v-else-if="!repos.length" class="status">No repositories found.</div>

    <div class="repo-grid" v-else>
      <div v-for="repo in repos" :key="repo.id" class="card glass">
        <h3 class="repo-name">{{ repo.name }}</h3>
        <p class="repo-desc">{{ repo.description || 'No description' }}</p>
        <div class="repo-meta">
          <span>{{ repo.language || 'Unknown' }}</span>
          <span>⭐ {{ repo.stargazers_count }}</span>
        </div>
      </div>
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
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.repo-desc {
  color: var(--muted);
  font-size: 0.9rem;
}

.repo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.75rem;
}

.status {
  text-align: center;
  font-size: 1rem;
  color: var(--muted);
}

.status.error {
  color: var(--error-text);
}
</style>