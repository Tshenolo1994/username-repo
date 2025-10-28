<!-- src/views/CommitView.vue -->
<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommitStore } from "@/stores/useCommitStore";
import { useFavesStore } from "@/stores/useFavesStore";
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import FavouritesList from "@/components/FavouritesList.vue";
import { Star, ExternalLink } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const store = useCommitStore();
const faves = useFavesStore();
onMounted(() => faves.load());

const username = computed(() => String(route.params.username || ""));
const repo = computed(() => String(route.params.repo || ""));
const repoFullName = computed(() => `${username.value}/${repo.value}`);

watchEffect(() => {
  if (!username.value || !repo.value) return;
  store.resetPaging();
  store.fetchCommits(username.value, repo.value, 1);
});

function backToRepos() {
  router.push({ name: "repos", params: { username: username.value } });
}
function viewDetails(sha: string) {
  router.push({
    name: "commitDetails",
    params: { username: username.value, repo: repo.value, sha },
  });
}

/** single source of truth for the favourite key */
function keyFor(sha: string) {
  return `${repoFullName.value}#${sha}`;
}

function toggleFave(c: any) {
  const key = keyFor(c.sha);
  faves.toggle({
    key,
    sha: c.sha,
    repoFullName: repoFullName.value,
    message: c.commit.message,
    authorName: c.commit.author.name,
    date: c.commit.author.date,
    html_url: c.html_url,
  });
}
</script>

<template>
  <section class="commit-page">
    <div class="bar">
      <button class="back" type="button" @click="backToRepos">← Back</button>
      <h1 class="title">
        Commits: <code>{{ username }}/{{ repo }}</code>
      </h1>
      <div class="sort">
        <label for="sort">Sort:</label>
        <select
          id="sort"
          v-model="store.sort"
          @change="store.setSort(store.sort)"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>

    <SearchBar />

    <div v-if="store.commitStatus === 'loading'" class="state">
      Loading commits…
    </div>
    <div v-else-if="store.commitError" class="state err">
      {{ store.commitError }}
    </div>
    <div v-else-if="!store.sorted.length" class="state empty">
      No commits found.
    </div>

    <section v-else class="commit-grid">
      <div v-for="c in store.sorted" :key="c.sha" class="card glass">
        <!-- actions must sit BEFORE header in DOM to not block clicks -->
        <div class="card-actions">
          <button
            type="button"
            class="icon-btn"
            :class="{ active: faves.isFaved(keyFor(c.sha)) }"
            @click.stop="toggleFave(c)"
            aria-label="Toggle favourite"
          >
            <Star :size="18" />
          </button>

          <a
            class="sha-link"
            :href="c.html_url"
            target="_blank"
            rel="noreferrer"
            title="View on GitHub"
            @click.stop
          >
            {{ c.sha.slice(0, 7) }}
            <ExternalLink :size="14" />
          </a>
        </div>

        <!-- header navigates to details -->
        <button class="card-header" type="button" @click="viewDetails(c.sha)">
          <h3 class="msg">{{ c.commit.message }}</h3>
          <p class="meta">
            {{ c.commit.author.name }} •
            <time :datetime="c.commit.author.date">
              {{ new Date(c.commit.author.date).toLocaleString() }}
            </time>
          </p>
        </button>
      </div>
    </section>

    <FavouritesList :repoFullName="repoFullName" />

    <Pagination
      :page="store.page"
      :hasNext="store.hasNext"
      :hasPrev="store.hasPrev"
      :loading="store.commitStatus === 'loading'"
      @next="store.nextPage(username, repo)"
      @prev="store.prevPage(username, repo)"
    />
  </section>
</template>

<style scoped>
.commit-page {
  display: grid;
  gap: 16px;
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text);
}
.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}
.back {
  justify-self: start;
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.45rem 0.7rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.title {
  justify-self: center;
  font-weight: 800;
  font-size: 1.2rem;
}
.sort {
  justify-self: end;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}
.sort select {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.35rem 0.5rem;
  border-radius: 0.4rem;
}

.state {
  color: var(--muted);
  background: var(--empty-state-bg);
  padding: 0.9rem 1rem;
  border-radius: 0.6rem;
  text-align: center;
}
.state.err {
  color: var(--error-text);
  background: var(--error-bg);
}

.commit-grid {
  display: grid;
  gap: 12px;
}
.card {
  position: relative;
  padding: 14px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(160%);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
}

.card-header {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.msg {
  margin: 0 0 6px;
  font-weight: 700;
}
.meta {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  margin-bottom: 10px;
  order: -1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.icon-btn:hover {
  border-color: var(--link);
}
.icon-btn.active {
  color: #f5c518;
  border-color: #f5c518;
}

.sha-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--link);
  text-decoration: none;
  font-family: ui-monospace, monospace;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}
</style>