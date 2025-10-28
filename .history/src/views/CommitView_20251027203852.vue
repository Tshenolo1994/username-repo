<!-- src/views/CommitView.vue -->
<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommitStore } from "@/stores/useCommitStore";
import { useFavesStore } from "@/stores/useFavesStore";
import Pagination from "@/components/Pagination.vue";
import { Star } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const username = computed(() => route.params.username as string);
const repo = computed(() => route.params.repo as string);

const commitsStore = useCommitStore();
const favesStore = useFavesStore();
favesStore.load();

const title = computed(() => `Commits for ${username.value}/${repo.value}`);

function openDetails(sha: string) {
  router.push(`/repos/${username.value}/${repo.value}/${sha}`);
}

function toggleFave(c: any) {
  favesStore.toggle({
    sha: c.sha,
    repoFullName: `${username.value}/${repo.value}`,
    message: c.commit.message,
    authorName: c.commit.author.name,
    date: c.commit.author.date,
  });
}

onMounted(() => {
  commitsStore.setPage(1);
  commitsStore.fetch(username.value, repo.value);
});

watch(
  () => commitsStore.page,
  () => commitsStore.fetch(username.value, repo.value)
);

watch(
  () => commitsStore.sort,
  () => commitsStore.fetch(username.value, repo.value)
);

const commits = computed(() => commitsStore.sorted);
</script>

<template>
  <div class="commits">
    <h1 class="page-title">{{ title }}</h1>

    <div class="toolbar glass">
      <label class="label">Sort</label>
      <select
        class="select"
        v-model="commitsStore.sort"
        aria-label="Sort commits"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>

    <div v-if="commitsStore.status === 'loading'" class="status">Loading commits…</div>
    <div v-else-if="commitsStore.status === 'error'" class="status error">{{ commitsStore.error }}</div>
    <div v-else-if="!commits.length" class="status">No commits found.</div>

    <ul v-else class="commit-list">
      <li v-for="c in commits" :key="c.sha" class="row glass">
        <button class="row-main" @click="openDetails(c.sha)">
          <h3 class="msg">{{ c.commit.message }}</h3>
          <p class="meta">
            Author: {{ c.commit.author.name }} •
            {{ new Date(c.commit.author.date).toLocaleString() }}
          </p>
        </button>

        <div class="row-actions">
          <button
            class="icon-btn"
            :class="{ active: favesStore.isFaved(c.sha) }"
            @click.stop="toggleFave(c)"
            :aria-label="favesStore.isFaved(c.sha) ? 'Remove favourite' : 'Add favourite'"
            title="Toggle favourite"
          >
            <Star :size="18" />
          </button>

          <router-link
            class="sha"
            :to="`/repos/${username}/${repo}/${c.sha}`"
          >
            {{ c.sha.substring(0, 7) }}
          </router-link>
        </div>
      </li>
    </ul>

    <Pagination
      :page="commitsStore.page"
      :has-next="commitsStore.hasNextPage"
      @prev="commitsStore.setPage(commitsStore.page - 1)"
      @next="commitsStore.setPage(commitsStore.page + 1)"
    />
  </div>
</template>

<style scoped>
.commits { max-width: 1000px; margin: 0 auto; padding: 2rem; color: var(--text); }
.page-title { font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; text-align: center; }

.toolbar {
  display: inline-flex; align-items: center; gap: .75rem;
  padding: .5rem .75rem; border-radius: 10px; margin: 0 auto 1rem;
}
.label { color: var(--muted); font-size: .9rem; }
.select {
  background: var(--bg-elev); border: 1px solid var(--border); color: var(--text);
  padding: .45rem .6rem; border-radius: 8px;
}

.commit-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.row {
  display: grid; grid-template-columns: 1fr auto; gap: .75rem;
  padding: .9rem 1rem; border-radius: 10px; align-items: center;
}
.row-main { text-align: left; background: transparent; border: none; color: inherit; cursor: pointer; }
.msg { font-weight: 700; margin: 0 0 .3rem; }
.meta { color: var(--muted); margin: 0; font-size: .9rem; }

.row-actions { display: flex; align-items: center; gap: .6rem; }
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border);
  background: var(--bg-elev); color: var(--text); cursor: pointer; transition: border-color .15s;
}
.icon-btn:hover { border-color: var(--link); }
.icon-btn.active { color: #f5c518; border-color: #f5c518; }

.sha { color: var(--link); font-weight: 700; text-decoration: none; }
.status { text-align: center; color: var(--muted); margin: 2rem 0; }
.status.error { color: var(--error-text); }
</style>