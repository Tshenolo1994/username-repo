<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommitDetailsStore } from "@/stores/useCommitDetailsStore";
import { ArrowLeft, FileCode, ExternalLink } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const store = useCommitDetailsStore();

const username = computed(() => route.params.username as string);
const repo = computed(() => route.params.repo as string);
const sha = computed(() => route.params.sha as string);

onMounted(() => {
  if (username.value && repo.value && sha.value) {
    store.fetchCommitDetails(username.value, repo.value, sha.value);
  }
});

const details = computed(() => store.details);
const status = computed(() => store.detailsStatus);
const error = computed(() => store.detailsError);

function goBack() {
  router.back();
}

function viewOnGithub() {
  if (details.value?.html_url) {
    window.open(details.value.html_url, "_blank");
  }
}
</script>

<template>
  <div class="commit-details">
    <button class="-btn" @click="goBack">
      <ArrowLeft :size="18" /> Back
    </button>

    <div v-if="status === 'loading'" class="status">Loading commit details…</div>
    <div v-else-if="status === 'error'" class="status error">{{ error }}</div>
    <div v-else-if="!details" class="status">No commit details found.</div>

    <div v-else class="details-card glass">
      <h1 class="commit-title">{{ details.commit.message }}</h1>

      <div class="meta">
        <p><strong>Author:</strong> {{ details.commit.author.name }}</p>
        <p><strong>Date:</strong> {{ new Date(details.commit.author.date).toLocaleString() }}</p>
        <p><strong>SHA:</strong> {{ details.sha }}</p>
      </div>

      <div v-if="details.stats" class="stats">
        <span>+{{ details.stats.additions }} additions</span>
        <span>-{{ details.stats.deletions }} deletions</span>
        <span>{{ details.stats.total }} total changes</span>
      </div>

      <button class="btn" @click="viewOnGithub">
        View on GitHub
        <ExternalLink :size="16" class="icon" />
      </button>

      <div v-if="details.files?.length" class="files-section">
        <h2>Changed Files</h2>
        <div
          v-for="file in details.files"
          :key="file.filename"
          class="file-card glass"
        >
          <div class="file-header">
            <FileCode :size="18" />
            <span class="file-name">{{ file.filename }}</span>
            <span class="status-tag" :class="file.status">{{ file.status }}</span>
          </div>

          <p class="file-changes">
            +{{ file.additions }} / -{{ file.deletions }} ({{ file.changes }} changes)
          </p>

          <pre v-if="file.patch" class="file-patch">{{ file.patch }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commit-details {
  padding: 3rem 2rem;
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

.details-card {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.commit-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.meta {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-weight: 600;
  color: #3fb950;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  background: var(--button-accent);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease;
}

.btn:hover {
  background: #2ea043;
}

.icon {
  flex-shrink: 0;
}

.files-section {
  margin-top: 2rem;
}

.files-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.file-card {
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.file-card:hover {
  transform: translateY(-2px);
}

.file-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text);
}

.file-name {
  flex: 1;
  overflow-wrap: anywhere;
}

.status-tag {
  padding: 0.25rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  text-transform: capitalize;
  font-weight: 600;
}

.status-tag.added {
  background: rgba(63, 185, 80, 0.2);
  color: #3fb950;
}

.status-tag.modified {
  background: rgba(201, 178, 0, 0.2);
  color: #e3b341;
}

.status-tag.removed {
  background: rgba(248, 81, 73, 0.2);
  color: #f85149;
}

.file-changes {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.file-patch {
  background: var(--bg-elev);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.85rem;
  color: var(--text);
  border: 1px solid var(--border);
}

.status {
  text-align: center;
  color: var(--muted);
  margin-top: 2rem;
}

.status.error {
  color: var(--error-text);
}
</style>