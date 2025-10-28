<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommitStore } from "@/stores/useCommitStore";
import { ArrowLeft, FileCode, ExternalLink } from "lucide-vue-next";
const route = useRoute();
const router = useRouter();
const store = useCommitStore();

const username = computed(() => route.params.username as string);
const repo = computed(() => route.params.repo as string);

onMounted(() => {
  if (username.value && repo.value) {
    store.resetPaging();
    store.fetchCommits(username.value, repo.value);
  }
});

watch([username, repo], ([u, r]) => {
  if (u && r) {
    store.resetPaging();
    store.fetchCommits(u, r);
  }
});

const commits = computed(() => store.sorted);
const isLoading = computed(() => store.commitStatus === "loading");
const isError = computed(() => store.commitStatus === "error");

function openCommit(sha: string) {
  router.push(`/repos/${username.value}/${repo.value}/${sha}`);
}

function next() {
  store.nextPage(username.value, repo.value);
}
function prev() {
  store.prevPage(username.value, repo.value);
}
function goBack() {
  router.back();
}

</script>

<template>
  <div class="commit-view">
    <button class="back-btn" @click="goBack">
      <ArrowLeft :size="18" /> Back
    </button>
    <header class="heading">
      <h1 class="title">
        Commits for <span class="highlight">{{ repo }}</span>
      </h1>

      <div class="toolbar">
        <label class="sort">
          <span>Sort</span>
          <select v-model="store.sort" class="select" aria-label="Sort commits">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
    </header>

    <div v-if="isLoading" class="status">Loading commits…</div>
    <div v-else-if="isError" class="status error">{{ store.commitError }}</div>
    <div v-else-if="!commits.length" class="status">No commits found.</div>

    <div v-else class="commit-list">
      <article
        v-for="c in commits"
        :key="c.sha"
        class="commit-card glass"
        @click="openCommit(c.sha)"
      >
        <div class="left">
          <h3 class="message">{{ c.commit.message }}</h3>
          <p class="meta">
            Author: {{ c.commit.author.name }} •
            {{ new Date(c.commit.author.date).toLocaleString() }}
          </p>
        </div>

        <div class="right">
          <span class="sha">{{ c.sha.slice(0, 7) }}</span>
        </div>
      </article>

      <div class="pager">
        <button
          class="btn"
          :disabled="!store.hasPrev || isLoading"
          @click.stop.prevent="prev"
        >
          ← Prev
        </button>

        <span class="page-indicator">Page {{ store.page }}</span>

        <button
          class="btn"
          :disabled="!store.hasNext || isLoading"
          @click.stop.prevent="next"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commit-view {
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text);
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--link);
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 0.8;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
}

.highlight {
  color: var(--link);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.select {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.status {
  text-align: center;
  color: var(--muted);
  padding: 2rem 0;
}
.status.error {
  color: var(--error-text);
}

.commit-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.commit-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border-radius: 12px;

  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px) saturate(160%);
  transition: all 0.2s ease;
  cursor: pointer;
}

.commit-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.07);
}

.left {
  min-width: 0;
}

.message {
  margin: 0 0 0.35rem 0;
  font-weight: 650;
  color: var(--text);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  margin: 0;
  color: var(--muted);
  font-size: 0.86rem;
}

.right {
  flex: 0 0 auto;
}

.sha {
  color: var(--link);
  font-weight: 700;
  font-size: 0.95rem;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn:hover:not(:disabled) {
  background: var(--border);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.page-indicator {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.92rem;
}
</style>
