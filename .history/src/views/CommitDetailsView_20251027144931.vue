<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useCommitDetailsStore } from "@/stores/useCommitDetailsStore"
import { Heart } from "lucide-vue-next"

const route = useRoute()
const store = useCommitDetailsStore()

const username = computed(() => route.params.username as string)
const repo = computed(() => route.params.repo as string)
const sha = computed(() => route.params.sha as string)

onMounted(() => {
  if (username.value && repo.value && sha.value) {
    store.fetchCommitDetails(username.value, repo.value, sha.value)
  }
})

const details = computed(() => store.details)
const isLoading = computed(() => store.detailsStatus === "loading")
const isError = computed(() => store.detailsStatus === "error")
const errorMsg = computed(() => store.detailsError)

function toggleFavourite() {
  if (!details.value) return
  const existing = store.favourites.find(f => f.sha === details.value?.sha)
  if (existing) {
    store.removeFavourite(details.value.sha)
  } else {
    store.addFavourite({
      sha: details.value.sha,
      repoFullName: `${username.value}/${repo.value}`,
      message: details.value.commit.message,
      authorName: details.value.commit.author.name,
      date: details.value.commit.author.date,
    })
  }
}

function isFavourite() {
  return !!store.favourites.find(f => f.sha === details.value?.sha)
}
</script>

<template>
  <div class="commit-details">
    <div v-if="isLoading" class="status">Loading commit details…</div>
    <div v-else-if="isError" class="status error">{{ errorMsg }}</div>
    <div v-else-if="!details" class="status">No commit details found.</div>

    <div v-else class="details-card glass">
      <div class="commit-header">
        <h2 class="commit-message">{{ details.commit.message }}</h2>
        <button
          class="fave-btn"
          :class="{ active: isFavourite() }"
          @click="toggleFavourite"
        >
          <Heart :size="20" />
          <span>{{ isFavourite() ? "Remove Favourite" : "Add Favourite" }}</span>
        </button>
      </div>

      <div class="commit-meta">
        <p><strong>Author:</strong> {{ details.commit.author.name }}</p>
        <p><strong>Date:</strong> {{ new Date(details.commit.author.date).toLocaleString() }}</p>
        <p><a :href="details.html_url" target="_blank">View on GitHub ↗️</a></p>
      </div>

      <div v-if="details.stats" class="commit-stats">
        <h3>Stats</h3>
        <p>
          <strong>Additions:</strong> {{ details.stats.additions }},
          <strong>Deletions:</strong> {{ details.stats.deletions }},
          <strong>Total Changes:</strong> {{ details.stats.total }}
        </p>
      </div>

      <div v-if="details.files?.length" class="commit-files">
        <h3>Files Changed ({{ details.files.length }})</h3>
        <ul>
          <li
            v-for="file in details.files"
            :key="file.filename"
            class="file-item"
          >
            <div class="file-name">
              <span class="status-badge" :class="file.status">
                {{ file.status }}
              </span>
              {{ file.filename }}
            </div>
            <small class="file-changes">
              +{{ file.additions }} / -{{ file.deletions }}
            </small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commit-details {
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text);
}

.status {
  text-align: center;
  color: var(--muted);
}

.status.error {
  color: var(--error-text);
}

.details-card {
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.commit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.commit-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--link);
  word-break: break-word;
}

.fave-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background: var(--bg-elev);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.fave-btn:hover {
  background: var(--border);
}

.fave-btn.active {
  color: #a78bfa;
}

.commit-meta p {
  margin: 0.25rem 0;
  color: var(--muted);
}

.commit-stats {
  margin-top: 1.5rem;
  background: var(--bg-elev);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.commit-files {
  margin-top: 1.5rem;
}

.commit-files ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.file-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
}

.status-badge {
  text-transform: capitalize;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.added {
  background: rgba(63, 185, 80, 0.15);
  color: #3fb950;
}

.status-badge.modified {
  background: rgba(255, 200, 0, 0.15);
  color: #e3b341;
}

.status-badge.removed {
  background: rgba(255, 99, 99, 0.15);
  color: #ff7b72;
}

.file-changes {
  font-size: 0.8rem;
  color: var(--muted);
}
</style>