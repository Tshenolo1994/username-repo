<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCommitStore } from "@/stores/useCommitStore"
import Pagination from "@/components/Pagination.vue"

const route = useRoute()
const router = useRouter()
const store = useCommitStore()

const username = computed(() => route.params.username as string)
const repo = computed(() => route.params.repo as string)

onMounted(() => {
  if (username.value && repo.value) {
    store.fetchCommits(username.value, repo.value)
  }
})

const commits = computed(() => store.commits)
const isLoading = computed(() => store.commitStatus === "loading")
const isError = computed(() => store.commitStatus === "error")
const errorMsg = computed(() => store.commitError)

function goToCommit(sha: string) {
  router.push(`/repos/${username.value}/${repo.value}/${sha}`)
}
</script>

<template>
  <div class="commit-view">
    <h1 class="title">
      Commits for <span class="highlight">{{ repo }}</span>
    </h1>

    <div v-if="isLoading" class="status">Loading commits…</div>
    <div v-else-if="isError" class="status error">{{ errorMsg }}</div>
    <div v-else-if="!commits.length" class="status">No commits found.</div>

    <div v-else class="commit-list">
      <div
        v-for="commit in commits"
        :key="commit.sha"
        class="commit-card glass"
        @click="goToCommit(commit.sha)"
      >
        <div class="commit-main">
          <h3 class="commit-message">{{ commit.commit.message }}</h3>
          <p class="commit-meta">
            Author: {{ commit.commit.author.name }} •
            {{ new Date(commit.commit.author.date).toLocaleString() }}
          </p>
        </div>
        <div class="commit-sha">
          <a>{{ commit.sha.substring(0, 7) }}</a>
        </div>
      </div>
    </div>

    <Pagination v-if="commits.length" />
  </div>
</template>

<style scoped>
.commit-view {
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text);
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.highlight {
  color: var(--link);
}

.status {
  text-align: center;
  color: var(--muted);
}

.status.error {
  color: var(--error-text);
}

.commit-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.commit-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.commit-card:hover {
  transform: translateY(-2px);
  border-color: var(--link);
  background: rgba(255, 255, 255, 0.07);
}

.commit-message {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.commit-meta {
  font-size: 0.85rem;
  color: var(--muted);
}

.commit-sha a {
  color: var(--link);
  font-weight: 600;
  font-size: 0.9rem;
}
</style>