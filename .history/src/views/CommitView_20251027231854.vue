<!-- src/views/CommitView.vue -->
<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommitStore } from "@/stores/useCommitStore";
import { useFavesStore } from "@/stores/useFavesStore";
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import { Star, ExternalLink } from "lucide-vue-next";
import FavouritesList from "@/components/.vue";
const route = useRoute();
const router = useRouter();

const store = useCommitStore();
const faves = useFavesStore();
onMounted(() => faves.load());

const username = computed(() => String(route.params.username || ""));
const repo = computed(() => String(route.params.repo || ""));


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

function toggleFave(c: any) {
    console.log('toggleFave called!', c.sha); 
  faves.toggle({
    sha: c.sha,
    repoFullName: `${username.value}/${repo.value}`,
    message: c.commit.message,
    authorName: c.commit.author.name,
    date: c.commit.author.date,
  });
}
</script>

<template>
  <section class="commit-page">
    <!-- Top bar -->
    <div class="bar">
      <button class="back" type="button" @click="backToRepos">← Back</button>

      <h1 class="title">
        Commits: <code>{{ username }}/{{ repo }}</code>
      </h1>

      <div class="sort">
        <label for="sort">Sort:</label>
        <select id="sort" v-model="store.sort" @change="store.setSort(store.sort)">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>

    <!-- Global search (same component used on multiple pages) -->
    <SearchBar />

    <!-- Single conditional chain: loading -> error -> empty -> grid -->
    <div v-if="store.commitStatus === 'loading'" class="state">Loading commits…</div>
    <div v-else-if="store.commitError" class="state err">{{ store.commitError }}</div>
    <div v-else-if="!store.sorted.length" class="state empty">No commits found.</div>
    <section v-else class="commit-grid">
      <div
        v-for="c in store.sorted"
        :key="c.sha"
        class="card glass"
      >
        <!-- Clickable header opens details -->
        <button class="card-header" type="button" @click="viewDetails(c.sha)">
          <h3 class="msg">{{ c.commit.message }}</h3>
          <p class="meta">
            {{ c.commit.author.name }} •
            <time :datetime="c.commit.author.date">
              {{ new Date(c.commit.author.date).toLocaleString() }}
            </time>
          </p>
        </button>

        <div class="card-actions">
            <button
  type="button"
  class="icon-btn"
  :class="{ active: faves.isFaved(c.sha) }"
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
          >
            {{ c.sha.slice(0, 7) }}
            <ExternalLink :size="14" />
          </a>
        </div>
      </div>
    </section>

    <!-- Pagination -->
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

/* top */
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
  padding: .45rem .7rem;
  border-radius: .5rem;
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
  gap: .5rem;
  align-items: center;
}
.sort select {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: .35rem .5rem;
  border-radius: .4rem;
}

/* states */
.state {
  color: var(--muted);
  background: var(--empty-state-bg);
  padding: .9rem 1rem;
  border-radius: .6rem;
  text-align: center;
}
.state.err { color: var(--error-text); background: var(--error-bg); }
.state.empty {}

/* grid + cards */
.commit-grid {
  display: grid;
  gap: 12px;
}
.card {
  padding: 14px;
  border-radius: 12px;
}
.glass {
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .1);
  backdrop-filter: blur(16px) saturate(160%);
  box-shadow: 0 6px 24px rgba(0,0,0,.4);
}

/* card internals */
.card-header {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
}
.msg { margin: 0 0 6px; font-weight: 700; }
.meta {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  margin-top: 10px;
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
  transition: border-color .15s ease, color .15s ease, background .15s ease;
}
.icon-btn:hover { border-color: var(--link); }
.icon-btn.active { color: #f5c518; border-color: #f5c518; }

.sha-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--link);
  text-decoration: none;
  font-family: ui-monospace, monospace;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  padding: .25rem .5rem;
  border-radius: 6px;
}
</style>