<script setup lang="ts">
import { onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRepoStore } from "@/stores/useRepoStore"   =
import Pagination from "@/components/Pagination.vue"
import { Star } from "lucide-vue-next"
const route = useRoute();
const router = useRouter();
const store = useRepoStore();

const username = computed(() => route.params.username as string);

onMounted(() => {
  if (username.value) {
    store.resetPaging();
    store.fetchRepos(username.value, 1);
  }
});

watch(
  () => route.params.username,
  (u) => {
    if (typeof u === "string" && u) {
      store.resetPaging();
      store.fetchRepos(u, 1);
    }
  }
);

const repos = computed(() => store.repos);
</script>

<template>
  <div class="repo-view">
    <h1 class="title">Repositories of {{ username }}</h1>

    <div v-if="store.repoStatus === 'loading'" class="status">
      Loading repositories…
    </div>
    <div v-else-if="store.repoStatus === 'error'" class="status error">
      {{ store.repoError }}
    </div>
    <div v-else-if="!repos.length" class="status">No repositories found.</div>

    <div class="repo-grid" v-else>
      <article
        v-for="repo in repos"
        :key="repo.id"
        class="card glass repo-card"
      >
        <header class="repo-header">
          <h3 class="repo-name">{{ repo.name }}</h3>
          <span class="star-count">
            <Star :size="15" />
            {{ repo.stargazers_count }}
          </span>
        </header>

        <p class="repo-desc">{{ repo.description || "No description" }}</p>

        <footer class="repo-meta">
          <span class="lang">{{ repo.language || "Unknown" }}</span>
          <router-link
            class="btn"
            :to="{ name: 'commits', params: { username, repo: repo.name } }"
          >
            View commits →
          </router-link>
        </footer>
      </article>
    </div>

    <Pagination
      v-if="store.repoStatus === 'success'"
      :page="store.page"
      :hasNext="store.hasNext"
      :hasPrev="store.hasPrev"
      :loading="store.repoStatus === 'loading'"
      @next="store.nextPage(username)"
      @prev="store.prevPage(username)"
    />
  </div>
</template>

<style scoped>
.star-count {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #f5c518;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .star-count {
    gap: 0.5rem;
    font-size: 1.125rem;
  }
}
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
.repo-card {
  display: grid;
  gap: 0.6rem;
}
.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
}
.repo-name {
  margin: 0;
  font-weight: 700;
}
.stars {
  color: var(--muted);
  font-size: 0.9rem;
}
.repo-desc {
  color: var(--muted);
  font-size: 0.95rem;
  min-height: 2.2rem;
}
.repo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.lang {
  color: var(--muted);
  font-size: 0.9rem;
}
.btn {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.45rem 0.7rem;
  border-radius: 0.5rem;
  text-decoration: none;
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
